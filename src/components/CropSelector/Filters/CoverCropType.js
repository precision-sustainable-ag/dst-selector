/*
  This file contains the CoverCropType component component
  The CoverCropType component filters crops based type
*/

import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Chip, Grid } from "@material-ui/core";

// import { Filters } from "./Filters";  // TODO

const CoverCropType = forwardRef((props, ref) => {
  // return <Filters props={props} ref={ref} />  // TODO

  const prop = "Cover Crop Group";
  const [selected, setSelected] = useState({ [prop]: [] });
  
  useEffect(() => {
    props.setSidebarFilterOptions({
      ...props.sidebarFilterOptions,
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
      const removed = selected[prop].filter(
        (chipVals) => chipVals !== val
      );
      setSelected({ ...selected, [prop]: removed });
    } else {
      const added = selected[prop];
      added.push(val);

      setSelected({ ...selected, [prop]: added });
    }
  };

  return (
    <Grid container spacing={1}>
      {props.filters.values.map((val, index) => (
        <Grid item key={index}>
          <Chip
            onClick={() => handleClick(props.filters.name, val.name)}
            component="li"
            size="medium"
            label={val.name}
            className={props.sidebarFilterOptions[prop].includes(val.name) ? 'activeCartBtn' : 'inactiveCartBtn'}
          />
        </Grid>
      ))}
    </Grid>
  );
});

export default CoverCropType;
