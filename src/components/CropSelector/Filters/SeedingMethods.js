import React, { useState, useEffect, Fragment } from "react";
import { Grid, FormControlLabel, Checkbox, Tooltip } from "@material-ui/core";

const SeedingMethods = (props) => {
  const [selected, setSelected] = useState({});

  const checkIfSelected = (name) => {
    // console.log(Reflect.ownKeys(selected).length);
    if (Reflect.ownKeys(selected).length === 0) {
      return false;
    } else {
      if (selected[name]) return true;
      else return false;
    }
  };
  const handleChange = (event) => {
    setSelected({ ...selected, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    let selections = selected;
    // Object.keys(selections).forEach((key) => {
    //   if (!selections[key]) delete selections[key];
    // });

    // if (Reflect.ownKeys(selections).length === 0) {
    //   // remove the keys from sidebarfilerobj
    //   // get a copy so as to not mutate the object!

    //   let siderbarFilersCopy = props.sidebarFilterOptions;
    //   let newSidebarObj = {};
    //   for (let [keyy, value] of Object.entries(selected)) {
    //     newSidebarObj = Object.keys(props.sidebarFilterOptions).reduce(
    //       (object, key) => {
    //         if (key !== keyy) {
    //           object[key] = props.sidebarFilterOptions[key];
    //         }
    //         return object;
    //       },
    //       {}
    //     );
    //   }

    //   console.log("copy", newSidebarObj);
    //   props.setSidebarFilterOptions({
    //     ...props.sidebarFilterOptions,
    //     ...siderbarFilersCopy,
    //   });
    // } else {
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
              label={val.name}
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
