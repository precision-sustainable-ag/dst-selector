/*
  This file contains the CoverCropType component component
  The CoverCropType component filters crops based type
*/

import {Chip, Grid} from "@material-ui/core";
import React, {useContext} from "react";
import {Context} from "../../../store/Store";

const CoverCropType = ((props) => {
  const {state, change} = useContext(Context);
  let {filters} = props;

  return (
    <Grid container spacing={1}>
      {filters.values.map(val => (
        <Grid item key={val.name}>
          <Chip
            onClick={(e) => change('COVERCROPTYPE_TOGGLE', e, val.name)}
            component="li"
            size="medium"
            label={val.name}
            color={
              state.coverCropType[val.name]
                ? 'primary'
                : 'secondary'
            }            
          />
        </Grid>
      ))}
    </Grid>
  );
});

export default CoverCropType;
