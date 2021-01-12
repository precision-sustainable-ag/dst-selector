import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";
import crops from "../shared/crop-data.json";
import z7crops from "../shared/json/zone7/crop-data.json";
import z6crops from "../shared/json/zone6/crop-data.json";
import z5crops from "../shared/json/zone5/crop-data.json";
import z4crops from "../shared/json/zone4/crop-data.json";

import moment from "moment-timezone";
import img from "../shared/image-dictionary.json";
import desc from "../shared/crop-descriptions.json";

import z7Dict from "../shared/json/zone7/data-dictionary.json";
import z6Dict from "../shared/json/zone6/data-dictionary.json";
import z5Dict from "../shared/json/zone5/data-dictionary.json";

const cropDataFormatter = (cropData = [{}], zone = 7) => {
  const excludedCropZoneDecisionKeys = ["Exclude", "Up and Coming", "Discuss"];
  let tjson = cropData.filter((crop) => {
    if (
      excludedCropZoneDecisionKeys.includes(crop["Zone Decision"]) ||
      crop["Cover Crop Name"] === "__Open Discussion Row"
    ) {
      return false;
    } else return true;
  });

  // if (zone === 6) {
  //   console.log("store filer:", cropData.length);
  // }

  return tjson.map((crop) => {
    // val["fields"] = val;

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
      // if (val.fields["Cover Crop Name"] === "Oats, Spring") {
      //   console.log(valuesArray);
      // }
      valuesArray.forEach((key) => {
        const prev = val.fields[key] || [];
        // if (param.split(" ")[0] === "Second") {
        // console.log(param.split(" ")[0]);

        // prev.push(param.split(" ").splice(1).join(" "));
        // } else {
        // console.log(param.split(" ")[0]);
        prev.push(param);
        // }
        val.fields[key] = prev;
      });
    }
  });
  // console.log(val.fields['']);
  // if (val.fields["Cover Crop Name"] === "Vetch, Hairy") {
  // this is temporary, needs to be replaced with wither a fix to calendar growth window component or exporting of json from airtable
  Object.keys(val.fields).forEach((item, index) => {
    if (item.endsWith("Early") || item.endsWith("Mid")) {
      // console.log(item);
      let uniq = [...new Set(val.fields[item])];
      // console.log(uniq);
      let removedOldVals = uniq.filter((item) => !item.endsWith("growth"));
      // console.log(removedOldVals);
      val.fields[item] = removedOldVals;
    }
  });

  // console.log(val);
  // console.log(val.fields["August, Early"]);
  // console.log(val.fields["September, Mid"]);
  // };
  return val;
};

const loremText = () => {
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium. At imperdiet dui accumsan sit. Adipiscing tristique risus nec feugiat in fermentum posuere urna. Porta non pulvinar neque laoreet suspendisse interdum. Malesuada fames ac turpis egestas integer eget. Eget arcu dictum varius duis at consectetur lorem donec massa. Congue nisi vitae suscipit tellus mauris a diam maecenas sed. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Enim praesent elementum facilisis leo vel fringilla est ullamcorper. Neque viverra justo nec ultrices dui sapien eget mi proin. Egestas maecenas pharetra convallis posuere. Tortor condimentum lacinia quis vel eros donec. Ultricies integer quis auctor elit sed. Nisi scelerisque eu ultrices vitae auctor eu. Eget felis eget nunc lobortis mattis aliquam faucibus. Mattis aliquam faucibus purus in massa tempor nec.";
};
const z7AllCrops = z7crops;
const z6AllCrops = z6crops;
const z5AllCrops = z5crops;
const z4AllCrops = z4crops;

const z7CropData = cropDataFormatter(z7AllCrops, 7);
const z6CropData = cropDataFormatter(z6AllCrops, 6);
const z5CropData = cropDataFormatter(z5AllCrops, 5);
const z4CropData = cropDataFormatter(z4AllCrops, 4);

// console.log("store:", z6CropData.length);

// const StoreContext = createContext();

