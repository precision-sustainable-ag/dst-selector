/*
  toggles between zip and address
*/

import React, { useState, useContext } from "react";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { GreenSwitch } from "../../shared/constants";
import { Context } from "../../store/Store";

const LocationToggleComponent = (props) => {
  const [defaultValue, setDefaultValue] = useState("address");
  const [state, dispatch] = useContext(Context);
  const children = [
    <ToggleButton
      key={1}
      value="address"
      selected={state.addressSearchPreference === "address" ? true : false}
    >
      Address
    </ToggleButton>,
    <ToggleButton
      key={2}
      value="zip"
      selected={state.addressSearchPreference === "zip" ? true : false}
    >
      ZIP Code
    </ToggleButton>,
  ];

  const handleChange = (e, value) => {
    setDefaultValue(value);
    dispatch({
      type: "UPDATE_ADDRESS_SEARCH_PREFERENCE",
      data: {
        addressSearchPreference: value,
      },
    });
  };
  return (
    <ToggleButtonGroup
      size="small"
      value={defaultValue}
      exclusive
      onChange={handleChange}
      color="secondary"
    >
      {children}
    </ToggleButtonGroup>
  );
};

export default LocationToggleComponent;
