import React, { useState, useEffect, Fragment, useContext } from "react";
import { Grid, Tooltip } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { Star } from "@material-ui/icons";
import { Context } from "../../../store/Store";
import "../../../styles/filters.scss";

const EnvironmentalTolerance = (props) => {
  //   console.log(props);
  const [state, dispatch] = useContext(Context);
  const [selected, setSelected] = useState({
    "Drought Tolerance": [], //int
    "Flood Tolerance": [], // int
    "Heat Tolerance": [], // int
    "Low Fertility Tolerance": [], // int
    "Salinity Tolerance": [], // int
    "Shade Tolerance": [], // int
  });

  useEffect(() => {
    props.setSidebarFilterOptions({
      ...props.sidebarFilterOptions,
      ...selected,
    });
  }, [selected]);

  const handleChange = (newValue, name) => {
    setSelected({ ...selected, [name]: newValue });
  };

  return (
    <Grid container spacing={1}>
      {props.filters.values.map((val, index) => {
        return (
          <Fragment key={index}>
            <Grid item xs={12}>
              <Tooltip
                enterDelay={3000}
                interactive
                arrow
                placement="right"
                title={
                  <div className="tooltipTextContainer text-center">
                    <p
                      dangerouslySetInnerHTML={{ __html: val.description }}
                    ></p>
                  </div>
                }
                key={`tooltip${index}`}
              >
                <small>{val.name}</small>
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <ToggleButtonGroup
                value={selected[val.alternateName]}
                onChange={(evt, newVal) =>
                  handleChange(newVal, val.alternateName)
                }
                className="starRatingParent"
              >
                <ToggleButton
                  value={1}
                  size="small"
                  className={
                    props.sidebarFilterOptions[val.alternateName].includes(1)
                      ? "selected first-btn"
                      : "not-selected first-btn"
                  }
                >
                  &#x2605;
                </ToggleButton>
                <ToggleButton
                  value={2}
                  size="small"
                  className={
                    props.sidebarFilterOptions[val.alternateName].includes(2)
                      ? "selected"
                      : "not-selected"
                  }
                >
                  &#x2605;
                </ToggleButton>
                <ToggleButton
                  value={3}
                  size="small"
                  className={
                    props.sidebarFilterOptions[val.alternateName].includes(3)
                      ? "selected"
                      : "not-selected"
                  }
                >
                  &#x2605;
                </ToggleButton>
                <ToggleButton
                  value={4}
                  size="small"
                  className={
                    props.sidebarFilterOptions[val.alternateName].includes(4)
                      ? "selected"
                      : "not-selected"
                  }
                >
                  &#x2605;
                </ToggleButton>
                <ToggleButton
                  value={5}
                  size="small"
                  color="primary"
                  className={
                    props.sidebarFilterOptions[val.alternateName].includes(5)
                      ? "selected last-btn"
                      : "not-selected last-btn"
                  }
                >
                  &#x2605;
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Fragment>
        );
      })}
    </Grid>
  );
};

const sidebarNameSubtractor = (name) => {
  // props.sidebarFilterOptions[[val.name]] + "Tolerance"
  return name;
};
const getKeyByValue = (object, value) => {
  return Object.keys(object).filter((key) => object[key] === value);
};

export default EnvironmentalTolerance;
