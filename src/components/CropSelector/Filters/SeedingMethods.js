/*
  This file contains the SeedingMethods component
  The SeedingMethods filters crops based on seeding methods
*/

import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Grid, FormControlLabel, Checkbox, Tooltip } from "@material-ui/core";

const SeedingMethods = forwardRef((props, ref) => {
  const [selected, setSelected] = useState({
    "Frost Seeding": props.sidebarFilterOptions["Frost Seeding"],
    "Aerial Seeding": props.sidebarFilterOptions["Aerial Seeding"],
  });

  const checkIfSelected = (name) => {
    if (props.sidebarFilterOptions[name].length === 0) {
      return false;
    } else {
      if (props.sidebarFilterOptions[name].includes("true")) return true;
      else return false;
    }
  };
  const handleChange = (event) => {
    if (event.target.checked) {
      setSelected({ ...selected, [event.target.name]: ["true"] });
    } else {
      setSelected({ ...selected, [event.target.name]: [] });
    }
  };

  useImperativeHandle(ref, () => ({
    resetFilters() {
      setSelected({ "Frost Seeding": [], "Aerial Seeding": [] });
    },
  }));

  useEffect(() => {
    let selections = selected;

    props.setSidebarFilterOptions({
      ...props.sidebarFilterOptions,
      ...selections,
    });
  }, [selected]);

  return (
    <Grid container spacing={1}>
      {props.filters.values.map((val, index) => (
        <Grid item xs={12} key={index}>
          <Tooltip
            interactive
            arrow
            placement="right"
            title={
              <div className="filterTooltip">
                <p dangerouslySetInnerHTML={{ __html: val.description }}></p>
              </div>
            }
            key={`tooltip${index}`}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkIfSelected(val.name)}
                  onChange={handleChange}
                  name={val.name}
                  color="primary"
                />
              }
              label={<small>{val.name}</small>}
            />
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );
});

const objFilter = (obj, predicate) => {
  let result = {},
    key;

  for (key in obj) {
    if (obj.hasOwnProperty(key) && !predicate(obj[key])) {
      result[key] = obj[key];
    }
  }

  return result;
};
export default SeedingMethods;
