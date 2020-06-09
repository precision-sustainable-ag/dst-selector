import React, { useState, Fragment } from "react";
import {
  ListItem,
  ListItemText,
  Collapse,
  Checkbox,
  Typography,
  FormControlLabel,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";

const EnvironmentalTolerances = () => {
  const [open, setOpen] = useState({
    0: false,
    1: false,
  });
  return (
    <Fragment>
      <ListItem>
        {/* <FormControlLabel
          //   classes={{ root: classes.formControlLabel }}
          control={<Checkbox value="Legume" />}
          label={<Typography variant="body2">Shade Tolerance</Typography>}
        /> */}
        <Typography variant="body2">Shade Tolerance</Typography>
        <Rating
          name={"shadetolerance"}
          size="large"
          onChange={(e, val) => {
            //   console.log(val);
            //   console.log(state.selectedStars);
            //   let data = data.Variable;
            //   check if star for this exists
            //   console.log(data.Variable, val);
            //   if (data.Variable in state.selectedStars) {
            // get its value and update the star
            // dispatch({
            //   type: "UPDATE_SELECTED_STARS",
            //   data: {
            //     selectedStars: {
            //       ...state.selectedStars,
            //       [data.Variable]: val,
            //     },
            //   },
            // });
            //   } else {
            // add the key and value
            //     dispatch({
            //       type: "UPDATE_SELECTED_STARS",
            //       data: {
            //         selectedStars: {
            //           ...state.selectedStars,
            //           [data.Variable]: val,
            //         },
            //       },
            //     });
            //   }
          }}
        />
      </ListItem>
      <ListItem>
        <Typography variant="body2">Flood Tolerance</Typography>
        <Rating
          name={"floodtolerance"}
          size="large"
          onChange={(e, val) => {}}
        />
      </ListItem>
      <ListItem>
        <Typography variant="body2">Heat Tolerance</Typography>
        <Rating name={"heattolerance"} size="large" onChange={(e, val) => {}} />
      </ListItem>
      <ListItem>
        <Typography variant="body2">Winter Survival</Typography>
        <Rating
          name={"wintersurvival"}
          size="large"
          onChange={(e, val) => {}}
        />
      </ListItem>
      <ListItem>
        <Typography variant="body2">Salinity Tolerance</Typography>
        <Rating
          name={"salinitytolerance"}
          size="large"
          onChange={(e, val) => {}}
        />
      </ListItem>
      <ListItem>
        <Typography variant="body2">Low Fertility Tolerance</Typography>
        <Rating
          name={"lowfertilitytolerance"}
          size="large"
          onChange={(e, val) => {}}
        />
      </ListItem>
      <ListItem>
        <Typography variant="body2">Drought Tolerance</Typography>
        <Rating
          name={"droughttolerance"}
          size="large"
          onChange={(e, val) => {}}
        />
      </ListItem>
    </Fragment>
  );
};

export default EnvironmentalTolerances;
