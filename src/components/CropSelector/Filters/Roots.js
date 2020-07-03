import React, { useState, useEffect, Fragment } from "react";
import { Grid, Chip } from "@material-ui/core";

const Roots = (props) => {
  const [selected, setSelected] = useState({ roots: [] });

  const handleClick = (filtername, val) => {
    console.log(filtername, val);
    const combinedString = filtername + "-" + val;
    if (selected.roots.includes(combinedString)) {
      let filtered = selected.roots.filter((vals) => vals !== combinedString);
      setSelected({ roots: filtered });
    } else {
      let roots = selected.roots;
      roots.push(combinedString);
      setSelected({ roots: roots });
    }
  };
  useEffect(() => {
    props.setSidebarFilterOptions({
      ...props.sidebarFilterOptions,
      Roots: selected.roots,
    });
  }, [selected]);
  return props.filters.values.map((subFilter, index) => (
    <Grid container key={index} spacing={1}>
      <Grid item xs={12}>
        <small>{subFilter.name}</small>
      </Grid>
      {subFilter.values.map((val, index2) => (
        <Grid item key={index2}>
          <Chip
            onClick={() => handleClick(subFilter.name, val)}
            component="li"
            size="medium"
            label={val}
            color={
              props.sidebarFilterOptions["Cover Crop Group"].includes(val)
                ? "primary"
                : "default"
            }
          />
        </Grid>
      ))}
    </Grid>
  ));
};

export default Roots;
