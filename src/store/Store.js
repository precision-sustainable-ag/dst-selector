import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";
import crops from "../shared/crop-data.json";
import z7crops from "../shared/json/zone7/crop-data.json";
import z6crops from "../shared/json/zone6/crop-data.json";
import z5crops from "../shared/json/zone5/crop-data.json";
import moment from "moment-timezone";
import img from "../shared/image-dictionary.json";
import desc from "../shared/crop-descriptions.json";

import z7Dict from "../shared/json/zone7/data-dictionary.json";
import z6Dict from "../shared/json/zone6/data-dictionary.json";
import z5Dict from "../shared/json/zone6/data-dictionary.json";

const cropDataFormatter = (cropData = [{}]) => {
  let tjson = cropData.filter((crop) => {
    if (
      crop["Zone Decision"] !== "Include" ||
      crop["Cover Crop Name"] === "__Open Discussion Row"
    ) {
      return false;
    } else return true;
  });

  return tjson.map((crop) => {
    // val["fields"] = val;

    // remove open discussion row and zone decision !== include

    let val = { fields: crop };

    val = monthStringBuilder(val);

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
      val.fields["Roller Crimp Tolerance at Flowering"];

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

    // not mutating

    // delete val.fields["Drought Tolerance"];
    // delete val.fields["Flood Tolerance"];
    // delete val.fields["Heat Tolerance"];
    // delete val.fields["Low Fertility Tolerance"];
    // delete val.fields["Salinity Tolerance"];
    // delete val.fields["Shade Tolerance"];

    return val;
  });
};

const monthStringBuilder = (vals) => {
  const params = [
    "Reliable Establishment/Growth",
    "Temperature/Moisture Risk to Establishment",
    "Late Fall/Winter Planting Date",
    "Early Fall/ Winter Seeding Rate",
    "Second Reliable Establishment/Growth",
    "Standard Fall/Winter Seeding Rate Date",
    "Standard Spring Seeding Rate Date",
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
        let val = [];
        if (valStart.get("D") <= 15 && valStart.get("D") >= 1) {
          str = "Early";
        } else {
          str = "Mid";
        }

        valuesArray.push([`${valStart.format("MMMM")}, ${str}`]);
        valStart.add("15", "days");
      }

      valuesArray.forEach((key) => {
        const prev = val.fields[key] || [];
        prev.push(param);
        val.fields[key] = prev;
      });
    }
  });
  return val;
};

const loremText = () => {
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium. At imperdiet dui accumsan sit. Adipiscing tristique risus nec feugiat in fermentum posuere urna. Porta non pulvinar neque laoreet suspendisse interdum. Malesuada fames ac turpis egestas integer eget. Eget arcu dictum varius duis at consectetur lorem donec massa. Congue nisi vitae suscipit tellus mauris a diam maecenas sed. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Enim praesent elementum facilisis leo vel fringilla est ullamcorper. Neque viverra justo nec ultrices dui sapien eget mi proin. Egestas maecenas pharetra convallis posuere. Tortor condimentum lacinia quis vel eros donec. Ultricies integer quis auctor elit sed. Nisi scelerisque eu ultrices vitae auctor eu. Eget felis eget nunc lobortis mattis aliquam faucibus. Mattis aliquam faucibus purus in massa tempor nec.";
};
const z7AllCrops = z7crops;
const z6AllCrops = z6crops;
const z5AllCrops = z5crops;

const z7CropData = cropDataFormatter(z7AllCrops);
const z6CropData = cropDataFormatter(z6AllCrops);
const z5CropData = cropDataFormatter(z5AllCrops);

// console.log(tjs);

// const StoreContext = createContext();

const initialState = {
  // progress: 0,
  progress: 5,
  address: "",
  addressSearchPreference: "address",
  zip: 0,
  markersCopy: [],
  markers: [[39.0255, -76.924]],
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
  zone: 7,
  soilData: {
    Map_Unit_Name: "",
    Drainage_Class: "",
    Flooding_Frequency: "",
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
  zone7Dictionary: z7Dict,
  zone6Dictionary: z6Dict,
  zone5Dictionary: z5Dict,
  weatherDataReset: false,
  filterString: "",
  filterKeys: [],
  activeGrowthPeriod: [],
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};
export const Context = createContext(initialState);
export default Store;
