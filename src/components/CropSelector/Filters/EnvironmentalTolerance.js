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
    "Environmental Tolerance": {
      Drought: 0,
      Flood: 0,
      Heat: 0,
      "Low Fertility": 0,
      Salinity: 0,
      Shade: 0,
    },
  });

  //   useEffect(() => {

  //     if(props.activeCropData.length === 0 && props.inactiveCropData.length === 0) {

  //     }

  //   },[props.activeCropData])

  useEffect(() => {
    // console.log(selected);
    // let inactiveCropData = props.inactiveCropData;
    // let cropData;
    // if (props.activeCropData.length > 0) {
    //   cropData = props.activeCropData;
    // } else {
    //   cropData = props.cropData;
    // }
    // cropData = cropData.filter((crop) => {
    //   return crop.fields["Zone Decision"] === "Include";
    // });
    // for (let [key, value] of Object.entries(selected)) {
    //   key += " Tolerance";
    //   if (value !== 0) {
    //     cropData = cropData.filter((x) => {
    //       if (
    //         x.fields["Zone Decision"] === "Include" &&
    //         x.fields[key] !== undefined &&
    //         x.fields[key] === value
    //       )
    //         return x;
    //     });
    //   }
    // }
    // inactiveCropData = props.cropData.filter((e) => !cropData.includes(e));
    // props.setActiveCropData(cropData);
    // props.setInactiveCropData(inactiveCropData);
    // console.log("total:", state.cropData.length);
    // console.log("active: ", cropData.length);
    // console.log("inactive", inactiveCropData.length);
    // console.log("inactives", inactiveCropData);
  }, [selected]);

  //   useEffect(() => {
  //     setSelected({
  //       Drought: 0,
  //       Flood: 0,
  //       Heat: 0,
  //       "Low Fertility": 0,
  //       Salinity: 0,
  //       Shade: 0,
  //     });
  //   }, [props.resetAllFilters]);

  useEffect(() => {
    const keyMap = {
      Drought: "Drought Tolerance",
      Flood: "Flood Tolerance",
      Heat: "Heat Tolerance",
      "Low Fertility": "Low Fertility Tolerance",
      Salinity: "Salinity Tolerance",
      Shade: "Shade Tolderance",
    };

    const mappedData = Object.keys(keyMap).reduce(
      (obj, k) =>
        Object.assign(obj, {
          [keyMap[k]]: selected["Environmental Tolerance"][k],
        }),
      {}
    );
    console.log(mappedData);
    props.setSidebarFilterOptions({
      ...props.sidebarFilterOptions,
      ...mappedData,
    });
  }, [selected]);

  const handleChange = (newValue, name) => {
    // console.log(newValue);
    // possible bug here as vals not resetting
    if (newValue === null) {
      setSelected({
        ...selected,
        "Environmental Tolerance": {
          ...selected["Environmental Tolerance"],
          [name]: 0,
        },
      });
    } else {
      console.log("newval", newValue);
      const key = newValue.split("-")[0];
      const val = parseInt(newValue.split("-")[1]);

      if (selected[key] === val) {
        setSelected({
          ...selected,
          "Environmental Tolerance": {
            ...selected["Environmental Tolerance"],
            [key]: 0,
          },
        });
      } else
        setSelected({
          ...selected,
          "Environmental Tolerance": {
            ...selected["Environmental Tolerance"],
            [key]: val,
          },
        });
    }
    // console.log("selected", selected);
  };

  return (
    <Grid container spacing={1}>
      {props.filters.values.map((val, index) => {
        let groupBtnVal = `${val.name}-${
          props.sidebarFilterOptions[val.name + " Tolerance"]
        }`;
        return (
          <Fragment key={index}>
            <Grid item xs={12}>
              <Tooltip
                enterDelay={3000}
                interactive
                arrow
                placement="right"
                title={
                  <div className="tooltipTextContainer text-left">
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
                value={groupBtnVal}
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
