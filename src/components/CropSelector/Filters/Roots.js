import React, { useState, useEffect, useContext } from "react";
import { Grid, Chip, Tooltip } from "@material-ui/core";
import { Context } from "../../../store/Store";

const Roots = (props) => {
  const [selected, setSelected] = useState({
    "Root Architecture": [],
    "Root Depth": [],
  });

  const handleClick = (filtername, val) => {
    // console.log(filtername, val);
    // const combinedString = filtername + "-" + val;
    if (selected[filtername].includes(val)) {
      let filtered = selected[filtername].filter((vals) => vals !== val);
      setSelected({ ...selected, [filtername]: filtered });
    } else {
      let roots = selected[filtername];
      roots.push(val);
      setSelected({ ...selected, [filtername]: roots });
    }
  };
  useEffect(() => {
    props.setSidebarFilterOptions({
      ...props.sidebarFilterOptions,
      ...selected,
    });
  }, [selected]);

  const { filterKeys } = useContext(Context);
  useEffect(() => {
    if (filterKeys) {
      if (filterKeys.length === 0) {
        setSelected({
          "Root Architecture": [],
          "Root Depth": [],
        });
      }
    }
  }, [filterKeys]);

  return props.filters.values.map((subFilter, index) => (
    <Grid container key={index} spacing={1}>
      <Grid item xs={12}>
        <Tooltip
          interactive
          arrow
          placement="right"
          title={
            <div className="tooltipTextContainer text-center">
              <p
                dangerouslySetInnerHTML={{ __html: subFilter.description }}
              ></p>
            </div>
          }
          key={`tooltip${index}`}
        >
          <small>{subFilter.name}</small>
        </Tooltip>
      </Grid>
      {subFilter.values.map((val, index2) => (
        <Grid item key={index2}>
          <Chip
            onClick={() => handleClick(subFilter.name, val)}
            component="li"
            size="medium"
            label={val}
            color={
              props.sidebarFilterOptions[subFilter.name].includes(val)
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
