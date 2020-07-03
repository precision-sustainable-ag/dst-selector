import React, { useState, useEffect, Fragment, useContext } from "react";
import { Chip, List, ListItem, Grid, Typography } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { Context } from "../../../store/Store";
const _ = require("lodash");

const Filters = (props) => {
  const filters = props.filters;
  const [state, dispatch] = useContext(Context);
  const [activeFilters, setActiveFilters] = useState({});
  const [selectedVars, setSelectedVars] = useState({
    "chips-only": [],
    mixed: [{}],
    "rating-only": [{}],
  });

  useEffect(() => {
    // console.log(filters);
    // setActiveFilters({...activeFilters, activeFiltersObj});
    // return() => {
    //     setActiveFilters
    // console.log(filters);
    // const defaultProp = [];
    // if (filters.type === "rating-only") {
    //   filters.values.map((vals) => {
    //     defaultProp.push({ name: vals.name, value: 0 });
    //   });
    //   //    setSelectedVars({...selectedVars, "rating-only": })
    //   setSelectedVars({ ...selectedVars, "rating-only": defaultProp });
    // }
    // }
  }, []);

  const handleChipOnlyClick = (name, val) => {
    // console.log(name, val);
    // remove from selectedChips if exists else ass
    // console.log(val);
    if (selectedVars["chips-only"].includes(val)) {
      const removed = selectedVars["chips-only"].filter(
        (chipVals) => chipVals !== val
      );
      setSelectedVars({ ...selectedVars, "chips-only": removed });
    } else {
      const added = selectedVars["chips-only"];
      added.push(val);

      setSelectedVars({ ...selectedVars, "chips-only": added });
    }
  };
  const RenderRelevantFilterComponent_OLD = (props) => {
    switch (props.filters.type) {
      case "chips-only": {
        const chips = props.filters.values.map((val, index) => (
          <Grid item key={index}>
            <Chip
              onClick={() => handleChipOnlyClick(props.filters.name, val)}
              component="li"
              size="medium"
              label={val}
              color={
                selectedVars["chips-only"].includes(val) ? "primary" : "default"
              }
            />
          </Grid>
        ));

        return (
          <Grid container spacing={1}>
            {chips}
          </Grid>
        );
      }
      case "rating-only": {
        // console.log("rating-only-name", props.filters.values);
        return (
          <Grid container spacing={1}>
            {props.filters.values.map((filter, index) => (
              <Fragment key={index}>
                <Grid item xs={12}>
                  <p>{filter.name}</p>
                </Grid>
                <Grid item xs={12}>
                  <ToggleButtonGroup
                    value={selectedVars["rating-only"]}
                    exclusive
                    onChange={() => {}}
                    aria-label={`rating-${filter.name}`}
                  >
                    <ToggleButton value="1" aria-label="rating-1">
                      *
                    </ToggleButton>
                    <ToggleButton value="2" aria-label="rating-2">
                      **
                    </ToggleButton>
                    <ToggleButton value="3" aria-label="rating-3">
                      ***
                    </ToggleButton>
                    <ToggleButton value="4" aria-label="rating-4">
                      ****
                    </ToggleButton>
                    <ToggleButton value="5" aria-label="rating-5">
                      *****
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </Fragment>
            ))}
          </Grid>
        );
      }

      default:
        return <div>unhandled</div>;
    }
  };

  return (
    <Fragment>
      {/* <RenderRelevantFilterComponent {...props} /> */}

      {/* {props.filters.type === "chips-only" ? "hello" : "no"} */}
    </Fragment>
  );
};

export default Filters;
