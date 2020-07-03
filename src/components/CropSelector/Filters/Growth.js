import React, { useState, useEffect } from "react";
import { Chip, Grid } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
const Growth = (props) => {
  const handleClick = (filterName, val) => {};
  const handleChange = (filterName, val) => {};

  const RenderRelevantFilter = (props) => {
    let val = props.val;
    let subFilter = props.subFilter;
    let index2 = props.index;

    // return subFilter.type;

    if (subFilter.type === "chip") {
      return (
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
      );
    } else {
      return (
        <Grid item key={index2}>
          <ToggleButtonGroup
            value={"1"}
            exclusive
            onChange={(evt, newVal) => handleChange(newVal, val.name)}
            className="starRatingParent"
          >
            <ToggleButton
              value={`${val.name}-1`}
              size="small"
              className={
                props.sidebarFilterOptions[val.name + " Tolerance"] === 1
                  ? "selected"
                  : "not-selected"
              }
              style={{
                borderTopLeftRadius: "20px",
                borderBottomLeftRadius: "20px",
              }}
            >
              {/* <span style={star}>&#x2606;</span> */}*
            </ToggleButton>
            <ToggleButton
              value={`${val.name}-2`}
              size="small"
              className={
                props.sidebarFilterOptions[val.name + " Tolerance"] === 2
                  ? "selected"
                  : "not-selected"
              }
            >
              {/* <span style={star}>&#x2606;&#x2606;</span> */}
              **
            </ToggleButton>
            <ToggleButton
              value={`${val.name}-3`}
              size="small"
              className={
                props.sidebarFilterOptions[val.name + " Tolerance"] === 3
                  ? "selected"
                  : "not-selected"
              }
            >
              {/* <span style={star}>&#x2606;&#x2606;&#x2606;</span> */}
              ***
            </ToggleButton>
            <ToggleButton
              value={`${val.name}-4`}
              size="small"
              className={
                props.sidebarFilterOptions[val.name + " Tolerance"] === 4
                  ? "selected"
                  : "not-selected"
              }
            >
              {/* <span style={star}>&#x2606;&#x2606;&#x2606;&#x2606;</span> */}
              ****
            </ToggleButton>
            <ToggleButton
              value={`${val.name}-5`}
              size="small"
              color="primary"
              style={{
                borderTopRightRadius: "20px",
                borderBottomRightRadius: "20px",
              }}
              className={
                props.sidebarFilterOptions[val.name + " Tolerance"] === 5
                  ? "selected"
                  : "not-selected"
              }
            >
              {/* <span style={star}>
        &#x2606;&#x2606;&#x2606;&#x2606;&#x2606;
      </span> */}
              *****
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      );
    }
  };
  //// <RenderRelevantFilter subFilter={subFilter} val={val} index={index2} />
  return props.filters.values.map((subFilter, index) => (
    <Grid container key={index} spacing={1}>
      <Grid item xs={12}>
        <small>{subFilter.name}</small>
      </Grid>
      {subFilter.values.map((val, index2) => (
        <div>TODO</div>
      ))}
    </Grid>
  ));
};

export default Growth;
