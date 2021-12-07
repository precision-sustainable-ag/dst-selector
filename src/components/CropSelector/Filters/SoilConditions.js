/*
  This file contains the SoilConditions component
  The SoilConditions filters crops based on soil conditions
*/

import { Checkbox, FormControlLabel, Grid, Tooltip } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../store/Store";

const SoilConditions = (props) => {
  const [state, dispatch] = useContext(Context);
  const { Flooding_Frequency, Drainage_Class } = state.soilData;
  // const [activeCropDataCopy, setActiveCropDataCopy] = useState(
  //   props.activeCropData
  // );
  const {
    activeCropData,
    // inactiveCropData,
    setActiveCropData,
    setInactiveCropData,
    cropData,
    filterSidebarItems,
  } = props;

  const [selected, setSelected] = useState({
    "Soil Drainage":
      Drainage_Class !== "" && Drainage_Class.length > 0 ? true : false,
    "Flooding Tolerance":
      Flooding_Frequency !== "None" && Flooding_Frequency ? true : false,
  });

  const handleChange = (event) => {
    if (event.target.checked) {
      setSelected({ ...selected, [event.target.name]: true });
    } else {
      setSelected({ ...selected, [event.target.name]: false });
    }
  };

  useEffect(() => {
    if (
      Flooding_Frequency === null ||
      Flooding_Frequency === "None" ||
      Flooding_Frequency === ""
    ) {
      setSelected({ ...selected, "Flooding Tolerance": false });
    } else {
      setSelected({ ...selected, "Flooding Tolerance": true });
    }

    if (Drainage_Class !== "") {
      if (Array.isArray(Drainage_Class)) {
        setSelected({ ...selected, "Soil Drainage": true });
      } else {
        setSelected({ ...selected, "Soil Drainage": false });
      }
    } else {
      setSelected({ ...selected, "Soil Drainage": false });
    }
  }, [state.soilData]);

  useEffect(() => {
    if (selected["Soil Drainage"]) {
      const newActives = activeCropData.filter((crop) => {
        if (areCommonElements(crop.fields["Soil Drainage"], Drainage_Class)) {
          return true;
        } else {
          return false;
        }
      });

      const newInactives = cropData.filter((e) => !newActives.includes(e));

      setActiveCropData(newActives);
      setInactiveCropData(newInactives);
    } else {
      filterSidebarItems();
    }

    if (selected["Flooding Tolerance"]) {
      const newActives = activeCropData.filter((crop) => {
        if (crop.fields["Flooding Tolerance"] === Flooding_Frequency) {
          return true;
        } else {
          return false;
        }
      });

      const newInactives = cropData.filter((e) => !newActives.includes(e));

      setActiveCropData(newActives);
      setInactiveCropData(newInactives);
    } else {
      filterSidebarItems();
    }
  }, [selected]);

  //   useImperativeHandle(ref, () => ({
  //     resetFilters() {
  //       setSelected({ "Soil Drainage": [], "Flooding Tolerance": [] });
  //     },
  //   }));

  //   useEffect(() => {
  //     let selections = selected;

  //     props.setSidebarFilterOptions({
  //       ...props.sidebarFilterOptions,
  //       ...selections,
  //     });
  //   }, [selected]);

  return (
    <Grid container spacing={1}>
      {props.filters.values.map((val, index) => (
        <Grid item xs={12} key={index}>
          <Tooltip
            interactive
            arrow
            placement="right"
            title={
              <div className="filterTooltip">
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      val.name === "Soil Drainage"
                        ? Drainage_Class.toString()
                        : Flooding_Frequency.toString(),
                  }}
                ></p>
              </div>
            }
            key={`tooltip${index}`}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={selected[val.name]}
                  onChange={handleChange}
                  name={val.name}
                  color="primary"
                />
              }
              label={<small>{val.name}</small>}
            />
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );
};

// const objFilter = (obj, predicate) => {
//   let result = {},
//     key;

//   for (key in obj) {
//     if (obj.hasOwnProperty(key) && !predicate(obj[key])) {
//       result[key] = obj[key];
//     }
//   }

//   return result;
// };

const areCommonElements = (arr1, arr2) => {
  const arr2Set = new Set(arr2);
  return arr1.some((el) => arr2Set.has(el));
};
export default SoilConditions;
