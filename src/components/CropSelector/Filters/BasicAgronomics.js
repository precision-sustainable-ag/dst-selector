import React, { useState, Fragment } from "react";
import {
  ListItem,
  ListItemText,
  Collapse,
  Checkbox,
  Typography,
  FormControlLabel,
  List,
  Slider,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

const nitrogenAccumulationMinMarks = [
  {
    value: 50,
    label: "Low",
  },
  {
    value: 100,
    label: "Med",
  },
  {
    value: 200,
    label: "High",
  },
];

const BasicAgronomics = () => {
  const [open, setOpen] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
  });
  return (
    <Fragment>
      <ListItem button onClick={() => setOpen({ ...open, 0: !open[0] })}>
        <ListItemText primary="Shape & Orientation" disableTypography />
        {open[0] ? <ExpandLess /> : <ExpandMore />}
        {/* Erect, Semi-Erect, Climbing, Prostrate, Columnar, Decumbent */}
      </ListItem>
      <Collapse in={open[0]}>
        <List>
          <ListItem>
            <FormControlLabel
              //   classes={{ root: classes.formControlLabel }}
              control={<Checkbox value="Erect" />}
              label={<Typography variant="body2">Erect</Typography>}
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              //   classes={{ root: classes.formControlLabel }}
              control={<Checkbox value="Semi-Erect" />}
              label={<Typography variant="body2">Semi-Erect</Typography>}
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              //   classes={{ root: classes.formControlLabel }}
              control={<Checkbox value="Climbing" />}
              label={<Typography variant="body2">Climbing</Typography>}
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              //   classes={{ root: classes.formControlLabel }}
              control={<Checkbox value="Prostrate" />}
              label={<Typography variant="body2">Prostrate</Typography>}
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              //   classes={{ root: classes.formControlLabel }}
              control={<Checkbox value="Columnar" />}
              label={<Typography variant="body2">Columnar</Typography>}
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              //   classes={{ root: classes.formControlLabel }}
              control={<Checkbox value="Decumbent" />}
              label={<Typography variant="body2">Decumbent</Typography>}
            />
          </ListItem>
        </List>
      </Collapse>

      {/* <ListItem button onClick={() => setOpen({ ...open, 1: !open[1] })}> */}
      <ListItem>
        <FormControlLabel
          //   classes={{ root: classes.formControlLabel }}
          control={<Checkbox value="Hessian Fly-Free Date" />}
          label={<Typography variant="body2">Hessian Fly-Free Date</Typography>}
        />
        {/* <ListItemText primary="Hessian Fly-Free Date" disableTypography />
        {open[1] ? <ExpandLess /> : <ExpandMore />} */}
      </ListItem>
      {/* <Collapse in={open[1]}>Family Common Name</Collapse> */}

      <ListItem>
        {/* <ListItem button onClick={() => setOpen({ ...open, 2: !open[2] })}> */}
        <ListItemText primary="Dry Matter Min (lbs/A/y" disableTypography />
        {/* {open[2] ? <ExpandLess /> : <ExpandMore />} */}
        <Slider
          // value={0}
          color="secondary"
          min={0}
          max={10}
          onChange={(e, val) => {}}
          aria-labelledby="dry-matter-min-slider"
          valueLabelDisplay={"auto"}
        />
      </ListItem>
      {/* <Collapse in={open[2]}>Family Common Name</Collapse> */}

      <ListItem button onClick={() => setOpen({ ...open, 3: !open[3] })}>
        <ListItemText primary="Duration" disableTypography />
        {open[3] ? <ExpandLess /> : <ExpandMore />}
        {/* Annual, Perennial, Short-lived Perennial, Biennial */}
      </ListItem>
      <Collapse in={open[3]}>
        <List>
          <ListItem>
            <FormControlLabel
              //   classes={{ root: classes.formControlLabel }}
              control={<Checkbox value="Annual" />}
              label={<Typography variant="body2">Annual</Typography>}
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              //   classes={{ root: classes.formControlLabel }}
              control={<Checkbox value="Perennial" />}
              label={<Typography variant="body2">Perennial</Typography>}
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              //   classes={{ root: classes.formControlLabel }}
              control={<Checkbox value="Short-lived Perennial" />}
              label={
                <Typography variant="body2">Short-lived Perennial</Typography>
              }
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              //   classes={{ root: classes.formControlLabel }}
              control={<Checkbox value="Biennial" />}
              label={<Typography variant="body2">Biennial</Typography>}
            />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={() => setOpen({ ...open, 4: !open[4] })}>
        <ListItemText primary="Active Growth Period" disableTypography />
        {open[4] ? <ExpandLess /> : <ExpandMore />}
        {/* Spring, Summer, Winter, Fall */}
      </ListItem>
      <Collapse in={open[4]}>
        <List>
          <ListItem>
            <FormControlLabel
              //   classes={{ root: classes.formControlLabel }}
              control={<Checkbox value="Spring" />}
              label={<Typography variant="body2">Spring</Typography>}
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              //   classes={{ root: classes.formControlLabel }}
              control={<Checkbox value="Summer" />}
              label={<Typography variant="body2">Summer</Typography>}
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              //   classes={{ root: classes.formControlLabel }}
              control={<Checkbox value="Winter" />}
              label={<Typography variant="body2">Winter</Typography>}
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              //   classes={{ root: classes.formControlLabel }}
              control={<Checkbox value="Fall" />}
              label={<Typography variant="body2">Fall</Typography>}
            />
          </ListItem>
        </List>
      </Collapse>

      {/* <ListItem button onClick={() => setOpen({ ...open, 5: !open[5] })}> */}
      <ListItem>
        <ListItemText
          primary="Nitrogen Accumulation Min, Legumes (lbs/A/y)"
          disableTypography
        />
        {/* {open[5] ? <ExpandLess /> : <ExpandMore />} */}
        <Slider
          // value={0}
          color="secondary"
          // marks={nitrogenAccumulationMinMarks}
          onChange={(e, val) => {}}
          aria-labelledby="nitrogen-accumulation-min-legumes-slider"
          valueLabelFormat={(x) => {
            console.log(x);
            if (x < 50 || isNaN(x))
              return <span style={{ color: "white" }}>Low</span>;
            else if (x >= 50 && x < 100)
              return <span style={{ color: "white" }}>Med</span>;
            else return <span style={{ color: "white" }}>High</span>;
          }}
          valueLabelDisplay={"auto"}
        />
      </ListItem>
      {/* <Collapse in={open[5]}>Family Common Name</Collapse> */}

      <ListItem>
        {/* <ListItem button onClick={() => setOpen({ ...open, 6: !open[6] })}> */}
        <ListItemText primary="C to N Ratio" disableTypography />
        {/* {open[6] ? <ExpandLess /> : <ExpandMore />} */}
        {/* 0<Low<12; 12<Medium<20; High>20 */}

        <Slider
          // value={0}
          color="secondary"
          onChange={(e, val) => {}}
          aria-labelledby="c-to-n-ratio-slider"
          valueLabelFormat={(x) => {
            console.log(x);
            if (x < 12 || isNaN(x))
              return <span style={{ color: "white" }}>Low</span>;
            else if (x >= 12 && x < 20)
              return <span style={{ color: "white" }}>Med</span>;
            else return <span style={{ color: "white" }}>High</span>;
          }}
          valueLabelDisplay={"auto"}
        />
      </ListItem>
      {/* <Collapse in={open[6]}>Family Common Name</Collapse> */}

      <ListItem button onClick={() => setOpen({ ...open, 7: !open[7] })}>
        <ListItemText primary="Zone Use" disableTypography />
        {open[7] ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open[7]}>
        <List>
          <ListItem>
            <FormControlLabel
              //   classes={{ root: classes.formControlLabel }}
              control={<Checkbox value="Common" />}
              label={<Typography variant="body2">Common</Typography>}
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              //   classes={{ root: classes.formControlLabel }}
              control={<Checkbox value="Emerging" />}
              label={<Typography variant="body2">Emerging</Typography>}
            />
          </ListItem>
        </List>
      </Collapse>

      <ListItem>
        {/* <ListItem button onClick={() => setOpen({ ...open, 8: !open[8] })}> */}
        <ListItemText primary="Dry Matter Max (lbs/A/y)" disableTypography />
        {/* {open[8] ? <ExpandLess /> : <ExpandMore />} */}
        <Slider
          // value={0}
          color="secondary"
          onChange={(e, val) => {}}
          aria-labelledby="dry-matter-max-slider"
          valueLabelFormat={(x) => {
            console.log(x);
            if (x < 12 || isNaN(x))
              return <span style={{ color: "white" }}>Low</span>;
            else if (x >= 12 && x < 20)
              return <span style={{ color: "white" }}>Med</span>;
            else return <span style={{ color: "white" }}>High</span>;
          }}
          valueLabelDisplay={"auto"}
        />
      </ListItem>
      {/* Collapse in={open[8]}>Family Common Name</Collapse> */}

      <ListItem>
        {/* <ListItem button onClick={() => setOpen({ ...open, 9: !open[9] })}> */}
        <ListItemText
          primary="Nitrogen Accumulation Max, Legumes (lbs/A/y)"
          disableTypography
        />
        {/* {open[9] ? <ExpandLess /> : <ExpandMore />} */}
        <Slider
          // value={0}
          color="secondary"
          onChange={(e, val) => {}}
          aria-labelledby="nitrogen-accumulation-max-legumes-slider"
          valueLabelFormat={(x) => {
            console.log(x);
            if (x < 12 || isNaN(x))
              return <span style={{ color: "white" }}>Low</span>;
            else if (x >= 12 && x < 20)
              return <span style={{ color: "white" }}>Med</span>;
            else return <span style={{ color: "white" }}>High</span>;
          }}
          valueLabelDisplay={"auto"}
        />
      </ListItem>
      {/* <Collapse in={open[9]}>Family Common Name</Collapse> */}
    </Fragment>
  );
};

export default BasicAgronomics;
