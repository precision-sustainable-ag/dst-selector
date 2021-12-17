/*
  This file contains the CoverCropType component component
  The CoverCropType component filters crops based type
*/

import { Chip, Grid } from "@material-ui/core";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

const CoverCropType = forwardRef((props, ref) => {
  let { setSidebarFilterOptions, sidebarFilterOptions, filters } = props;
  const prop = "Cover Crop Group";
  const [selected, setSelected] = useState({ [prop]: [] });

  // console.log(filters);

  useEffect(() => {
    console.log({
      ...sidebarFilterOptions,
      ...selected,
    });

    setSidebarFilterOptions({
      ...sidebarFilterOptions,
      ...selected,
    });
  }, [selected]);

  useImperativeHandle(ref, () => ({
    resetFilters() {
      setSelected({ [prop]: [] });
    },
  }));

  const handleClick = (_, val) => {
    if (selected[prop].includes(val)) {
      const removed = selected[prop].filter((chipVals) => chipVals !== val);
      setSelected({ ...selected, [prop]: removed });
    } else {
      const added = selected[prop];
      added.push(val);

      setSelected({ ...selected, [prop]: added });
    }
  };

  // console.log(sidebarFilterOptions, prop);

  return (
    <Grid container spacing={1}>
      {filters.values.map((val, index) => (
        <Grid item key={index}>
          <Chip
            onClick={() => handleClick(filters.name, val.name)}
            component="li"
            size="medium"
            label={val.name}
            color={
              sidebarFilterOptions[prop].includes(val.name)
                ? "primary"
                : "secondary"
            }
          />
        </Grid>
      ))}
    </Grid>
  );
});

export default CoverCropType;
