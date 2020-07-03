import React, { useState, useEffect, Fragment } from "react";
import { Grid, Tooltip } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const Seeds = (props) => {
  const [selected, setSelected] = useState({ "Seed Price per Pound": 0 });

  const handleChange = (event, newValue) => {
    if (newValue === null || newValue === selected["Seed Price per Pound"]) {
      setSelected({ "Seed Price per Pound": 0 });
    } else {
      setSelected({ "Seed Price per Pound": parseInt(newValue) });
    }
  };

  useEffect(() => {
    props.setSidebarFilterOptions({
      ...props.sidebarFilterOptions,
      ...selected,
    });
  }, [selected]);

  return (
    <Grid container spacing={1}>
      {props.filters.values.map((val, index) => (
        <Fragment key={index}>
          <Grid item xs={12}>
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
              <small>{val.name}</small>
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <ToggleButtonGroup
              value={selected["Seed Price per Pound"].toString()}
              exclusive
              onChange={handleChange}
              aria-label="text alignment"
              className="starRatingParent"
            >
              <ToggleButton
                value={`1`}
                size="small"
                className={
                  selected["Seed Price per Pound"] === 1
                    ? "selected"
                    : "not-selected"
                }
                style={{
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                }}
              >
                {/* <span style={star}>&#x2606;</span> */}$
              </ToggleButton>
              <ToggleButton
                value={`2`}
                size="small"
                className={
                  selected["Seed Price per Pound"] === 2
                    ? "selected"
                    : "not-selected"
                }
              >
                {/* <span style={star}>&#x2606;&#x2606;</span> */}
                $$
              </ToggleButton>
              <ToggleButton
                value={`3`}
                size="small"
                className={
                  selected["Seed Price per Pound"] === 3
                    ? "selected"
                    : "not-selected"
                }
                style={{
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                }}
              >
                {/* <span style={star}>&#x2606;&#x2606;&#x2606;</span> */}
                $$$
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Fragment>
      ))}
    </Grid>
  );
};

export default Seeds;
