import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";

// const StoreContext = createContext();

const initialState = {
  progress: 1,
  address: "",
  markers: [[39.03, -76.92]],
  // markers: [[35.76422, 78.69976]],
  showAddressChangeBtn: false,
  allGoals: [],
  cropData: [],
  selectedCrops: [],
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
  snackHorizontal: "center",
  snackMessage: "",
  modalOpen: false,
  modalSize: "lg", //sm,md,lg,fluid
  modalBody: {},
  addToCartBtnText: "add to list",
  zoneText: "0",
  zone: 0,
  soilData: [],
  weatherData: []
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};
export const Context = createContext(initialState);
export default Store;