const initialState = {
  progress: 0,
  // progress: 1,
  // progress: 4,
  // progress: 5,
  address: "",
  addressSearchPreference: "address",
  addressChangedViaMap: false,
  fullAddress: "",
  zip: 0,
  zipCode: 0,
  markersCopy: [],
  markers: [[40.78489145, -74.80733626930342]],
  // markers: [[35.764221, -78.69976]],
  // markers: [[]],
  // markers: [[39.0255, -76.924]],
  // markers: [
  //   [42.43893008983507, -71.6220123358556],
  //   [42.437694893227764, -71.6226775236913],
  //   [42.4370772857936, -71.62188358982289],
  //   [42.43746131164466, -71.62125058849537],
  //   [42.438162053781895, -71.621003825266],
  //   [42.4387044307342, -71.62120767315113],
  // ],
  showAddressChangeBtn: false,
  selectedCheckboxes: [],
  selectedStars: {},
  allGoals: [],
  cropData: z7CropData,
  selectedCrops: [],
  // selectedCrops: [
  //   {
  //     id: "recsmwaDr74UFoFDi",
  //     cropName: "Sorghum-sudangrass",
  //     btnId: "cartBtn1",
  //     data: {
  //       _id: {
  //         $oid: "5f2a3349c570132255af5929",
  //       },
  //       "Cover Crop Name": "Sorghum-sudangrass",
  //       "Scientific Name": "Sorghum bicolor x Sorghum bicolor var. Sudanense",
  //       Synonyms: "Sudex",
  //       "cv, var, or ssp to specify": "non BMR varieties",
  //       Origin: "MCCC Species tool",
  //       "Drought Tolerance": 5,
  //       "Shade Tolerance": 1,
  //       "Flood Tolerance": 2,
  //       "Low Fertility Tolerance": 3,
  //       "Salinity Tolerance": 2,
  //       "Winter Survival": ["Never"],
  //       "Active Growth Period": ["Summer"],
  //       Duration: ["Annual"],
  //       "Shape & Orientation": ["Erect"],
  //       "Review Status": "Zone Team Start",
  //       "Soil Drainage": [
  //         "Somewhat poorly drained",
  //         "Moderately well drained",
  //         "Well drained",
  //         "Excessively drained",
  //         "Well drained muck",
  //       ],
  //       "Min Germination Temp (F)": 65,
  //       "Seeds per Pound": 15000,
  //       "Inoculant Type (Legumes Only)": ["none"],
  //       "Seeding Rate: Broadcast (w/cultivation) (lbs/A)": "19-45",
  //       "Seeding Rate: Drilled/Cultipack and Cultivation (lbs/A)": "15-35",
  //       "Seeding Rate: Aerial (lbs/A)": "Not Recommended",
  //       "Drilled Depth Min": 0.5,
  //       Harvestability: 5,
  //       "Loosens Topsoil": 3,
  //       "Frees P & K": 2,
  //       "Growing Window": "Short",
  //       "Ease of Establishment": 4,
  //       "Family Common Name": "Grass family",
  //       "Family Scientific Name": "Poaceae",
  //       "Soil Textures": ["Coarse", "Medium", "Fine"],
  //       "Minimum Tolerant Soil pH": 6,
  //       "Maximum Tolerant Soil pH": 8,
  //       "Soil Moisture Use": "High",
  //       "Cover Crop Group": "Grass",
  //       "Heat Tolerance": 5,
  //       "Seed Price per Pound": 1,
  //       "USDA Symbol": "SOBI5",
  //       "Zone Decision": "Include",
  //       "Zone Use": "Common",
  //       "Flooding Frequency Tolerance": "Poor",
  //       "Nitrogen Accumulation Min, Legumes (lbs/A/y)": 0,
  //       "Dry Matter Min (lbs/A/y)": 4000,
  //       "C to N Ratio": 5,
  //       "Loosens Subsurface Soil": 2,
  //       "Supports Mycorrhizae": 4,
  //       "Flowering Trigger": ["Plant Size"],
  //       "Establishes Quickly": 2,
  //       "Root Architecture": ["Fibrous"],
  //       "Root Depth": "Medium",
  //       "Notes: Growth, Roots, and Nutrients":
  //         "Minimum Germination Temp. ~ 62-65˚F",
  //       "Tillage Termination at Vegetative": 1,
  //       "Pollinator Habitat": 1,
  //       "Grazing Value": 4,
  //       "Pollinator Food": 1,
  //       "Grazing Tolerance": 4,
  //       "Tillage Termination at Flowering": 1,
  //       "Freezing Termination at Vegetative": 5,
  //       "Freezing Termination at Flowering": 5,
  //       "Chemical Termination at Flowering": 5,
  //       "Mow Termination at Flowering": 5,
  //       "Chemical Termination at Vegetative": 5,
  //       "Mow Termination at Vegetative": 1,
  //       "Roller Crimp Termination at Flowering": 1,
  //       "Roller Crimp Tolerance at Vegetative": 1,
  //       "Volunteer Establishment - MW Tool Data": 4,
  //       Persistence: 2,
  //       "Notes: Weeds": "Mature, frost-killed plants become quite woody",
  //       "Seed price per acre: Drilled/Cultipack and Cultivation": 1,
  //       "Seed price per acre: Broadcast (w/cultivation)": 1,
  //       "Dry Matter Rating": 3,
  //       "June, Mid": [
  //         "Reliable establishment/growth",
  //         "Early seeding rate",
  //         "Reliable Establishment/Growth",
  //       ],
  //       "June, Early": [
  //         "Reliable establishment/growth",
  //         "Early seeding rate",
  //         "Reliable Establishment/Growth",
  //       ],
  //       "May, Mid": [
  //         "Reliable establishment/growth",
  //         "Reliable Establishment/Growth",
  //       ],
  //       "May, Early": [
  //         "Temperature/moisture risk to establishment/growth",
  //         "Reliable Establishment/Growth",
  //         "Temperature/Moisture Risk to Establishment",
  //       ],
  //       "August, Early": ["Late seeding rate"],
  //       "July, Mid": [
  //         "Reliable establishment/growth",
  //         "Standard seeding rate",
  //         "Reliable Establishment/Growth",
  //       ],
  //       "July, Early": [
  //         "Reliable establishment/growth",
  //         "Early seeding rate",
  //         "Reliable Establishment/Growth",
  //       ],
  //       "Seeding Rate Calculator": ["recOKcyzaTLGqL3Mq"],
  //       "Base Seeding Rate Min (lbs/A)": 15,
  //       "Base Seeding Rate Max (lbs/A)": 35,
  //       "Seed Price Calculator": ["recwqPQb3QmzxiCYv"],
  //       "Base Seed Price Per Acre Min": 1,
  //       "Base Seed Price Per Acre Max": 1,
  //       "Reliable Establishment/Growth Start": "2020-05-15",
  //       "Reliable Establishment/Growth End": "2020-07-31",
  //       "Temperature/Moisture Risk to Establishment Start": "2020-05-01",
  //       "Temperature/Moisture Risk to Establishment End": "2020-05-15",
  //       "Nitrogen Accumulation Max, Legumes (lbs/A/y)": 0,
  //       "Dry Matter Max (lbs/A/y)": 8000,
  //       "Drilled Depth Max": 1.5,
  //       "Promotes Nematodes": 3,
  //       "C to N Ratio 3-star": 3,
  //       "Suppresses Cash Crop Disease": 3,
  //       "Promotes Cash Crop Disease": 4,
  //       "Discourages Pest Insects": 3,
  //       "Promotes Pest Insects": 3,
  //       "Outcompetes Summer Annual Weeds": 5,
  //       "Allelopathic to Weeds": 4,
  //       "Standard Summer Seeding Rate Start": "2020-06-01",
  //       "Standard Summer Seeding Rate End": "2020-08-01",
  //       "Late Summer Seeding Rate Start": "2020-08-01",
  //       "Late Summer Seeding Rate End": "2020-08-10",
  //       "Improve Soil Organic Matter": 5,
  //       "Lasting Residue": 5,
  //       "Increase Soil Aggregation": 5,
  //       "Prevent Fall Soil Erosion": 5,
  //       "Promote Water Quality": 4,
  //       "Prevent Spring Soil Erosion": 4,
  //       "Penetrates Plow Pan": 5,
  //       "Reduces Surface Compaction": 5,
  //       "Nitrogen Scavenging": 4,
  //       "Good Grazing": 4,
  //       "Forage Harvest Value": 5,
  //       "Residue Suppresses Summer Annual Weeds": 2,
  //       "Outcompetes Winter Annual Weeds": 4,
  //       "Suppresses Winter Annual Weeds": 2,
  //       "Volunteer Establishment": 5,
  //       "Reduces Crusting": 3,
  //       Notes:
  //         "Excellent forage; not as winterhardy as other perennial forage grasses but establishes quickly so may still be useful as a cover crop.",
  //       "Notes: Nematodes":
  //         "Supports reproduction of some root-knot nematode species/races.",
  //       "Improve Soil Aggregation - Formula": 4,
  //       "Improve Soil Organic Matter - Formula": 1,
  //       "Lasting Residue - Formula": 1,
  //       "Prevent soil erosion - formula": 2,
  //       "Promote water quality - formula": 2,
  //       "Reduces subsurface compaction - formula": 1,
  //       "Nitrogen fixation - formula": 2,
  //       "Nitrogen scavenging - formula": 2,
  //       "Good grazing - formula": 4,
  //       "Forest harvest value - formula": 5,
  //       "Pollinator support - formula": 1,
  //       "Weed suppression - formula": 3,
  //       "Reduces topsoil compaction- formula": 2,
  //       "v Base Seed Price Per Acre Min": 15,
  //       "Base Seed Price Per Acre": 15,
  //       "f Base Seed Price Per Acre Min": 1,
  //       "Average Seeding Rate Min": [27.57894736842105],
  //       "Average Seeding Rate Max": [56.026315789473685],
  //       "f Base Seed Price Per Acre Max": 1,
  //       __id: "recsmwaDr74UFoFDi",
  //       inBasket: false,
  //       "Image Data": {
  //         "Cover Crop": "Sorghum Sudangrass",
  //         "Key Thumbnail": "Sorghum sudangrass_mature_Larson_2020.JPG",
  //         Notes: null,
  //         Directory: "Sorghum Sudangrass",
  //       },
  //       "Crop Description":
  //         "Also known as: Sudex, Sudax. Excellent summer grass choice. Needs heat. Fast-grower that reaches 6-12 ft tall, big biomass potential in the presence of lots of soil N. Regrows well after mowing/grazing. Excellent subsoiler with thicker roots than most grasses. Excellent weed suppressor due to competition and allelopathy (caution if next crop is small-seeded). Good forage, but prussic acid and nitrate content can be a problem. Huge biomass and reseeding and weed potential can overwhelm: mow or kill in a timely fashion. Improved forage types available, cultivars may vary widely. Can substitute forage sorghum or sudangrass. Mix with cowpea, sunn hemp.",
  //       id: "recsmwaDr74UFoFDi",
  //       Drought: 5,
  //       Flood: 2,
  //       Heat: 5,
  //       "Low Fertility": 3,
  //       Salinity: 2,
  //       Shade: 1,
  //       "Tillage at Vegetative": 1,
  //       "Tillage at Flowering": 1,
  //       "Freezing at Flowering": 5,
  //       "Freezing at Vegetative": 5,
  //       "Chemical at Vegetative": 5,
  //       "Chemical at Flowering": 5,
  //       "Mow at Flowering": 5,
  //       "Frost Seeding": false,
  //       "Aerial Seeding": false,
  //     },
  //   },
  //   {
  //     id: "recHxsFkhn7kEhF1r",
  //     cropName: "Sudangrass",
  //     btnId: "cartBtn2",
  //     data: {
  //       _id: {
  //         $oid: "5f2a3349c570132255af592b",
  //       },
  //       "Cover Crop Name": "Sudangrass",
  //       "Scientific Name": "Sorghum X drummondii",
  //       "cv, var, or ssp to specify":
  //         "Use non BMR (less expensive) varieties in summer cover crop mixes, use BMR varieties for feed/forage properties.",
  //       Origin: "Zone Team Leaders",
  //       "Drought Tolerance": 5,
  //       "Shade Tolerance": 1,
  //       "Flood Tolerance": 2,
  //       "Low Fertility Tolerance": 3,
  //       "Salinity Tolerance": 2,
  //       "Winter Survival": ["Never"],
  //       "Active Growth Period": ["Summer"],
  //       Duration: ["Annual"],
  //       "Shape & Orientation": ["Erect"],
  //       "Review Status": "Zone Team Start",
  //       "Soil Drainage": [
  //         "Somewhat poorly drained",
  //         "Moderately well drained",
  //         "Well drained",
  //         "Excessively drained",
  //         "Well drained muck",
  //       ],
  //       "Min Germination Temp (F)": 65,
  //       "Seeds per Pound": 44240,
  //       "Inoculant Type (Legumes Only)": ["none"],
  //       "Seeding Rate: Broadcast (w/cultivation) (lbs/A)": "45-52",
  //       "Seeding Rate: Drilled/Cultipack and Cultivation (lbs/A)": "35-40",
  //       "Seeding Rate: Aerial (lbs/A)": "Not Recommended",
  //       "Drilled Depth Min": 0.5,
  //       Harvestability: 5,
  //       "Loosens Topsoil": 3,
  //       "Frees P & K": 2,
  //       "Growing Window": "Short",
  //       "Ease of Establishment": 4,
  //       "Family Common Name": "Grass family",
  //       "Family Scientific Name": "Poaceae",
  //       "Soil Textures": ["Coarse", "Fine", "Medium"],
  //       "Minimum Tolerant Soil pH": 5.7,
  //       "Maximum Tolerant Soil pH": 6.8,
  //       "Soil Moisture Use": "Low",
  //       "Cover Crop Group": "Grass",
  //       "Heat Tolerance": 5,
  //       "Seed Price per Pound": 2,
  //       "USDA Symbol": "SOBID",
  //       "Zone Decision": "Include",
  //       "Zone Use": "Common",
  //       "Flooding Frequency Tolerance": "Poor",
  //       "Nitrogen Accumulation Min, Legumes (lbs/A/y)": 0,
  //       "Dry Matter Min (lbs/A/y)": 4000,
  //       "C to N Ratio": 5,
  //       "Loosens Subsurface Soil": 1,
  //       "Supports Mycorrhizae": 4,
  //       "Establishes Quickly": 3,
  //       "Root Architecture": ["Fibrous"],
  //       "Root Depth": "Medium",
  //       "Notes: Growth, Roots, and Nutrients":
  //         "Minimum Germination Temp. ~ 62- 65˚F",
  //       "Tillage Termination at Vegetative": 1,
  //       "Pollinator Habitat": 1,
  //       "Grazing Value": 5,
  //       "Pollinator Food": 1,
  //       "Grazing Tolerance": 5,
  //       "Tillage Termination at Flowering": 1,
  //       "Freezing Termination at Vegetative": 5,
  //       "Freezing Termination at Flowering": 5,
  //       "Chemical Termination at Flowering": 5,
  //       "Mow Termination at Flowering": 5,
  //       "Chemical Termination at Vegetative": 5,
  //       "Mow Termination at Vegetative": 1,
  //       "Roller Crimp Termination at Flowering": 1,
  //       "Roller Crimp Tolerance at Vegetative": 1,
  //       "Volunteer Establishment - MW Tool Data": 4,
  //       Persistence: 2,
  //       "Seed price per acre: Drilled/Cultipack and Cultivation": 2,
  //       "Seed price per acre: Broadcast (w/cultivation)": 2,
  //       "Dry Matter Rating": 3,
  //       "June, Mid": [
  //         "Reliable establishment/growth",
  //         "Early seeding rate",
  //         "Reliable Establishment/Growth",
  //       ],
  //       "June, Early": [
  //         "Reliable establishment/growth",
  //         "Early seeding rate",
  //         "Reliable Establishment/Growth",
  //       ],
  //       "May, Mid": [
  //         "Reliable establishment/growth",
  //         "Reliable Establishment/Growth",
  //       ],
  //       "May, Early": [
  //         "Temperature/moisture risk to establishment/growth",
  //         "Reliable Establishment/Growth",
  //         "Temperature/Moisture Risk to Establishment",
  //       ],
  //       "August, Early": [
  //         "Reliable establishment/growth",
  //         "Late seeding rate",
  //         "Reliable Establishment/Growth",
  //       ],
  //       "July, Mid": [
  //         "Reliable establishment/growth",
  //         "Standard seeding rate",
  //         "Reliable Establishment/Growth",
  //       ],
  //       "July, Early": [
  //         "Reliable establishment/growth",
  //         "Early seeding rate",
  //         "Reliable Establishment/Growth",
  //       ],
  //       "Seeding Rate Calculator": ["rec9a5EV7MAfqklHk"],
  //       "Base Seeding Rate Min (lbs/A)": 35,
  //       "Base Seeding Rate Max (lbs/A)": 40,
  //       "Seed Price Calculator": ["recwqPQb3QmzxiCYv"],
  //       "Base Seed Price Per Acre Min": 2,
  //       "Base Seed Price Per Acre Max": 2,
  //       "Reliable Establishment/Growth Start": "2020-05-15",
  //       "Reliable Establishment/Growth End": "2020-08-15",
  //       "Temperature/Moisture Risk to Establishment Start": "2020-05-01",
  //       "Temperature/Moisture Risk to Establishment End": "2020-05-15",
  //       "Nitrogen Accumulation Max, Legumes (lbs/A/y)": 0,
  //       "Dry Matter Max (lbs/A/y)": 8000,
  //       "Drilled Depth Max": 1,
  //       "Promotes Nematodes": 2,
  //       "C to N Ratio 3-star": 3,
  //       "Suppresses Cash Crop Disease": 3,
  //       "Promotes Cash Crop Disease": 4,
  //       "Discourages Pest Insects": 3,
  //       "Promotes Pest Insects": 3,
  //       "Outcompetes Summer Annual Weeds": 5,
  //       "Allelopathic to Weeds": 4,
  //       "Standard Summer Seeding Rate Start": "2020-06-01",
  //       "Standard Summer Seeding Rate End": "2020-08-01",
  //       "Late Summer Seeding Rate Start": "2020-08-01",
  //       "Late Summer Seeding Rate End": "2020-08-10",
  //       "Improve Soil Organic Matter": 5,
  //       "Lasting Residue": 5,
  //       "Increase Soil Aggregation": 5,
  //       "Prevent Fall Soil Erosion": 5,
  //       "Promote Water Quality": 4,
  //       "Prevent Spring Soil Erosion": 4,
  //       "Penetrates Plow Pan": 4,
  //       "Reduces Surface Compaction": 5,
  //       "Nitrogen Scavenging": 4,
  //       "Good Grazing": 4,
  //       "Forage Harvest Value": 5,
  //       "Residue Suppresses Summer Annual Weeds": 2,
  //       "Outcompetes Winter Annual Weeds": 4,
  //       "Suppresses Winter Annual Weeds": 2,
  //       "Volunteer Establishment": 5,
  //       "Reduces Crusting": 3,
  //       Notes:
  //         " Bloat risk and other animal health risks, similar to brassicas.",
  //       "Notes: Nematodes": "Host for lesion nematode.",
  //       "Improve Soil Aggregation - Formula": 4,
  //       "Improve Soil Organic Matter - Formula": 1,
  //       "Lasting Residue - Formula": 1,
  //       "Prevent soil erosion - formula": 2,
  //       "Promote water quality - formula": 3,
  //       "Reduces subsurface compaction - formula": 1,
  //       "Nitrogen fixation - formula": 2,
  //       "Nitrogen scavenging - formula": 3,
  //       "Good grazing - formula": 4,
  //       "Forest harvest value - formula": 5,
  //       "Pollinator support - formula": 1,
  //       "Weed suppression - formula": 5,
  //       "Reduces topsoil compaction- formula": 2,
  //       "v Base Seed Price Per Acre Min": 70,
  //       "Base Seed Price Per Acre": 70,
  //       "f Base Seed Price Per Acre Min": 2,
  //       "Average Seeding Rate Min": [27.57894736842105],
  //       "Average Seeding Rate Max": [56.026315789473685],
  //       "f Base Seed Price Per Acre Max": 2,
  //       __id: "recHxsFkhn7kEhF1r",
  //       inBasket: false,
  //       "Image Data": {
  //         "Cover Crop": "Sudangrass",
  //         "Key Thumbnail": "Sudangrass_mature_Ziegler_2020b.jpg",
  //         Notes: null,
  //         Directory: "Sudangrass",
  //       },
  //       "Crop Description":
  //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium. At imperdiet dui accumsan sit. Adipiscing tristique risus nec feugiat in fermentum posuere urna. Porta non pulvinar neque laoreet suspendisse interdum. Malesuada fames ac turpis egestas integer eget. Eget arcu dictum varius duis at consectetur lorem donec massa. Congue nisi vitae suscipit tellus mauris a diam maecenas sed. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Enim praesent elementum facilisis leo vel fringilla est ullamcorper. Neque viverra justo nec ultrices dui sapien eget mi proin. Egestas maecenas pharetra convallis posuere. Tortor condimentum lacinia quis vel eros donec. Ultricies integer quis auctor elit sed. Nisi scelerisque eu ultrices vitae auctor eu. Eget felis eget nunc lobortis mattis aliquam faucibus. Mattis aliquam faucibus purus in massa tempor nec.",
  //       id: "recHxsFkhn7kEhF1r",
  //       Drought: 5,
  //       Flood: 2,
  //       Heat: 5,
  //       "Low Fertility": 3,
  //       Salinity: 2,
  //       Shade: 1,
  //       "Tillage at Vegetative": 1,
  //       "Tillage at Flowering": 1,
  //       "Freezing at Flowering": 5,
  //       "Freezing at Vegetative": 5,
  //       "Chemical at Vegetative": 5,
  //       "Chemical at Flowering": 5,
  //       "Mow at Flowering": 5,
  //       "Frost Seeding": false,
  //       "Aerial Seeding": false,
  //     },
  //   },
  //   {
  //     id: "recTvoW3IW6QsNWQd",
  //     cropName: "Triticale, Winter",
  //     btnId: "cartBtn3",
  //     data: {
  //       _id: {
  //         $oid: "5f2a3349c570132255af5931",
  //       },
  //       "Cover Crop Name": "Triticale, Winter",
  //       "Scientific Name": "X Triticosecale",
  //       "cv, var, or ssp to specify": "Winter",
  //       Origin: "MCCC Species tool",
  //       "Drought Tolerance": 3,
  //       "Shade Tolerance": 3,
  //       "Flood Tolerance": 3,
  //       "Low Fertility Tolerance": 4,
  //       "Salinity Tolerance": 2,
  //       "Winter Survival": ["Expected"],
  //       "Active Growth Period": ["Winter"],
  //       Duration: ["Annual"],
  //       "Shape & Orientation": ["Erect"],
  //       "Review Status": "Zone Team Start",
  //       "Soil Drainage": [
  //         "Somewhat poorly drained",
  //         "Moderately well drained",
  //         "Well drained",
  //         "Well drained muck",
  //       ],
  //       "Min Germination Temp (F)": 38,
  //       "Seeds per Pound": 12000,
  //       "Inoculant Type (Legumes Only)": ["none"],
  //       "Seeding Rate: Broadcast (w/cultivation) (lbs/A)": "65-156",
  //       "Planting green":
  //         'Utilizing a roller-crimper is suggested when planting corn into material greater than 12" tall as un-rolled cover may impact emergence.',
  //       "Seeding Rate: Drilled/Cultipack and Cultivation (lbs/A)": "50-120",
  //       "Seeding Rate: Aerial (lbs/A)": "75-180",
  //       "Drilled Depth Min": 0.75,
  //       Harvestability: 3,
  //       "Loosens Topsoil": 3,
  //       "Frees P & K": 3,
  //       "Growing Window": "Medium",
  //       "Ease of Establishment": 5,
  //       "Family Common Name": "Grass family",
  //       "Family Scientific Name": "Poaceae",
  //       "Soil Textures": ["Coarse", "Medium", "Fine"],
  //       "Minimum Tolerant Soil pH": 5.5,
  //       "Maximum Tolerant Soil pH": 8,
  //       "Soil Moisture Use": "Medium",
  //       "Cover Crop Group": "Grass",
  //       "Heat Tolerance": 3,
  //       "Seed Price per Pound": 1,
  //       "Can Aerial Seed": true,
  //       "USDA Symbol": "TRITI2",
  //       "Zone Decision": "Include",
  //       "Zone Use": "Common",
  //       "Flooding Frequency Tolerance": "Moderate",
  //       "Nitrogen Accumulation Min, Legumes (lbs/A/y)": 0,
  //       "Dry Matter Min (lbs/A/y)": 2000,
  //       "C to N Ratio": 4,
  //       "Notes: Termination [Goal: Method: Timing]":
  //         "Flowering and freezing temps unlikely to co-occur.",
  //       "Loosens Subsurface Soil": 2,
  //       "Supports Mycorrhizae": 4,
  //       "Early Spring Growth": 4,
  //       "Flowering Trigger": ["Vernalization"],
  //       "Establishes Quickly": 4,
  //       "Root Architecture": ["Fibrous"],
  //       "Root Depth": "Medium",
  //       "Notes: Growth, Roots, and Nutrients":
  //         "Minimum Germination Temp. 38˚F ",
  //       "Tillage Termination at Vegetative": 1,
  //       "Pollinator Habitat": 1,
  //       "Grazing Value": 5,
  //       "Pollinator Food": 1,
  //       "Grazing Tolerance": 5,
  //       "Tillage Termination at Flowering": 1,
  //       "Freezing Termination at Vegetative": 1,
  //       "Freezing Termination at Flowering": 2,
  //       "Chemical Termination at Flowering": 5,
  //       "Mow Termination at Flowering": 5,
  //       "Chemical Termination at Vegetative": 5,
  //       "Mow Termination at Vegetative": 1,
  //       "Roller Crimp Termination at Flowering": 5,
  //       "Roller Crimp Tolerance at Vegetative": 2,
  //       "Volunteer Establishment - MW Tool Data": 4,
  //       Persistence: 1,
  //       "Seed price per acre: Drilled/Cultipack and Cultivation": 2,
  //       "Seed price per acre: Aerial": 2,
  //       "Seed price per acre: Broadcast (w/cultivation)": 2,
  //       "Dry Matter Rating": 2,
  //       "September, Mid": [
  //         "Reliable establishment/growth",
  //         "Standard seeding rate",
  //         "Reliable Establishment/Growth",
  //       ],
  //       "September, Early": [
  //         "Reliable establishment/growth",
  //         "Early seeding rate",
  //         "Reliable Establishment/Growth",
  //       ],
  //       "August, Mid": [
  //         "Reliable establishment/growth",
  //         "Early seeding rate",
  //         "Reliable Establishment/Growth",
  //       ],
  //       "August, Early": [
  //         "Early seeding rate",
  //         "Reliable Establishment/Growth",
  //       ],
  //       "November, Early": [
  //         "Temperature/moisture risk to establishment/growth",
  //         "Temperature/Moisture Risk to Establishment",
  //       ],
  //       "October, Mid": [
  //         "Reliable establishment/growth",
  //         "Late seeding rate",
  //         "Reliable Establishment/Growth",
  //       ],
  //       "October, Early": [
  //         "Reliable establishment/growth",
  //         "Standard seeding rate",
  //         "Reliable Establishment/Growth",
  //       ],
  //       "Seeding Rate Calculator": ["recZBVMlAAosVNoMv"],
  //       "Base Seeding Rate Min (lbs/A)": 50,
  //       "Base Seeding Rate Max (lbs/A)": 120,
  //       "Seed Price Calculator": ["recwqPQb3QmzxiCYv"],
  //       "Base Seed Price Per Acre Min": 3,
  //       "Base Seed Price Per Acre Max": 3,
  //       "Reliable Establishment/Growth Start": "2020-08-15",
  //       "Reliable Establishment/Growth End": "2020-10-31",
  //       "Temperature/Moisture Risk to Establishment Start": "2020-11-01",
  //       "Temperature/Moisture Risk to Establishment End": "2020-11-15",
  //       "Early Fall/Winter Seeding Rate Start": "2020-08-01",
  //       "Early Fall/Winter Seeding Rate Stop": "2020-09-20",
  //       "Standard Fall/Winter Seeding Rate Start": "2020-09-20",
  //       "Standard Fall/Winter Seeding Rate End": "2020-10-05",
  //       "Late Fall/Winter Seeding Rate Start": "2020-10-05",
  //       "Late Fall/Winter Seeding Rate End": "2020-10-20",
  //       "Nitrogen Accumulation Max, Legumes (lbs/A/y)": 0,
  //       "Dry Matter Max (lbs/A/y)": 5000,
  //       "Drilled Depth Max": 1.5,
  //       "Promotes Nematodes": 1,
  //       "C to N Ratio 3-star": 3,
  //       "Suppresses Cash Crop Disease": 2,
  //       "Promotes Cash Crop Disease": 2,
  //       "Discourages Pest Insects": 1,
  //       "Promotes Pest Insects": 1,
  //       "Outcompetes Summer Annual Weeds": 3,
  //       "Allelopathic to Weeds": 3,
  //       "Improve Soil Organic Matter": 5,
  //       "Lasting Residue": 5,
  //       "Increase Soil Aggregation": 5,
  //       "Prevent Fall Soil Erosion": 5,
  //       "Promote Water Quality": 3,
  //       "Prevent Spring Soil Erosion": 5,
  //       "Penetrates Plow Pan": 2,
  //       "Reduces Surface Compaction": 5,
  //       "Nitrogen Scavenging": 5,
  //       "Good Grazing": 4,
  //       "Forage Harvest Value": 5,
  //       "Residue Suppresses Summer Annual Weeds": 5,
  //       "Outcompetes Winter Annual Weeds": 3,
  //       "Suppresses Winter Annual Weeds": 5,
  //       "Volunteer Establishment": 5,
  //       "Cover Crop Description":
  //         "A cross between rye and wheat, with characteristics intermediate between the two. High biomass yield potential is similar to wheat and rye. Matures later than rye, a little later than wheat. Plant height at heading shorter than rye. Therefore, spring residue is easier to manage than rye and (assuming same kill date) C:N ratio will be slightly lower than rye. Triticale feed quality generally better than rye, but not as good as wheat (chop triticale for silage at boot stage). Descr. modified from C. Lawrence, VA NRCS Cover Crop Planning Manual.\n",
  //       "Cover Crop Description References":
  //         "A cross between rye and wheat, with characteristics intermediate between the two. High biomass yield potential is similar to wheat and rye. Matures later than rye, a little later than wheat. Plant height at heading shorter than rye. Therefore, spring residue is easier to manage than rye and (assuming same kill date) C:N ratio will be slightly lower than rye. Triticale feed quality generally better than rye, but not as good as wheat (chop triticale for silage at boot stage). Descr. modified from C. Lawrence, VA NRCS Cover Crop Planning Manual.\n",
  //       "Reduces Crusting": 5,
  //       Notes:
  //         " Bloat risk and other animal health risks, similar to brassicas.",
  //       "Improve Soil Aggregation - Formula": 4,
  //       "Improve Soil Organic Matter - Formula": 1,
  //       "Lasting Residue - Formula": 1,
  //       "Prevent soil erosion - formula": 3,
  //       "Promote water quality - formula": 4,
  //       "Reduces subsurface compaction - formula": 1,
  //       "Nitrogen fixation - formula": 4,
  //       "Nitrogen scavenging - formula": 4,
  //       "Good grazing - formula": 5,
  //       "Forest harvest value - formula": 4,
  //       "Pollinator support - formula": 1,
  //       "Weed suppression - formula": 4,
  //       "Reduces topsoil compaction- formula": 2,
  //       "v Base Seed Price Per Acre Min": 50,
  //       "Base Seed Price Per Acre": 50,
  //       "f Base Seed Price Per Acre Min": 3,
  //       "Average Seeding Rate Min": [27.57894736842105],
  //       "Average Seeding Rate Max": [56.026315789473685],
  //       "f Base Seed Price Per Acre Max": 3,
  //       __id: "recTvoW3IW6QsNWQd",
  //       inBasket: false,
  //       "Image Data": {
  //         "Cover Crop": "Triticale, Winter",
  //         "Key Thumbnail": "Triticale_mature_Salon_2020.JPG",
  //         Notes: null,
  //         Directory: "Triticale, Winter",
  //       },
  //       "Crop Description":
  //         "A cross between rye and wheat, with characteristics intermediate between the two. High biomass yield potential is similar to wheat and rye. Matures later than rye, a little later than wheat. Plant height at heading is shorter than rye. Therefore, spring residue is easier to manage than rye and (assuming same kill date) C:N ratio will be slightly lower than rye. Triticale feed quality is generally better than rye, but not as good as wheat (i.e. chop triticale for silage at boot stage). Spring triticale varieties do not require vernalization (overwintering) to flower and may be less cold hardy than winter triticale varieties if planted in the fall.",
  //       id: "recTvoW3IW6QsNWQd",
  //       Drought: 3,
  //       Flood: 3,
  //       Heat: 3,
  //       "Low Fertility": 4,
  //       Salinity: 2,
  //       Shade: 3,
  //       "Tillage at Vegetative": 1,
  //       "Tillage at Flowering": 1,
  //       "Freezing at Flowering": 2,
  //       "Freezing at Vegetative": 1,
  //       "Chemical at Vegetative": 5,
  //       "Chemical at Flowering": 5,
  //       "Mow at Flowering": 5,
  //       "Frost Seeding": false,
  //       "Aerial Seeding": true,
  //     },
  //   },
  //   {
  //     id: "recKtaYjD61VgzVlZ",
  //     cropName: "Clover, Red",
  //     btnId: "cartBtn14",
  //     data: {
  //       _id: {
  //         $oid: "5f2a3349c570132255af591a",
  //       },
  //       "Cover Crop Name": "Clover, Red",
  //       "Scientific Name": "Trifolium pratense",
  //       "cv, var, or ssp to specify": "Medium red clover",
  //       Origin: "MCCC Species tool",
  //       "Drought Tolerance": 3,
  //       "Shade Tolerance": 4,
  //       "Flood Tolerance": 3,
  //       "Low Fertility Tolerance": 3,
  //       "Salinity Tolerance": 1,
  //       "Winter Survival": ["Expected"],
  //       "Active Growth Period": ["Spring", "Summer", "Fall"],
  //       Duration: ["Short-lived Perennial"],
  //       "Shape & Orientation": ["Erect"],
  //       "Frost Seeding": true,
  //       "Review Status": "Zone Team Start",
  //       "Soil Drainage": [
  //         "Poorly drained",
  //         "Somewhat poorly drained",
  //         "Moderately well drained",
  //         "Well drained",
  //       ],
  //       "Min Germination Temp (F)": 41,
  //       "Seeds per Pound": 272160,
  //       "Inoculant Type (Legumes Only)": ["red clover", "white clover"],
  //       "Seeding Rate: Broadcast (w/cultivation) (lbs/A)": "10-13",
  //       "Seeding Rate: Drilled/Cultipack and Cultivation (lbs/A)": "8-10",
  //       "Seeding Rate: Aerial (lbs/A)": "12-15",
  //       "Drilled Depth Min": 0.25,
  //       "Notes: Planting":
  //         "Can be frost seeded into wheat and other winter annual small grains. Can be included in mixes with other winter annuals but the seed should be separated and put in the small seed box.  Organic Farmers have used this for years throughout the Northeast to spin on corn at layby time during last cultivation. In conventional farming we have used this planted with the interseeder to interseed into corn at layby time. ",
  //       Harvestability: 5,
  //       "Loosens Topsoil": 3,
  //       "Frees P & K": 5,
  //       "Growing Window": "Long",
  //       "Ease of Establishment": 3,
  //       "Family Common Name": "Pea family",
  //       "Family Scientific Name": "Fabaceae",
  //       "Soil Textures": ["Coarse", "Fine", "Medium"],
  //       "Minimum Tolerant Soil pH": 6,
  //       "Maximum Tolerant Soil pH": 7.2,
  //       "Soil Moisture Use": "Low",
  //       "Cover Crop Group": "Legume",
  //       "Heat Tolerance": 4,
  //       "Seed Price per Pound": 3,
  //       "USDA Symbol": "TRPR2",
  //       "Zone Decision": "Include",
  //       "Zone Use": "Common",
  //       "Flooding Frequency Tolerance": "Moderate",
  //       "Nitrogen Accumulation Min, Legumes (lbs/A/y)": 70,
  //       "Dry Matter Min (lbs/A/y)": 2000,
  //       "C to N Ratio": 1,
  //       "Notes: Termination [Goal: Method: Timing]":
  //         "If using herbicides to terminate use a tank mixture (e.g., glyphosate + dicamba or 2,4-d)",
  //       "Loosens Subsurface Soil": 3,
  //       "Supports Mycorrhizae": 3,
  //       "Early Spring Growth": 4,
  //       "Flowering Trigger": ["Vernalization"],
  //       "Establishes Quickly": 4,
  //       "Root Architecture": ["Tap"],
  //       "Root Depth": "Deep",
  //       "Notes: Growth, Roots, and Nutrients":
  //         "Minimum Germination Temp. 41˚F   Medium Red Clover seed is a small seed, for successful Red Clover establishment the soil should be firm (packed). Being a small seed, it should not be planted too deep, only up to ¼ inch deep. Most establishment problems have resulted from planting the seed to deep. In mixes, include this in the small box of the drill or adjust the drill accordingly that the seed is not placed too deep. ",
  //       "Tillage Termination at Vegetative": 1,
  //       "Pollinator Habitat": 4,
  //       "Grazing Value": 5,
  //       "Pollinator Food": 5,
  //       "Grazing Tolerance": 5,
  //       "Tillage Termination at Flowering": 1,
  //       "Freezing Termination at Vegetative": 1,
  //       "Freezing Termination at Flowering": 1,
  //       "Chemical Termination at Flowering": 5,
  //       "Mow Termination at Flowering": 3,
  //       "Chemical Termination at Vegetative": 3,
  //       "Mow Termination at Vegetative": 3,
  //       "Roller Crimp Termination at Flowering": 3,
  //       "Roller Crimp Tolerance at Vegetative": 1,
  //       "Volunteer Establishment - MW Tool Data": 5,
  //       Persistence: 5,
  //       "Seed price per acre: Drilled/Cultipack and Cultivation": 1,
  //       "Seed price per acre: Aerial": 2,
  //       "Seed price per acre: Broadcast (w/cultivation)": 1,
  //       "Dry Matter Rating": 2,
  //       "Total N Fixed Rating": true,
  //       "February, Early": ["Frost Seeding"],
  //       "February, Mid": ["Frost Seeding"],
  //       "March, Mid": [
  //         "Reliable establishment/growth",
  //         "Reliable Establishment/Growth",
  //       ],
  //       "March, Early": ["Frost Seeding", "Reliable Establishment/Growth"],
  //       "June, Mid": ["Can interseed"],
  //       "June, Early": ["Can interseed"],
  //       "May, Early": [
  //         "Reliable establishment/growth",
  //         "Reliable Establishment/Growth",
  //       ],
  //       "April, Mid": [
  //         "Reliable establishment/growth",
  //         "Reliable Establishment/Growth",
  //       ],
  //       "April, Early": [
  //         "Reliable establishment/growth",
  //         "Reliable Establishment/Growth",
  //       ],
  //       "September, Early": [
  //         "Reliable establishment/growth",
  //         "Late seeding rate",
  //         "Reliable Establishment/Growth",
  //       ],
  //       "August, Mid": [
  //         "Reliable establishment/growth",
  //         "Standard seeding rate",
  //         "Reliable Establishment/Growth",
  //         "Reliable Establishment/Growth",
  //       ],
  //       "August, Early": [
  //         "Reliable establishment/growth",
  //         "Early seeding rate",
  //         "Reliable Establishment/Growth",
  //       ],
  //       "July, Mid": ["Can interseed"],
  //       "July, Early": ["Can interseed"],
  //       "Seeding Rate Calculator": ["recTXujRQV7QGYQkE"],
  //       "Base Seeding Rate Min (lbs/A)": 8,
  //       "Base Seeding Rate Max (lbs/A)": 10,
  //       "Seed Price Calculator": ["recwqPQb3QmzxiCYv"],
  //       "Base Seed Price Per Acre Min": 1,
  //       "Base Seed Price Per Acre Max": 1,
  //       "Frost Seeding Start": "2020-02-01",
  //       "Frost Seeding End": "2020-03-15",
  //       "Reliable Establishment/Growth Start": "2020-03-15",
  //       "Reliable Establishment/Growth End": "2020-05-15",
  //       "Second Reliable Establishment/Growth Start": "2020-08-01",
  //       "Second Reliable Establishment/Growth End": "2020-09-15",
  //       "Can Interseed Start": "2020-06-01",
  //       "Can Interseed End": "2020-08-15",
  //       "Early Fall/Winter Seeding Rate Start": "2020-08-01",
  //       "Early Fall/Winter Seeding Rate Stop": "2020-08-15",
  //       "Standard Fall/Winter Seeding Rate Start": "2020-08-15",
  //       "Standard Fall/Winter Seeding Rate End": "2020-09-01",
  //       "Late Fall/Winter Seeding Rate Start": "2020-09-01",
  //       "Late Fall/Winter Seeding Rate End": "2020-09-07",
  //       "Nitrogen Accumulation Max, Legumes (lbs/A/y)": 150,
  //       "Dry Matter Max (lbs/A/y)": 5000,
  //       "Drilled Depth Max": 0.5,
  //       "Early Spring Seeding Rate Start": "2020-04-15",
  //       "Early Spring Seeding Rate End": "2020-06-01",
  //       "Promotes Nematodes": 3,
  //       "C to N Ratio 3-star": 1,
  //       "Suppresses Cash Crop Disease": 1,
  //       "Promotes Cash Crop Disease": 3,
  //       "Discourages Pest Insects": 1,
  //       "Promotes Pest Insects": 1,
  //       "Outcompetes Summer Annual Weeds": 3,
  //       "Allelopathic to Weeds": 2,
  //       "Improve Soil Organic Matter": 3,
  //       "Lasting Residue": 2,
  //       "Increase Soil Aggregation": 3,
  //       "Prevent Fall Soil Erosion": 3,
  //       "Promote Water Quality": 1,
  //       "Prevent Spring Soil Erosion": 4,
  //       "Penetrates Plow Pan": 3,
  //       "Reduces Surface Compaction": 3,
  //       "Nitrogen Fixation": 4,
  //       "Nitrogen Scavenging": 1,
  //       "Good Grazing": 4,
  //       "Forage Harvest Value": 5,
  //       "Residue Suppresses Summer Annual Weeds": 2,
  //       "Outcompetes Winter Annual Weeds": 3,
  //       "Suppresses Winter Annual Weeds": 3,
  //       "Volunteer Establishment": 5,
  //       "Cover Crop Description":
  //         "Short-lived perennial. Slower growing, must be seeded earlier, killed later than winter pea, crimson clover, hairy vetch. Establishes readily, shade tolerant, very winter-hardy, inexpensive. Moderate N fixation. Best on good soils with high fertility; tolerates some wetness. Use\nmulti-cut medium or one-cut mammoth varieties. Consider spring oat nurse or wheat/triticale companion. Inoculate! Cross inoculates with crimson or white clover. Descr. modified from C. Lawrence, VA NRCS Cover Crop Planning Manual.\n",
  //       "Cover Crop Description References":
  //         "Short-lived perennial. Slower growing, must be seeded earlier, killed later than winter pea, crimson clover, hairy vetch. Establishes readily, shade tolerant, very winter-hardy, inexpensive. Moderate N fixation. Best on good soils with high fertility; tolerates some wetness. Use\nmulti-cut medium or one-cut mammoth varieties. Consider spring oat nurse or wheat/triticale companion. Inoculate! Cross inoculates with crimson or white clover. Descr. modified from C. Lawrence, VA NRCS Cover Crop Planning Manual.\n",
  //       "Reduces Crusting": 3,
  //       Notes:
  //         "Manage for bloat when grazing. When the crop is stressed it can produce phytoestrogens, so do not graze breeding/pregnant sheep on red clover.",
  //       "Notes: Pollinators":
  //         "Delay termination until at least 30-50% bloom to maximize value to pollinators.",
  //       "Notes: Nematodes": "Host for root-knot nematode.",
  //       "Improve Soil Aggregation - Formula": 2,
  //       "Improve Soil Organic Matter - Formula": 1,
  //       "Lasting Residue - Formula": 1,
  //       "Prevent soil erosion - formula": 2,
  //       "Promote water quality - formula": 4,
  //       "Reduces subsurface compaction - formula": 3,
  //       "Nitrogen fixation - formula": 5,
  //       "Nitrogen scavenging - formula": 3,
  //       "Good grazing - formula": 5,
  //       "Forest harvest value - formula": 5,
  //       "Pollinator support - formula": 5,
  //       "Weed suppression - formula": 3,
  //       "Reduces topsoil compaction- formula": 2,
  //       "v Base Seed Price Per Acre Min": 24,
  //       "Base Seed Price Per Acre": 24,
  //       "f Base Seed Price Per Acre Min": 1,
  //       "Average Seeding Rate Min": [27.57894736842105],
  //       "Average Seeding Rate Max": [56.026315789473685],
  //       "f Base Seed Price Per Acre Max": 1,
  //       __id: "recKtaYjD61VgzVlZ",
  //       inBasket: false,
  //       "Image Data": {
  //         "Cover Crop": "Clover, Red",
  //         "Key Thumbnail": "Clover_red_flowering_Ackroyd_2020_crop.JPG",
  //         Notes: null,
  //         Directory: "Clover, Red",
  //       },
  //       "Crop Description":
  //         "Short-lived upright perennial, often lasts two years. Often grown for hay. Best on good soils with high fertility; tolerates some wetness. Establishes readily, shade tolerant, very winter-hardy, inexpensive. Resists some problem nematodes, good taproot. Moderate to xcellent N fixation depending on planting timing. Excellent forage, blooms for pollinators. For fall-seeding, use multi-cut medium or one-cut mammoth varieties. Multi-cut “medium” types best for spring planting. Keep hayed (¼-⅓ bloom) or clipped high to avoid seed set, keep stand vegetative. Mix with grasses like orchardgrass or fescue to moderate C:N ratio at termination. Consider seeding with spring oat nurse crop at low rate in fall or small grain that will be harvested/mowed to “release” clover understory. Inoculate with appropriate Rhizobium spp.; cross inoculates with crimson or white clover. Slower growing, must be seeded earlier and killed later than other fall-seeded legumes.",
  //       id: "recKtaYjD61VgzVlZ",
  //       Drought: 3,
  //       Flood: 3,
  //       Heat: 4,
  //       "Low Fertility": 3,
  //       Salinity: 1,
  //       Shade: 4,
  //       "Tillage at Vegetative": 1,
  //       "Tillage at Flowering": 1,
  //       "Freezing at Flowering": 1,
  //       "Freezing at Vegetative": 1,
  //       "Chemical at Vegetative": 3,
  //       "Chemical at Flowering": 5,
  //       "Mow at Flowering": 3,
  //       "Aerial Seeding": false,
  //     },
  //   },
  // ],
  selectedGoals: [],
  // selectedGoals: [
  //   "Improve Soil Organic Matter",
  //   "Increase Soil Aggregation",
  //   "Lasting Residue",
  // ],
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
  // zone: 7,
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
  // myCoverCropActivationFlag: true,
  myCoverCropActivationFlag: false,
  // speciesSelectorActivationFlag: false,
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
