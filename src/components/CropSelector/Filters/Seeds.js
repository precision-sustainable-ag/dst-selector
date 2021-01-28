/*
  This file contains the Seeds component
  The Seeds filters crops based on seeds
*/

import React, {
  useState,
  useEffect,
  Fragment,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Grid, Tooltip } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const Seeds = forwardRef((props, ref) => {
  const [selected, setSelected] = useState({ "Seed Price per Pound": [] });

  const handleChange = (newValue, name) => {
    setSelected({ ...selected, [name]: newValue });
  };

  useEffect(() => {
    props.setSidebarFilterOptions({
      ...props.sidebarFilterOptions,
      ...selected,
    });
  }, [selected]);

  useImperativeHandle(ref, () => ({
    resetFilters() {
      setSelected({ "Seed Price per Pound": [] });
    },
  }));
  return (
    <Grid container spacing={1}>
      {props.filters.values.map((val, index) => (
        <Fragment key={index}>
          <Grid item xs={12}>
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
              <small>{val.name}</small>
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <ToggleButtonGroup
              value={selected[val.name]}
              onChange={(evt, newVal) => handleChange(newVal, val.name)}
              className="starRatingParent"
            >
              <ToggleButton
                value={1}
                size="small"
                className={
                  props.sidebarFilterOptions[val.name].includes(1)
                    ? "selected first-btn"
                    : "not-selected first-btn"
                }
              >
                &#36;
              </ToggleButton>
              <ToggleButton
                value={2}
                size="small"
                className={
                  props.sidebarFilterOptions[val.name].includes(2)
                    ? "selected"
                    : "not-selected"
                }
              >
                &#36;&#36;
              </ToggleButton>
              <ToggleButton
                value={3}
                size="small"
                className={
                  props.sidebarFilterOptions[val.name].includes(3)
                    ? "selected last-btn"
                    : "not-selected last-btn"
                }
              >
                &#36;&#36;&#36;
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Fragment>
      ))}
    </Grid>
  );
});

export default Seeds;
