import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";

// const StoreContext = createContext();

const initialState = {
  // progress: 5,
  progress: 0,
  address: "1139, Crab Orchard",
  markers: [[39.03, -76.92]],
  // markers: [[35.76422, 78.69976]],
  showAddressChangeBtn: false,
  allGoals: [],
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
  // selectedGoals: [
  //   "Lasting residue",
  //   "Nitrogen scavenging",
  //   "Prevent soil erosion"
  // ],
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
  zoneText: "Zome 7",
  zone: 7,
  soilData: [
    {
      loam: 54,
      siltLoam: 38
    }
  ],
  weatherData: [
    {
      firstFrost: "Oct 13",
      averageRain: 3.46
    }
  ],
  myCoverCropActivationFlag: false,
  speciesSelectorActivationFlag: true
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};
export const Context = createContext(initialState);
export default Store;
