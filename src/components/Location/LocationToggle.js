import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { GreenSwitch } from "../../shared/constants";

const LocationToggleComponent = props => {
  const [defaultValue, setDefaultValue] = useState("default");
  const children = [
    <ToggleButton key={1} value="default">
      Address
    </ToggleButton>,
    <ToggleButton key={2} value="city">
      City
    </ToggleButton>,
    <ToggleButton key={3} value="county">
      County
    </ToggleButton>,
    <ToggleButton key={4} value="zip">
      ZIP
    </ToggleButton>
  ];

  const handleChange = (e, value) => {
    setDefaultValue(value);
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
