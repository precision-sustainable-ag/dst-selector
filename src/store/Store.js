import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";

// const StoreContext = createContext();

const initialState = {
  // progress: 3,
  progress: 5,
  // address: "",
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
  cropData: [],
  selectedCrops: [],
  // selectedCrops: [
  //   {
  //     id: "rec0fkRSPW2unbR48",
  //     cropName: "Radish, Forage",
  //     btnId: "cartBtn0",
  //     data: {
  //       "Cover Crop Name": "Radish, Forage",
  //       "Scientific Name": "Raphanus sativus",
  //       "cv, var, or ssp to specify": "Forage (CCS-779)",
  //       Origin: "MCCC Species tool",
  //       "Common Mixes": ["recCZSADGMOXfJRKQ", "rec4R86SQblxRbtBF"],
  //       "Drought Tolerance": 2,
  //       "Shade Tolerance": 3,
  //       "Flood Tolerance": 2,
  //       "Low Fertility Tolerance": 2,
  //       "Salinity Tolerance": 1,
  //       "Winter Survival": ["Seldom"],
  //       "Active Growth Period": ["Fall", "Spring"],
  //       Duration: ["Annual"],
  //       "Shape & Orientation": ["Erect"],
  //       "Broadcast Frost Seeding": true,
  //       "Review Status": "Zone Team Start",
  //       "Soil drainage": [
  //         "Poorly drained",
  //         "Somewhat poorly drained",
  //         "Moderately well drained",
  //         "Well drained",
  //         "Well drained muck"
  //       ],
  //       "Min Germination Temp (F)": 45,
  //       "Seeds per pound": 20000,
  //       "Inoculant type (Legumes only)": ["none"],
  //       "Seeding Rate: Broadcast (w/cultivation) (lbs/A)": "6-15",
  //       "Seeding Rate: Drilled/Cultipack and Cultivation (lbs/A)": "5-12",
  //       "Seeding Rate: Aerial (lbs/A)": "7-18",
  //       "Drilled Depth": "¼-¾",
  //       Harvestability: 2,
  //       "Loosens topsoil": 2,
  //       "Frees P & K": 3,
  //       "Growing window": "Medium",
  //       "Ease of establishment": 1,
  //       "Family Common Name": "Mustard family",
  //       "Family Scientific Name": "Brassicaceae",
  //       "Soil textures": ["coarse", "medium", "fine"],
  //       "Minimum tolerant soil pH": 6,
  //       "Maximum tolerant soil pH": 8,
  //       "Soil moisture use": "Medium",
  //       "Cover Crop Group": "Brassica",
  //       "Heat Tolerance": 3,
  //       "Seed price per pound": 2,
  //       "Can Aerial Seed or broadcast w/no cultivation?": true,
  //       "USDA Symbol": "RASA2",
  //       "Zone Decision": "Include",
  //       "State Use": "Common",
  //       "Flooding/Ponding Tolerance": "Poor",
  //       "Total N Fixed (lbs/A/y)": "0",
  //       "Dry Matter (lbs/A/y)": "1200-3000",
  //       "C to N Ratio": 1,
  //       "Notes: Termination [Goal: Method: Timing]":
  //         "More likely to survive if frost occurs prior to formation of storage root.",
  //       "Loosens subsurface soil": 5,
  //       "Supports mycorrhizae": 1,
  //       "Early spring growth": 1,
  //       "Flowering trigger": ["Long day (>14 hours)"],
  //       "Establishes quickly": 4,
  //       "Root architecture": "Tap",
  //       "Root depth": "Deep",
  //       "Notes: Growth, Roots, and Nutrients":
  //         "Minimum Germination Temp. ~ 45˚F",
  //       "Tillage Termination at Vegetative": 3,
  //       "Pollinator Habitat": 2,
  //       "Grazing Value": 4,
  //       "Pollinator Food": 2,
  //       "Grazing Tolerance": 4,
  //       "Notes: Grazers & Pollinators":
  //         "Winter kills at 25°F; Attracts earthworms",
  //       "Tillage Termination at Flowering": 3,
  //       "Freezing Termination at Vegetative": 4,
  //       "Freezing Termination at Flowering": 5,
  //       "Chemical Termination at Flowering": 5,
  //       "Mow Termination at Flowering": 5,
  //       "Chemical Termination at Vegetative": 4,
  //       "Mow Termination at Vegetative": 5,
  //       "Roller Crimp Termination at Flowering": 1,
  //       "Roller Crimp Tolerance at Vegetative": 1,
  //       "Seed price per acre: Drilled/Cultipack and Cultivation": 1,
  //       "Seed price per acre: Aerial": 1,
  //       "Seed price per acre: Broadcast (w/cultivation)": 1,
  //       "Dry Matter Rating": 2,
  //       "March, Mid": ["Reliable establishment/growth"],
  //       "March, Early": ["Reliable establishment/growth"],
  //       "June, Mid": ["Can interseed"],
  //       "June, Early": ["Can interseed"],
  //       "May, Mid": ["Reliable establishment/growth"],
  //       "May, Early": ["Reliable establishment/growth"],
  //       "April, Mid": ["Reliable establishment/growth"],
  //       "April, Early": ["Reliable establishment/growth"],
  //       "September, Mid": ["Reliable establishment/growth"],
  //       "September, Early": [
  //         "Reliable establishment/growth",
  //         "Late seeding rate"
  //       ],
  //       "August, Mid": [
  //         "Reliable establishment/growth",
  //         "Standard seeding rate"
  //       ],
  //       "August, Early": [
  //         "Reliable establishment/growth",
  //         "Early seeding rate"
  //       ],
  //       "July, Mid": ["Early seeding rate"],
  //       "July, Early": ["Can interseed"],
  //       "October, Early": ["Temperature/moisture risk to establishment/growth"],
  //       "Seeding Rate Calculator": ["recEHWardn0xNZ2bI"],
  //       "Base Seeding Rate Min (lbs/A)": 5,
  //       "Base Seeding Rate Max (lbs/A)": 12,
  //       "Seed Price Calculator": ["recwqPQb3QmzxiCYv"],
  //       "Base Seed Price Per Acre Min": 1,
  //       "Base Seed Price Per Acre Max": 1,
  //       "Improve soil aggregation": 1,
  //       "Improve soil organic matter": 2,
  //       "Lasting residue": 2,
  //       "Prevent soil erosion": 1,
  //       "Promote water quality": 3,
  //       "Reduces subsurface compaction": 5,
  //       "Nitrogen fixation": 2,
  //       "Nitrogen scavenging": 4,
  //       "Good grazing": 5,
  //       "Forest harvest value": 4,
  //       "Pollinator support": 3,
  //       "Weed suppression": 3,
  //       "Reduces topsoil compaction": 1,
  //       "v Base Seed Price Per Acre Min": 10,
  //       "Base Seed Price Per Acre": 10,
  //       "f Base Seed Price Per Acre Min": 1,
  //       "Average Seeding Rate Min": [27.57894736842105],
  //       "Average Seeding Rate Max": [56.026315789473685],
  //       "f Base Seed Price Per Acre Max": 1
  //     }
  //   }
  // ],

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
  // weatherData: [
  //   {
  //     firstFrost: "Oct 13",
  //     averageRain: 3.46
  //   }
  // ],
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
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};
export const Context = createContext(initialState);
export default Store;
