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

const Weeds = () => {
  const [open, setOpen] = useState({
    0: false,
    1: false,
  });
  return (
    <Fragment>
      <ListItem button onClick={() => setOpen({ ...open, 0: !open[0] })}>
        <ListItemText primary="Cover Crop Group" disableTypography />
        {open[0] ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open[0]}>
        <FormControlLabel
          //   classes={{ root: classes.formControlLabel }}
          control={<Checkbox value="Legume" />}
          label={<Typography variant="body2">Legume</Typography>}
        />
      </Collapse>
      <ListItem button onClick={() => setOpen({ ...open, 1: !open[1] })}>
        <ListItemText primary="Family Common Name" disableTypography />
        {open[1] ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open[1]}>Family Common Name</Collapse>
    </Fragment>
  );
};

export default Weeds;
