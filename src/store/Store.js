/*
  Store is the first component to run, it sets all the global state variables and is used in almost all other components
    it sets the state using the Reducer and the initial state

  monthStringBuilder parses all the data to find entries which end with "start" or "end"
    it then determines if the day is before or after the 15th of that month
    if it is before the 15th it gets a value of early, if after a value of mid
    this is used in the calendar view

  loremText is used to fill crops descriptions with dummy text if they do not have a description
    if lorem text is in a crop then airtable does not have a description for that crop
*/

import moment from "moment-timezone";
import React, { createContext, useReducer } from "react";
import desc from "../shared/crop-descriptions.json";
import img from "../shared/image-dictionary.json";
import z4crops from "../shared/json/zone4/crop-data.json";
import z4Dict from "../shared/json/zone4/data-dictionary.json";
import z5crops from "../shared/json/zone5/crop-data.json";
import z5Dict from "../shared/json/zone5/data-dictionary.json";
import z6crops from "../shared/json/zone6/crop-data.json";
import z6Dict from "../shared/json/zone6/data-dictionary.json";
import z7crops from "../shared/json/zone7/crop-data.json";
import z7Dict from "../shared/json/zone7/data-dictionary.json";
import Reducer from "./Reducer";

const cropDataFormatter = (cropData = [{}], zone = 7) => {
  const excludedCropZoneDecisionKeys = ["Exclude", "Up and Coming", "Discuss"];
  // Filter unwanted rows
  let tjson = cropData.filter((crop) => {
    if (
      excludedCropZoneDecisionKeys.includes(crop["Zone Decision"]) ||
      crop["Cover Crop Name"] === "__Open Discussion Row"
    ) {
      return false;
    } else return true;
  });

  return tjson.map((crop) => {
    // remove open discussion row and zone decision !== include

    let val = { fields: crop };

    val = monthStringBuilder(val);

    val.fields["inBasket"] = false;

    val.fields["Image Data"] = img[val.fields["Cover Crop Name"]]
      ? img[val.fields["Cover Crop Name"]]
      : {
          "Cover Crop": val.fields["Cover Crop Name"],
          "Key Thumbnail": null,
          Notes: null,
          Directory: null,
        };

    val.fields["Crop Description"] = desc[val.fields["Cover Crop Name"]]
      ? desc[val.fields["Cover Crop Name"]]
      : loremText();

    if (!val.fields["Nitrogen Fixation"]) {
      val.fields["Nitrogen Fixation"] = 0;
    }

    if (!val.fields["Early Spring Growth"]) {
      val.fields["Early Spring Growth"] = 0;
    }

    val.fields["Discourages Nematodes"] = val.fields["Disoucrages Nematodes"];
    val.fields["id"] = val.fields["__id"];
    val.fields["Drought"] = val.fields["Drought Tolerance"];
    val.fields["Flood"] = val.fields["Flood Tolerance"];
    val.fields["Heat"] = val.fields["Heat Tolerance"];
    val.fields["Low Fertility"] = val.fields["Low Fertility Tolerance"];
    val.fields["Salinity"] = val.fields["Salinity Tolerance"];
    val.fields["Shade"] = val.fields["Shade Tolerance"];
    val.fields["Tillage at Vegetative"] =
      val.fields["Tillage Termination at Vegetative"];
    val.fields["Tillage at Flowering"] =
      val.fields["Tillage Termination at Flowering"];

    val.fields["Freezing at Flowering"] =
      val.fields["Freezing Termination at Flowering"];

    val.fields["Freezing at Vegetative"] =
      val.fields["Freezing Termination at Vegetative"];
    val.fields["Chemical at Vegetative"] =
      val.fields["Chemical Termination at Vegetative"];
    val.fields["Chemical at Flowering"] =
      val.fields["Chemical Termination at Flowering"];

    val.fields["Mow at Flowering"] = val.fields["Mow Termination at Flowering"];
    val.fields["Roller Crimp at Flowering"] =
      val.fields["Roller Crimp Termination at Flowering"];

    if (!val.fields["Frost Seeding"]) {
      val.fields["Frost Seeding"] = false;
    } else {
      val.fields["Frost Seeding"] = true;
    }
    if (!val.fields["Can Aerial Seed"]) {
      val.fields["Aerial Seeding"] = false;
    } else {
      val.fields["Aerial Seeding"] = true;
    }

    //TODO: not using anymore
    if (!val.fields["Pollinator Habitat"]) {
      val.fields["Pollinator Habitat"] = 0;
    }
    if (!val.fields["Pollinator Food"]) {
      val.fields["Pollinator Food"] = 0;
    }

    return val;
  });
};

