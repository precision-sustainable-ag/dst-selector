import React, { useState, useEffect, Fragment, useContext } from "react";
import { Grid, Tooltip } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import { Context } from "../../../store/Store";
import "../../../styles/filters.scss";

const Beneficials = (props) => {
  const [state, dispatch] = useContext(Context);
  const [selected, setSelected] = useState({
    Beneficials: {
      "Supports Mycorrhizae": 0,
      "Pollinator Habitat": 0,
      "Pollinator Food": 0,
    },
  });
  useEffect(() => {
    //   BUG: IT will be helpful to rename these from the backend itself!
    const keyMap = {
      "Supports Mycorrhizae": "Supports Mycorrhizae",
      "Pollinator Habitat": "Pollinator Habitat",
      "Pollinator Food": "Pollinator Food",
    };

    const mappedData = Object.keys(keyMap).reduce(
      (obj, k) =>
        Object.assign(obj, {
          [keyMap[k]]: selected["Beneficials"][k],
        }),
      {}
    );
    // console.log(mappedData);
    props.setSidebarFilterOptions({
      ...props.sidebarFilterOptions,
      ...mappedData,
    });
  }, [selected]);
  const handleChange = (newValue, name) => {
    // console.log(newValue);
    // possible bug here as vals not resetting
    if (newValue === null || newValue === selected["Beneficials"][name]) {
      setSelected({
        ...selected,
        Beneficials: {
          ...selected["Beneficials"],
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
          Beneficials: {
            ...selected["Beneficials"],
            [key]: 0,
          },
        });
      } else
        setSelected({
          ...selected,
          Beneficials: {
            ...selected["Beneficials"],
            [key]: val,
          },
        });
    }
    // console.log("selected", selected);
  };
  return (
    <Grid container spacing={1}>
      {props.filters.values.map((val, index) => {
        let groupBtnVal = `${val.name}-${props.sidebarFilterOptions[val.name]}`;
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
                    props.sidebarFilterOptions[val.name] === 1
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
                    props.sidebarFilterOptions[val.name] === 2
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
                    props.sidebarFilterOptions[val.name] === 3
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
                    props.sidebarFilterOptions[val.name] === 4
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
                    props.sidebarFilterOptions[val.name] === 5
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

export default Beneficials;
