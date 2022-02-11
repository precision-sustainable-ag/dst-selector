/*
  This file contains the SoilConditions component
  The SoilConditions filters crops based on soil conditions
*/

import { Checkbox, FormControlLabel, Grid, Tooltip } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../store/Store";

const SoilConditions = (props) => {
  const [state] = useContext(Context);
  const { Flooding_Frequency, Drainage_Class } = state.soilData;
  const {
    activeCropData,
    setActiveCropData,
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
  }, [Drainage_Class, Flooding_Frequency, selected, state.soilData]);

  useEffect(() => {
    if (selected["Soil Drainage"]) {
      const newActives = activeCropData.filter((crop) => {
        return areCommonElements(crop.fields["Soil Drainage"], Drainage_Class);
      });

      setActiveCropData(newActives);
    } else {
      filterSidebarItems();
    }

    if (selected["Flooding Tolerance"]) {
      const newActives = activeCropData.filter((crop) => {
        return crop.fields["Flooding Tolerance"] === Flooding_Frequency;
      });

      setActiveCropData(newActives);
    } else {
      filterSidebarItems();
    }
  }, [
    Drainage_Class,
    Flooding_Frequency,
    activeCropData,
    cropData,
    filterSidebarItems,
    selected,
    setActiveCropData,
  ]);

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

const areCommonElements = (arr1, arr2) => {
  const arr2Set = new Set(arr2);
  return arr1.some((el) => arr2Set.has(el));
};

export default SoilConditions;
