import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";
import crops from "../shared/crop-data.json";
import moment from "moment-timezone";
import img from "../shared/image-dictionary.json";
import desc from "../shared/crop-descriptions.json";

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
const tjson = crops;
let tjs = tjson.map((crop) => {
  // val["fields"] = val;
  let val = { fields: crop };

  val = monthStringBuilder(val);

  val.fields["Image Data"] = img[val.fields["Cover Crop Name"]];

  val.fields["Crop Description"] = desc[val.fields["Cover Crop Name"]]
    ? desc[val.fields["Cover Crop Name"]]
    : loremText;
  //   Frost Seeding Start: Blue
  // Frost Seeding End: Blue
  // Reliable Establishment Start: Green
  // Reliable Establishment End: Green
  // Second Reliable Establishment Start: Green
  // Second Reliable Establishment End: Green
  // Temperature/Moisture Risk to Establishment Start: Yellow
  // Temperature/Moisture Risk to Establishment End: Yellow
  // Second Temperature/Moisture Risk to Establishment Start: Yellow
  // Second Temperature/Moisture Risk to Establishment End: Yellow

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
  // markers: [
  //   [39.025872701277045, -76.919398766395],
  //   [39.02453911720003, -76.92171701589375],
  //   [39.02343889139721, -76.92030030786674],
  //   [39.02518924258037, -76.9176171487247],
  // ],
  // markers: [[35.76422, 78.69976]],
  showAddressChangeBtn: false,
  selectedCheckboxes: [],
  selectedStars: {},
  allGoals: [],
  // allGoals: [
  //   {
  //     id: "rec4LcUaBDq5GCcXL",
  //     fields: {
  //       "Cover Crop Goal": "Lasting residue",
  //       Description:
  //         "Rates the effectiveness of the cover crop in providing a long-lasting mulch.",
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "recJPIQ6aEjfOtTgF",
  //         "recMjAddemfDnNFqI"
  //       ],
  //       "Thinking about Rules":
  //         "Dry matter - high, C to N ratio - high (3 star)",
  //       Notes:
  //         "Since this has the same consituent variables as Improve soil organic matter, could they be lumped together some how?",
  //       "Constituent Variables Priorities": "C to N Ratio, Dry Matter (lbs/A/y)"
  //     },
  //     createdTime: "2019-08-19T16:53:43.000Z"
  //   },
  //   {
  //     id: "rec7y2ybQxIFdIjbC",
  //     fields: {
  //       "Cover Crop Goal": "Nitrogen scavenging",
  //       Description:
  //         "Rates a cover crop’s ability to take up and store excess nitrogen. Bear in mind that the sooner you plant a cover after main crop harvest—or overseed a cover into the standing crop—the more N it will be able to absorb.",
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "recHtDRj37jAAzNIj",
  //         "recoB4dI7D89Dc7a6",
  //         "receCQBBxMfKbWEyv",
  //         "recMjAddemfDnNFqI",
  //         "recqucMZjRgbifMQN"
  //       ],
  //       "Thinking about Rules":
  //         "Dry matter - high, early spring growth - high (4-5 stars) , establishes quickly - high (4-5 stars), root depth - deep",
  //       Notes:
  //         "In areas where precip falls as rain for most of the winter, water will percolate causing N to move more; early planting is key to scavenging in such areas (as opposed to where ground freezes hard or snow cover is mostly present.)",
  //       "Constituent Variables Priorities":
  //         "Early spring growth, Establishes quickly, Root depth, Dry Matter (lbs/A/y), Family Common Name"
  //     },
  //     createdTime: "2019-08-19T21:18:02.000Z"
  //   },
  //   {
  //     id: "rec9qULCT41IBsVUo",
  //     fields: {
  //       "Cover Crop Goal": "TBD- Suppress pest (non-weed) & diseases",
  //       Description:
  //         "Rates how well the cover crop suppresses diseases, insects, slugs, and other non-weed pests."
  //     },
  //     createdTime: "2019-08-19T21:18:02.000Z"
  //   },
  //   {
  //     id: "recCO2vWyryVqhr6S",
  //     fields: {
  //       "Cover Crop Goal": "Forage harvest value",
  //       Description: "Suitability as harvested forage (e.g., haylage).",
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "recH1sx9ffdPlprUq",
  //         "recwPtOlsZzf8eesZ"
  //       ],
  //       "Thinking about Rules":
  //         "grazing value - high (4-5 stars), harvestability - high (4-5 stars)",
  //       "Constituent Variables Priorities": "Harvestability, Grazing value"
  //     },
  //     createdTime: "2019-08-19T21:18:02.000Z"
  //   },
  //   {
  //     id: "recNPzZAnuNCjqdAb",
  //     fields: {
  //       "Cover Crop Goal": "Pollinator support",
  //       Description:
  //         "Ability to provide resources needed by beneficials (e.g., shelter, nectar)",
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "recwPeXH4vksA8RE6",
  //         "recjWdifpop3L0cca"
  //       ],
  //       "Thinking about Rules":
  //         "pollinator habitat - high (4-5 stars), pollinator food - high (4-5 stars)",
  //       "Constituent Variables Priorities":
  //         "Pollinator food, Pollinator habitat"
  //     },
  //     createdTime: "2019-08-19T21:18:02.000Z"
  //   },
  //   {
  //     id: "recRLXdSv7FLRTceX",
  //     fields: {
  //       "Cover Crop Goal": "Nitrogen fixation",
  //       Description:
  //         "Rates cover crops for their relative ability to supply fixed N. Limiting to Legumes.",
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "recHtDRj37jAAzNIj",
  //         "recMjAddemfDnNFqI",
  //         "rec9PiL8Zj2uMWfHH"
  //       ],
  //       "Thinking about Rules":
  //         "total N fixed - high (4-5 stars), dry matter - high (4-5 stars), early spring growth - high (4-5 stars)",
  //       Notes: "total N fixed needs to be converted to a rating",
  //       "Constituent Variables Priorities":
  //         "Total N Fixed (lbs/A/y)\nEarly spring growth\nDry Matter (lbs/A/y)"
  //     },
  //     createdTime: "2019-08-19T21:18:02.000Z"
  //   },
  //   {
  //     id: "recdSAmLuTKzbcwln",
  //     fields: {
  //       "Cover Crop Goal": "Good grazing",
  //       Description: "Suitability for grazing.",
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "recoB4dI7D89Dc7a6",
  //         "recsNm4y8moJnMzw6",
  //         "recwPtOlsZzf8eesZ"
  //       ],
  //       "Thinking about Rules":
  //         "grazing value - high (4-5 stars), grazing tolerance - high (4-5 stars), establishes quickly - high (4-5 stars)",
  //       "Constituent Variables Priorities":
  //         "Establishes quickly, Grazing tolerance, Grazing value"
  //     },
  //     createdTime: "2019-08-19T21:18:02.000Z"
  //   },
  //   {
  //     id: "recfo3LgGYl8iI4Qp",
  //     fields: {
  //       "Cover Crop Goal": "Reduces subsurface soil compaction",
  //       Description: 'Reduces compaction in the top 0-6" and/or 6-12" of soil.',
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "recVLbzeOzNMAdLZD",
  //         "receCQBBxMfKbWEyv",
  //         "rec6QUh7mboLxMjHp"
  //       ],
  //       "Thinking about Rules":
  //         "loosens subsurface soil - high (4-5 stars), root depth - deep, root architecture - tap",
  //       Notes:
  //         "do cover crops need to be rated high on loosens subsurface and top soil? or just one? or the other? Also, doesnt' that impact which root architecture matters? There seems to be a bit of nuance to this.",
  //       "Constituent Variables Priorities":
  //         "Root architecture, Root depth, Loosens subsurface soil"
  //     },
  //     createdTime: "2019-08-19T21:18:02.000Z"
  //   },
  //   {
  //     id: "recifuund3Kc4UuUt",
  //     fields: {
  //       "Cover Crop Goal": "TBD- Hinder crops (anti-goal)",
  //       Description:
  //         "Rates how likely the CC is to interfere with the cash crop (e.g., through creating a poor seed bed, immobilizing soil N, etc.)",
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "recJPIQ6aEjfOtTgF",
  //         "recMjAddemfDnNFqI"
  //       ],
  //       "Thinking about Rules":
  //         "Dry matter - low, C to N ratio - high (5 star)",
  //       "Constituent Variables Priorities": "C to N Ratio, Dry Matter (lbs/A/y)"
  //     },
  //     createdTime: "2019-08-19T21:18:02.000Z"
  //   },
  //   {
  //     id: "recjQE8nDL7x25vg6",
  //     fields: {
  //       "Cover Crop Goal": "Weed suppression",
  //       Description:
  //         "Rates how well the cover crop out-competes weeds by any means through its life cycle, including killed residue. || opposite description: \n[Risk that a cover crop could become a weed, either due to hard seed or due to flowering/setting seed that volunteers in later seasons; made worse when herbicide resistance is a known feature of the cover crop species/cultivar]",
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "recJPIQ6aEjfOtTgF",
  //         "recJ7JmQiCQKcgZD2",
  //         "recoB4dI7D89Dc7a6",
  //         "recMjAddemfDnNFqI"
  //       ],
  //       "Thinking about Rules":
  //         "Dry matter - high,  C to N - high, establishes quickly - high (4-5 stars), shape and orientation - ?",
  //       "Constituent Variables Priorities":
  //         "C to N Ratio, Shape & Orientation, Establishes quickly, Dry Matter (lbs/A/y)"
  //     },
  //     createdTime: "2019-08-19T21:18:02.000Z"
  //   },
  //   {
  //     id: "recneO0wlTb4t0KdC",
  //     fields: {
  //       "Cover Crop Goal": "Promote water quality",
  //       Description: "Improve or maintain water quality.",
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "receCQBBxMfKbWEyv",
  //         "recVLbzeOzNMAdLZD",
  //         "recyMjvRTKgxpvVoX",
  //         "recJPIQ6aEjfOtTgF",
  //         "rec9vYObq3SiwL1rK",
  //         "recJ7JmQiCQKcgZD2",
  //         "recxcF1h42PcoEyAz",
  //         "recoB4dI7D89Dc7a6",
  //         "recHtDRj37jAAzNIj",
  //         "recMjAddemfDnNFqI"
  //       ],
  //       "Thinking about Rules":
  //         "Dry matter - high, early spring growth - high (4-5 stars) , establishes quickly - high (4-5 stars), Supports Mycorrhizae - high (4 and 5 stars), [goals: nitrogen scavenging, prevents soil erosion]",
  //       "Constituent Variables Priorities":
  //         "Root depth, Root architecture, Winter Survival, C to N Ratio, Growing window, Shape & Orientation, Supports mycorrhizae, Establishes quickly, Early spring growth, Dry Matter (lbs/A/y)"
  //     },
  //     createdTime: "2019-08-19T21:18:02.000Z"
  //   },
  //   {
  //     id: "recrZZvnT6xhPfTdN",
  //     fields: {
  //       "Cover Crop Goal": "Prevent soil erosion",
  //       Description:
  //         "Rates how extensive and how quickly a root system develops, how well it holds soil against sheet and water erosion and the influence the growth habit may have on fighting water erosion.",
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "recVLbzeOzNMAdLZD",
  //         "recJ7JmQiCQKcgZD2",
  //         "recyMjvRTKgxpvVoX",
  //         "recJPIQ6aEjfOtTgF",
  //         "rec9vYObq3SiwL1rK",
  //         "recMjAddemfDnNFqI"
  //       ],
  //       "Thinking about Rules":
  //         "Dry matter - high, growing window - long, C to N - high, winter survival - expected, shape and orientation -?, root architecture - fibrous",
  //       Notes: "Don't know how shape and orientation impact this.",
  //       "Constituent Variables Priorities":
  //         "Root architecture, Shape & Orientation, Winter Survival, C to N Ratio, Growing window, Dry Matter (lbs/A/y)"
  //     },
  //     createdTime: "2019-08-19T21:18:02.000Z"
  //   },
  //   {
  //     id: "recsQbgLYFneFwXyr",
  //     fields: {
  //       "Cover Crop Goal": "Reduces topsoil compaction",
  //       Description: 'Reduces compaction in the top 0-6" and/or 6-12" of soil.',
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "recVLbzeOzNMAdLZD",
  //         "receCQBBxMfKbWEyv",
  //         "recLlVSvSYfmF7PZV"
  //       ],
  //       "Thinking about Rules":
  //         "loosens topsoil - high (4-5 stars), root depth - deep, root architecture - fibrous",
  //       Notes:
  //         "do cover crops need to be rated high on loosens subsurface and top soil? or just one? or the other? Also, doesnt' that impact which root architecture matters? There seems to be a bit of nuance to this.",
  //       "Constituent Variables Priorities":
  //         "Root architecture, Root depth, Loosens topsoil"
  //     },
  //     createdTime: "2019-10-28T19:23:21.000Z"
  //   },
  //   {
  //     id: "recvb8xD7c7teakpI",
  //     fields: {
  //       "Cover Crop Goal": "Improve soil organic matter",
  //       Description:
  //         "Rates a cover crop’s ability to produce organic matter and improve soil structure. The ratings assume that you plan to use cover crops regularly in your cropping system to provide ongoing additions to soil organic matter. Think quality and quantity.",
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "recJPIQ6aEjfOtTgF",
  //         "recMjAddemfDnNFqI"
  //       ],
  //       "Thinking about Rules":
  //         "5 stars: Dry matter = 3, C to N ratio = 2; 4 stars: Dry matter = 3 and C to N ratio = 3, or Dry matter = 2 and C to N ratio = 2; 3 stars: Dry matter = 2 and C to N ratio = 3;  2 stars: Dry matter = 2 and C to N ratio = 1; 1 star: Dry matter = 1 and C to N ratio = 1",
  //       Notes:
  //         "Convert dry matter to a rating. C to N is currently a 3 star rating.",
  //       "Constituent Variables Priorities": "C to N Ratio, Dry Matter (lbs/A/y)"
  //     },
  //     createdTime: "2019-08-19T16:53:43.000Z"
  //   },
  //   {
  //     id: "recwKWXsn8Xg5vdSI",
  //     fields: {
  //       "Cover Crop Goal": "Increase soil aggregation",
  //       Description: "Stability rather high turnover.",
  //       "Constituent Variables (defined in DataDictionary)": [
  //         "recVLbzeOzNMAdLZD",
  //         "recxcF1h42PcoEyAz"
  //       ],
  //       "Thinking about Rules":
  //         "Supports Mycorrhizae - high (4 and 5 stars), root architecture - fibrous",
  //       "Constituent Variables Priorities":
  //         "Root architecture, Supports mycorrhizae"
  //     },
  //     createdTime: "2019-08-19T16:53:43.000Z"
  //   }
  // ],
  cropData: tjs,
  selectedCrops: [],

  selectedGoals: ["Good Grazing"],
  // selectedGoals: [],
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
  weatherDataReset: false,
  filterString: "",
  filterKeys: [],
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};
export const Context = createContext(initialState);
export default Store;
