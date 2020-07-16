import React, { useState, useEffect, Fragment } from "react";
import { Grid, FormControlLabel, Checkbox, Tooltip } from "@material-ui/core";

const SeedingMethods = (props) => {
  const [selected, setSelected] = useState({
    "Frost Seeding": [],
    "Aerial Seeding": [],
  });

  const checkIfSelected = (name) => {
    if (selected[name].length === 0) {
      return false;
    } else {
      if (selected[name].includes("true")) return true;
      else return false;
    }
  };
  const handleChange = (event) => {
    if (event.target.checked) {
      setSelected({ ...selected, [event.target.name]: ["true"] });
    } else {
      setSelected({ ...selected, [event.target.name]: [-999] });
    }
  };

  useEffect(() => {
    let selections = selected;

    props.setSidebarFilterOptions({
      ...props.sidebarFilterOptions,
      ...selections,
    });
    // }
  }, [selected]);

  return (
    <Grid container spacing={1}>
      {props.filters.values.map((val, index) => (
        <Grid item xs={12} key={index}>
          <Tooltip
            enterDelay={3000}
            interactive
            arrow
            placement="right"
            title={
              <div className="tooltipTextContainer text-left">
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
};

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