const monthStringBuilder = (vals) => {
  const params = [
    "Reliable Establishment/Growth",
    "Second Reliable Establishment/Growth",
    "Temperature/Moisture Risk to Establishment",
    "Second Temperature/Mositure Risk to Establishment",
    "Late Fall/Winter Planting Date",
    "Early Fall/ Winter Seeding Rate",
    "Standard Fall/Winter Seeding Rate Date",
    "Standard Spring Seeding Rate Date",
    "Frost Seeding",
  ];
  let val = vals;
  params.forEach((param) => {
    if (val.fields[param + " Start"]) {
      const valStart = moment(val.fields[param + " Start"], "YYYY-MM-DD");
      const valEnd = val.fields[param + " End"]
        ? moment(val.fields[param + " End"], "YYYY-MM-DD")
        : moment(val.fields[param + " Stop"], "YYYY-MM-DD");
      let str = "";
      let valuesArray = [];

      while (valStart.isSameOrBefore(valEnd)) {
        if (valStart.get("D") <= 15) {
          str = "Early";
        } else {
          str = "Mid";
        }
        valuesArray.push([`${valStart.format("MMMM")}, ${str}`]);
        valStart.add("14", "days");
      }
      valuesArray.forEach((key) => {
        const prev = val.fields[key] || [];
        prev.push(param);
        val.fields[key] = prev;
      });
    }
  });
  // this is temporary, needs to be replaced with wither a fix to calendar growth window component or exporting of json from airtable
  Object.keys(val.fields).forEach((item, index) => {
    if (item.endsWith("Early") || item.endsWith("Mid")) {
      let uniq = [...new Set(val.fields[item])];
      let removedOldVals = uniq.filter((item) => !item.endsWith("growth"));
      val.fields[item] = removedOldVals;
    }
  });
  return val;
};

const loremText = () => {
  return "Description for this cover crop is currently unavailable.";
};
const z7AllCrops = z7crops;
const z6AllCrops = z6crops;
const z5AllCrops = z5crops;
const z4AllCrops = z4crops;

const z7CropData = cropDataFormatter(z7AllCrops, 7);
const z6CropData = cropDataFormatter(z6AllCrops, 6);
const z5CropData = cropDataFormatter(z5AllCrops, 5);
const z4CropData = cropDataFormatter(z4AllCrops, 4);

const initialState = {
  progress: 0,
  address: "",
  addressSearchPreference: "address",
  addressChangedViaMap: false,
  fullAddress: "",
  zip: 0,
  zipCode: 0,
  markersCopy: [],
  markers: [[40.78489145, -74.80733626930342]],
  showAddressChangeBtn: false,
  selectedCheckboxes: [],
  selectedStars: {},
  allGoals: [],
  cropData: z7CropData,
  selectedCrops: [],
  selectedGoals: [],
  zoom: 13,
  addressVerified: false,
  snackOpen: false,
  snackVertical: "bottom",
  snackHorizontal: "right",
  snackMessage: "",
  modalOpen: false,
  modalSize: "lg", //sm,md,lg,fluid
  modalBody: {},
  addToCartBtnText: "add to list",
  zoneText: "Zone 7",
  zone: "",
  soilData: {
    Map_Unit_Name: "",
    Drainage_Class: [],
    Flooding_Frequency: [],
    Ponding_Frequency: "",
  },
  soilDataOriginal: {
    Map_Unit_Name: "",
    Drainage_Class: [],
    Flooding_Frequency: [],
    Ponding_Frequency: "",
  },

  weatherData: {
    averageFrost: {
      firstFrostDate: {
        month: "October",
        day: 21,
      },
      lastFrostDate: {
        month: "April",
        day: 20,
      },
    },
    averagePrecipitation: {
      thisMonth: 3.6, //inches
      annual: 43, //inches
    },
    frostFreeDays: 173,
  },
  myCoverCropActivationFlag: false,
  speciesSelectorActivationFlag: true,
  ajaxInProgress: false,
  cropDetailModal: false,
  greenbarExpanded: false,
  isSoilDataLoading: false,
  cashCropData: {
    name: "",
    dateRange: {
      startDate: "",
      endDate: "",
    },
  },
  zone7CropData: z7CropData,
  zone6CropData: z6CropData,
  zone5CropData: z5CropData,
  zone4CropData: z4CropData,
  zone7Dictionary: z7Dict,
  zone6Dictionary: z6Dict,
  zone5Dictionary: z5Dict,
  zone4Dictionary: z4Dict,
  weatherDataReset: false,
  filterString: "",
  filterKeys: [],
  activeGrowthPeriod: [],
  comparisonKeys: [],
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};
export const Context = createContext(initialState);
export default Store;
