import React, { useState, useEffect, Fragment, useContext } from "react";
import { Chip, List, ListItem, Grid, Typography } from "@material-ui/core";
import { Context } from "../../../store/Store";

const CoverCropType = (props) => {
  const [state, dispatch] = useContext(Context);
  const [selected, setSelected] = useState({ "Cover Crop Group": [] });

  useEffect(() => {
    props.setSidebarFilterOptions({
      ...props.sidebarFilterOptions,
      "Cover Crop Group": selected["Cover Crop Group"],
    });
  }, [selected]);

  const handleClick = (name, val) => {
    // if (selected.includes(val)) {
    //   const removed = selected.filter((chipVals) => chipVals !== val);
    //   setSelected(removed);
    // } else {
    //   const added = selected;
    //   added.push(val);

    //   setSelected(selected.push());
    // }
    if (selected["Cover Crop Group"].includes(val)) {
      const removed = selected["Cover Crop Group"].filter(
        (chipVals) => chipVals !== val
      );
      setSelected({ ...selected, "Cover Crop Group": removed });
    } else {
      const added = selected["Cover Crop Group"];
      added.push(val);

      setSelected({ ...selected, "Cover Crop Group": added });
    }

    // console.log(filters.join(""));
  };

  useEffect(() => {
    // // console.log(props.activeCropData.length);
    // if (props.activeCropData.length > 0) {
    //   let cropData;
    //   if (props.activeCropData.length > 0) {
    //     cropData = props.activeCropData;
    //   } else {
    //     cropData = props.cropData;
    //   }
    //   cropData = cropData.filter((crop) => {
    //     return crop.fields["Zone Decision"] === "Include";
    //   });
    //   let inactiveCropData = props.inactiveCropData;
    //   if (selected["Cover Crop Group"].length === 1) {
    //     cropData = cropData.filter((crop) => {
    //       return (
    //         crop.fields["Cover Crop Group"] === selected["Cover Crop Group"][0]
    //       );
    //     });
    //   }
    //   if (selected["Cover Crop Group"].length === 2) {
    //     cropData = cropData.filter((crop) => {
    //       return (
    //         crop.fields["Cover Crop Group"] ===
    //           selected["Cover Crop Group"][0] ||
    //         crop.fields["Cover Crop Group"] === selected["Cover Crop Group"][1]
    //       );
    //     });
    //   }
    //   if (selected["Cover Crop Group"].length === 3) {
    //     cropData = cropData.filter((crop) => {
    //       return (
    //         crop.fields["Cover Crop Group"] ===
    //           selected["Cover Crop Group"][0] ||
    //         crop.fields["Cover Crop Group"] ===
    //           selected["Cover Crop Group"][1] ||
    //         crop.fields["Cover Crop Group"] === selected["Cover Crop Group"][2]
    //       );
    //     });
    //   }
    //   if (selected["Cover Crop Group"].length === 4) {
    //     cropData = cropData.filter((crop) => {
    //       return (
    //         crop.fields["Cover Crop Group"] ===
    //           selected["Cover Crop Group"][0] ||
    //         crop.fields["Cover Crop Group"] ===
    //           selected["Cover Crop Group"][1] ||
    //         crop.fields["Cover Crop Group"] ===
    //           selected["Cover Crop Group"][2] ||
    //         crop.fields["Cover Crop Group"] === selected["Cover Crop Group"][3]
    //       );
    //     });
    //   }
    //   inactiveCropData = props.cropData.filter((e) => !cropData.includes(e));
    //   console.log("total:", state.cropData.length);
    //   console.log("active: ", cropData.length);
    //   console.log("inactive", inactiveCropData.length);
    //   //   console.log("inactives", inactiveCropData);
    //   props.setActiveCropData(cropData);
    //   props.setInactiveCropData(inactiveCropData);
    // console.log(selected);
    // }
  }, [selected]);

  //   useEffect(() => {
  //     setSelected({ "Cover Crop Group": [] });
  //   }, [props.resetAllFilters]);
  return (
    <Grid container spacing={1}>
      {props.filters.values.map((val, index) => (
        <Grid item key={index}>
          <Chip
            onClick={() => handleClick(props.filters.name, val.name)}
            component="li"
            size="medium"
            label={val.name}
            color={
              props.sidebarFilterOptions["Cover Crop Group"].includes(val.name)
                ? "primary"
                : "default"
            }
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CoverCropType;
