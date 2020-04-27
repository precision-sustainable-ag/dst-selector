import React, { Fragment } from "react";
import {
  makeStyles,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import {
  Send,
  Drafts,
  Inbox,
  ExpandLess,
  ExpandMore,
  StarBorder,
  CalendarTodayRounded
} from "@material-ui/icons";
import { CustomStyles } from "../../shared/constants";
import { Context } from "../../store/Store";
import { List as ListMovable, arrayMove } from "react-movable";

import {
  DateRangePicker,
  DateRange
} from "@matharumanpreet00/react-daterange-picker";
import moment from "moment";

const useStyles = makeStyles(theme => ({
  listItemRoot: {
    borderTop: "0px",
    border: "1px solid " + CustomStyles().primaryProgressBtnBorderColor
  },
  formControlLabel: {},
  listSubHeaderRoot: {
    backgroundColor: CustomStyles().lightGreen,
    color: "black",
    textAlign: "center",
    height: "50px",
    borderTopLeftRadius: CustomStyles().semiRoundedRadius,
    borderTopRightRadius: CustomStyles().semiRoundedRadius
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const CropSidebarComponent = props => {
  const classes = useStyles();
  const [state, dispatch] = React.useContext(Context);
  const [cropFiltersOpen, setCropFiltersOpen] = React.useState(false);
  const [cashCropOpen, setCashCropOpen] = React.useState(false);
  const [goalsOpen, setGoalsOpen] = React.useState(true);

  const [dateRangeOpen, setDateRangeOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState({
    startDate: null,
    endDate: null
  });

  const [envTolData, setEnvTolData] = React.useState({
    "Heat Tolerance": false,
    "Drought Tolerance": false,
    "Shade Tolerance": false,
    "Flood Tolerance": false,
    "Low Fertility Tolerance": false,
    "Salinity Tolerance": false,
    "Winter Survival": false
  });
  const [growthWindowVisible, setGrowthWindowVisible] = React.useState(true);

  const [openEnvTol, setOpenEnvTol] = React.useState(false);

  const updateSelectedGoals = (newGoalArr, oldIndex, newIndex) => {
    let newGoals = arrayMove(newGoalArr, oldIndex, newIndex);

    dispatch({
      type: "DRAG_GOALS",
      data: {
        selectedGoals: newGoals,
        snackOpen: true,
        snackMessage: "Goal Priority Changed"
      }
    });
  };

  const changeProgress = type => {
    if (type === "increment") {
      // if progress = 1 (location stage), check if textfield has a value? then set state address to that value
      // if(state.progress === 1) {
      //   if(document.getElementById('google-map-autocompletebar').)
      // }
      dispatch({
        type: "UPDATE_PROGRESS",
        data: {
          type: "INCREMENT"
        }
      });
    }

    if (type === "decrement") {
      dispatch({
        type: "UPDATE_PROGRESS",
        data: {
          type: "DECREMENT"
        }
      });
    }
  };

  const handleClick = index => {
    switch (index) {
      case 0:
        setGoalsOpen(!goalsOpen);
        break;
      case 1:
        setCashCropOpen(!cashCropOpen);
        break;
      case 2:
        setCropFiltersOpen(!cropFiltersOpen);
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    if (dateRange.startDate !== null && dateRange.endDate !== null) {
      //   setFormattedDateRange({
      //     startDate: moment(dateRange.startDate).format("MM/DD"),
      //     endDate: moment(dateRange.endDate).format("MM/DD")
      //   });
      console.log(new Date(dateRange.startDate).toISOString());
      dispatch({
        type: "UPDATE_DATE_RANGE",
        data: {
          startDate: moment(
            new Date(dateRange.startDate).toISOString(),
            "YYYY-MM-DD"
          ).format("MM/DD"),
          endDate: moment(new Date(dateRange.endDate).toISOString()).format(
            "MM/DD"
          )
        }
      });
    }

    props.setGrowthWindow(growthWindowVisible);
    props.sortEnvTolCropData(envTolData);

    // if (envTolData.heat) {
    //   props.sortCropData(envTolData);
    // } else {
    //   props.sortCropData(envTolData);
    // }
  }, [dateRange, growthWindowVisible, envTolData]);
  return (
    <List
      component="nav"
      classes={{ root: classes.listRoot }}
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          classes={{ root: classes.listSubHeaderRoot }}
          component="div"
          id="nested-list-subheader"
        >
          FILTER
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button onClick={() => handleClick(0)}>
        <ListItemText primary="COVER CROP GOALS" />
        {goalsOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={goalsOpen} timeout="auto" unmountOnExit>
        {state.selectedGoals.length === 0 ? (
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText primary="No Goals Selected" />
            </ListItem>
            <ListItem className={classes.nested}>
              <Button onClick={() => changeProgress("decrement")}>
                click to edit
              </Button>
            </ListItem>
          </List>
        ) : (
          <Fragment>
            <List component="div" disablePadding>
              <ListItem className={classes.nested}>
                <ListItemText primary="Goal Priority Order" />
              </ListItem>
            </List>
            <ListMovable
              values={state.selectedGoals}
              onChange={({ oldIndex, newIndex }) =>
                updateSelectedGoals(state.selectedGoals, oldIndex, newIndex)
              }
              renderList={({ children, props }) => (
                <ol className="goalsListFilter" {...props}>
                  {children}
                </ol>
              )}
              renderItem={({ value, props }) => (
                <li {...props}>{value.toUpperCase()}</li>
              )}
            />
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                onClick={() => changeProgress("decrement")}
              >
                <ListItemText primary="Drag to reorder, click to edit" />
              </ListItem>
            </List>
          </Fragment>
        )}
      </Collapse>
      <ListItem button onClick={() => handleClick(1)}>
        {/* <ListItemIcon>
          <Inbox />
        </ListItemIcon> */}
        <ListItemText primary="CASH CROP" />
        {cashCropOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={cashCropOpen} timeout="auto" unmountOnExit>
        <List component="div">
          <ListItem className={classes.nested}>
            <TextField
              label="Cash Crop"
              id="outlined-margin-dense"
              defaultValue=""
              //   className={classes.textField}
              helperText="Enter crop"
              margin="dense"
              variant="outlined"
            />
          </ListItem>
          <ListItem className={classes.nested}>
            {/* <TextField
              label="Planting to Harvest"
              id="outlined-margin-dense"
              defaultValue=""
              //   className={classes.textField}
              helperText="Enter dates"
              margin="dense"
              variant="outlined"
            /> */}
            <TextField
              label="Planting to Harvest"
              //   defaultValue={""}
              value={`${state.cashCropData.dateRange.startDate} - ${state.cashCropData.dateRange.endDate}`}
              //   onChange={handleChange}
              fullWidth
              margin="dense"
              aria-haspopup="true"
              variant="outlined"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment>
                    <IconButton
                      size="small"
                      onClick={() => setDateRangeOpen(!dateRangeOpen)}
                    >
                      <CalendarTodayRounded />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </ListItem>
          <ListItem style={{ zIndex: 99 }}>
            <DateRangePicker
              open={dateRangeOpen}
              onChange={range => setDateRange(range)}
            />
          </ListItem>
          <ListItem className={classes.nested}>
            <FormGroup>
              <FormControlLabel
                classes={{ root: classes.formControlLabel }}
                control={
                  <Checkbox
                    checked={growthWindowVisible}
                    onChange={() => {
                      setGrowthWindowVisible(!growthWindowVisible);
                    }}
                    value="Show Growth Window"
                  />
                }
                label={
                  <Typography variant="body2">Show Growth Window</Typography>
                }
              />
            </FormGroup>
          </ListItem>
        </List>
      </Collapse>
      <ListItem button onClick={() => handleClick(2)}>
        {/* <ListItemIcon>
          <Inbox />
        </ListItemIcon> */}
        <ListItemText primary="COVER CROP FILTERS" />
        {cropFiltersOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={cropFiltersOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText
              primary={<Typography variant="body2">Agronomic</Typography>}
            />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => setOpenEnvTol(!openEnvTol)}
          >
            <ListItemText
              primary={
                <Typography variant="body2">Environmental Tolerance</Typography>
              }
            />
            {openEnvTol ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openEnvTol} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <div>
                  <FormGroup>
                    <FormControlLabel
                      classes={{ root: classes.formControlLabel }}
                      control={
                        <Checkbox
                          checked={envTolData["Heat Tolerance"]}
                          onChange={() => {
                            setEnvTolData({
                              ...envTolData,
                              "Heat Tolerance": !envTolData["Heat Tolerance"]
                            });
                          }}
                          value="HEAT"
                        />
                      }
                      label={<Typography variant="body2">HEAT</Typography>}
                    />
                    {/* </FormGroup>
                  <FormGroup> */}
                    <FormControlLabel
                      classes={{ root: classes.formControlLabel }}
                      control={
                        <Checkbox
                          checked={envTolData["Drought Tolerance"]}
                          onChange={() => {
                            setEnvTolData({
                              ...envTolData,
                              "Drought Tolerance": !envTolData[
                                "Drought Tolerance"
                              ]
                            });
                          }}
                          value="DROUGHT"
                        />
                      }
                      label={<Typography variant="body2">DROUGHT</Typography>}
                    />
                    {/* </FormGroup>
                  <FormGroup> */}
                    <FormControlLabel
                      classes={{ root: classes.formControlLabel }}
                      control={
                        <Checkbox
                          checked={envTolData["Shade Tolerance"]}
                          onChange={() => {
                            setEnvTolData({
                              ...envTolData,
                              "Shade Tolerance": !envTolData["Shade Tolerance"]
                            });
                          }}
                          value="SHADE"
                        />
                      }
                      label={<Typography variant="body2">SHADE</Typography>}
                    />
                    {/* </FormGroup>
                  <FormGroup> */}
                    <FormControlLabel
                      classes={{ root: classes.formControlLabel }}
                      control={
                        <Checkbox
                          checked={envTolData["Flood Tolerance"]}
                          onChange={() => {
                            setEnvTolData({
                              ...envTolData,
                              "Flood Tolerance": !envTolData["Flood Tolerance"]
                            });
                          }}
                          value="FLOOD"
                        />
                      }
                      label={<Typography variant="body2">FLOOD</Typography>}
                    />
                    {/* </FormGroup>
                  <FormGroup> */}
                    <FormControlLabel
                      classes={{ root: classes.formControlLabel }}
                      control={
                        <Checkbox
                          checked={envTolData["Low Fertility Tolerance"]}
                          onChange={() => {
                            setEnvTolData({
                              ...envTolData,
                              "Low Fertility Tolerance": !envTolData[
                                "Low Fertility Tolerance"
                              ]
                            });
                          }}
                          value="LOW FERTILITY"
                        />
                      }
                      label={
                        <Typography variant="body2">LOW FERTILITY</Typography>
                      }
                    />
                    <FormControlLabel
                      classes={{ root: classes.formControlLabel }}
                      control={
                        <Checkbox
                          checked={envTolData["Salinity Tolerance"]}
                          onChange={() => {
                            setEnvTolData({
                              ...envTolData,
                              "Salinity Tolerance": !envTolData[
                                "Salinity Tolerance"
                              ]
                            });
                          }}
                          value="SALINITY"
                        />
                      }
                      label={<Typography variant="body2">SALINITY</Typography>}
                    />
                    <FormControlLabel
                      classes={{ root: classes.formControlLabel }}
                      control={
                        <Checkbox
                          checked={envTolData["Winter Survival"]}
                          onChange={() => {
                            setEnvTolData({
                              ...envTolData,
                              "Winter Survival": !envTolData["Winter Survival"]
                            });
                          }}
                          value="WINTER SURVIVAL"
                        />
                      }
                      label={
                        <Typography variant="body2">WINTER SURVIVAL</Typography>
                      }
                    />
                  </FormGroup>
                </div>
              </ListItem>
            </List>
          </Collapse>
          <ListItem button className={classes.nested}>
            <ListItemText
              primary={<Typography variant="body2">Soil Conditions</Typography>}
            />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText
              primary={<Typography variant="body2">Growth</Typography>}
            />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText
              primary={
                <Typography variant="body2">Planting & Termination</Typography>
              }
            />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText
              primary={
                <Typography variant="body2">Grazers & Pollinators</Typography>
              }
            />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText
              primary={<Typography variant="body2">Pests & Disease</Typography>}
            />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
};

export default CropSidebarComponent;
