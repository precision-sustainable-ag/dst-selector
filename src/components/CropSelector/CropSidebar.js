import React, { Fragment, useEffect, useRef } from "react";
import filterData from "../../shared/data-dictionary7-optimised.json";

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
  Checkbox,
  Tooltip,
  Grid,
} from "@material-ui/core";
import {
  Send,
  Drafts,
  Inbox,
  ExpandLess,
  ExpandMore,
  StarBorder,
  CalendarTodayRounded,
} from "@material-ui/icons";
import { CustomStyles } from "../../shared/constants";
import { Context } from "../../store/Store";
import { List as ListMovable, arrayMove } from "react-movable";

import {
  DateRangePicker,
  DateRange,
} from "@matharumanpreet00/react-daterange-picker";
import moment from "moment";
import Axios from "axios";
import { AirtableBearerKey } from "../../shared/keys";
import CropSidebarFilters from "./CropSidebarFilters";
import Filters from "./Filters/Filters";
import CoverCropType from "./Filters/CoverCropType";
import EnvironmentalTolerance from "./Filters/EnvironmentalTolerance";
import Seeds from "./Filters/Seeds";
import SeedingMethods from "./Filters/SeedingMethods";
import Growth from "./Filters/Growth";
import TerminationMethods from "./Filters/TerminationMethods";
import Beneficials from "./Filters/Beneficials";
import Weeds from "./Filters/Weeds";
import DiseaseAndNonWeedPests from "./Filters/DiseaseAndNonWeedPests";
import Roots from "./Filters/Roots";
import "../../styles/cropSidebar.scss";
// const _ = require("lodash");
// const jslinq = require("jslinq");

const useStyles = makeStyles((theme) => ({
  listItemRoot: {
    borderTop: "0px",
    border: "1px solid " + CustomStyles().primaryProgressBtnBorderColor,
  },
  formControlLabel: {},
  listSubHeaderRoot: {
    backgroundColor: CustomStyles().lightGreen,
    color: "black",
    textAlign: "center",
    height: "50px",
    borderTopLeftRadius: CustomStyles().semiRoundedRadius,
    borderTopRightRadius: CustomStyles().semiRoundedRadius,
  },
  nested: {
    paddingLeft: theme.spacing(3),
  },
  subNested: {
    paddingLeft: theme.spacing(4),
  },
}));

const CropSidebarComponent = (props) => {
  const classes = useStyles();
  const [state, dispatch] = React.useContext(Context);

  const [cropFiltersOpen, setCropFiltersOpen] = React.useState(
    props.isListView ? true : false
  );
  const [cashCropOpen, setCashCropOpen] = React.useState(false);
  const [goalsOpen, setGoalsOpen] = React.useState(true);

  const [dateRangeOpen, setDateRangeOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState({
    startDate: null,
    endDate: null,
  });

  const [sidebarFilters, setSidebarFilters] = React.useState([]);
  const [sidebarFiltersOpen, setSidebarFiltersOpen] = React.useState([]);

  // make an exhaustive array of all params in array e.g. cover crop group and use includes in linq
  const [sidebarFilterOptions, setSidebarFilterOptions] = React.useState({
    "Cover Crop Group": [], //string
    "Drought Tolerance": [], //int
    "Flood Tolerance": [], // int
    "Heat Tolerance": [], // int
    "Low Fertility Tolerance": [], // int
    "Salinity Tolerance": [], // int
    "Shade Tolerance": [], // int
    "Seed Price per Pound": [], //int
    "Frost Seeding": [], // -999 or true
    "Aerial Seeding": [], // -999 or true
    Duration: [], // array
    "Active Growth Period": [], //array
    "Growing Window": [], // string
    "Establishes Quickly": [], // int
    "Ease of Establishment": [], // int
    "Winter Survival": [], // array
    "Early Spring Growth": [], // int
    "Flowering Trigger": [], // array
    "Root Architecture": [], // array
    "Root Depth": [], // string
    "Tillage Termination at Vegetative": [], // int
    "Tillage Termination at Flowering": [], // int
    "Freezing Termination at Vegetative": [], // int
    "Chemical Termination at Vegetative": [], // int
    "Chemical Termination at Flowering": [], // int
    "Mow Termination at Flowering": [], // int
    "Roller Crimp Tolerance at Flowering": [], // int
    "Supports Mycorrhizae": [], // int
    "Pollinator Habitat": [], // int
    "Pollinator Food": [], // int
    "Volunteer Establishment": [], // int
    Persistence: [], // int
    "Discourages Nematodes": [], // int
    "Promotes Nematodes": [], // int
    "Discourages Pest Insects": [], // int
    "Promotes Pest Insects": [], // int
    "Suppresses Cash Crop Disease": [], // int
    "Promotes Cash Crop Disease": [], // int
  });
  const [resetFilters, setResetFilters] = React.useState(false);
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    const crop_data = props.cropData.filter(
      (crop) => crop.fields["Zone Decision"] === "Include"
    );

    const sidebarKeys = Object.keys(sidebarFilterOptions);

    const nonZeroKeys = sidebarKeys.filter(function (key) {
      return sidebarFilterOptions[key].length > 0;
    });

    dispatch({
      type: "UPDATE_FILTER_KEYS",
      data: {
        filterKeys: nonZeroKeys,
      },
    });
    if (nonZeroKeys.length > 0) {
      const filtered = getFilteredObjects(crop_data, nonZeroKeys);

      const inactives = crop_data.filter((e) => !filtered.includes(e));

      // if(!firstUpdate){
      props.setActiveCropData(filtered);
      props.setInactiveCropData(inactives);
      // }
      console.log("total", crop_data.length);
      console.log("active", filtered.length);
      console.log("inactive", inactives.length);
      //
    } else {
      props.setActiveCropData(crop_data);
      props.setInactiveCropData([]);
    }
  }, [sidebarFilterOptions]);

  function filterArray(array, filters) {
    const filterKeys = Object.keys(filters);
    return array.filter((crop) => {
      // validates all filter criteria
      return filterKeys.every((key) => {
        // ignores non-function predicates
        if (typeof filters[key] !== "function") return true;
        // return filters[key](item[key]);
        else if (
          findCommonElements(crop.fields[key], sidebarFilterOptions[key]) &&
          crop.fields["Zone Decision"] === "Include"
        ) {
          return true;
        } else if (
          typeof crop.fields[key] === "boolean" &&
          crop.fields["Zone Decision"] === "Include"
        ) {
          if (crop.fields[key] !== -999 && sidebarFilterOptions[key] !== -999)
            return true;
          else return false;
        } else if (
          sidebarFilterOptions[key].includes(crop.fields[key]) &&
          crop.fields["Zone Decision"] === "Include"
        ) {
          return true;
        } else {
          return false;
        }
      });
    });
  }

  const [filtersSelected, setFiltersSelected] = React.useState(false);
  useEffect(() => {
    const sidebarKeys = Object.keys(sidebarFilterOptions);
    // console.log(sidebarKeys);

    const nonZeroKeys = sidebarKeys.filter(function (key) {
      return sidebarFilterOptions[key].length > 0;
    });

    if (nonZeroKeys.length === 0) setFiltersSelected(false);
    else setFiltersSelected(true);
  }, [sidebarFilterOptions]);

  const getFilteredObjects = (data = [], keys = []) => {
    // let filterObj = jslinq(data);
    // console.log(keys);
    // console.log(data);
    return data.filter((crop) => {
      return keys.every((key) => {
        if (Array.isArray(crop.fields[key])) {
          if (
            findCommonElements(crop.fields[key], sidebarFilterOptions[key]) &&
            crop.fields["Zone Decision"] === "Include"
          )
            return true;
          else return false;
        } else if (
          typeof crop.fields[key] === "boolean" &&
          crop.fields["Zone Decision"] === "Include"
        ) {
          if (crop.fields[key] !== -999 && sidebarFilterOptions[key] !== -999)
            return true;
          else return false;
        } else if (
          sidebarFilterOptions[key].includes(crop.fields[key]) &&
          crop.fields["Zone Decision"] === "Include"
        ) {
          return true;
        } else {
          return false;
        }
      });
    });

    // let filtered = filterObj
    // .where(function (item) {
    //   return sidebarFilterOptions["Cover Crop Group"].includes(
    //     item.fields["Cover Crop Group"] ||
    //       sidebarFilterOptions === item.fields
    //   );
    // }).
    // .toList();
  };
  useEffect(() => {
    if (props.isListView) {
      setCropFiltersOpen(true);
      setCashCropOpen(false);
    } else {
      setCropFiltersOpen(false);
      setCashCropOpen(true);
    }
  }, [props.isListView]);

  const toggleSidebarFilterItems = (index) => {
    const newSidebarFiltersOpen = sidebarFiltersOpen.map((obj, index2) => {
      if (index2 === index) return { ...obj, open: !obj.open };
      else return { ...obj };
    });
    setSidebarFiltersOpen(newSidebarFiltersOpen);
  };

  const resetAllFilters = () => {
    props.setActiveCropData(state.cropData);
    props.setInactiveCropData([]);
    setSidebarFilterOptions({
      "Cover Crop Group": [], //string
      "Drought Tolerance": [], //int
      "Flood Tolerance": [], // int
      "Heat Tolerance": [], // int
      "Low Fertility Tolerance": [], // int
      "Salinity Tolerance": [], // int
      "Shade Tolerance": [], // int
      "Seed Price per Pound": [], //int
      "Frost Seeding": [], // -999 or true
      "Aerial Seeding": [], // -999 or true
      Duration: [], // array
      "Active Growth Period": [], //array
      "Growing Window": [], // string
      "Establishes Quickly": [], // int
      "Ease of Establishment": [], // int
      "Winter Survival": [], // array
      "Early Spring Growth": [], // int
      "Flowering Trigger": [], // array
      "Root Architecture": [], // array
      "Root Depth": [], // string
      "Tillage Termination at Vegetative": [], // int
      "Tillage Termination at Flowering": [], // int
      "Freezing Termination at Vegetative": [], // int
      "Chemical Termination at Vegetative": [], // int
      "Chemical Termination at Flowering": [], // int
      "Mow Termination at Flowering": [], // int
      "Roller Crimp Tolerance at Flowering": [], // int
      "Supports Mycorrhizae": [], // int
      "Pollinator Habitat": [], // int
      "Pollinator Food": [], // int
      "Volunteer Establishment": [], // int
      Persistence: [], // int
      "Discourages Nematodes": [], // int
      "Promotes Nematodes": [], // int
      "Discourages Pest Insects": [], // int
      "Promotes Pest Insects": [], // int
      "Suppresses Cash Crop Disease": [], // int
      "Promotes Cash Crop Disease": [], // int
    });
    setResetFilters(!resetFilters);
  };
  React.useEffect(() => {
    setSidebarFilters(filterData);
    const filterTitles = filterData.map((filter) => {
      return { name: filter.name, open: false };
    });
    setSidebarFiltersOpen(filterTitles);

    return () => {
      setSidebarFilters([]);
      setSidebarFiltersOpen([]);
    };
  }, []);

  const [envTolData, setEnvTolData] = React.useState({
    "Heat Tolerance": false,
    "Drought Tolerance": false,
    "Shade Tolerance": false,
    "Flood Tolerance": false,
    "Low Fertility Tolerance": false,
    "Salinity Tolerance": false,
    "Winter Survival": false,
  });
  const [growthWindowVisible, setGrowthWindowVisible] = React.useState(true);

  let [keysArray, setKeysArray] = React.useState([]);
  const [keysArrChanged, setKeysArrChanges] = React.useState(false);

  //DONE: this method is not being used
  const getAirtableDictionaryURL = (zone) => {
    switch (zone) {
      case 2: {
        break;
      }
      case 4: {
        break;
      }
      case 5: {
        break;
      }
      case 6: {
        break;
      }
      case 7: {
        return `https://api.airtable.com/v0/app2q3UaKHXutMQyt/tbl4l2aYdp6ra5nqH?filterByFormula=TRUE(%7BFilter+Field%7D)&sort%5B0%5D%5Bfield%5D=Category&sort%5B0%5D%5Bdirection%5D=asc`;
        // return `./json/data-dictionary7.json`;
      }

      default: {
        return `https://api.airtable.com/v0/app2q3UaKHXutMQyt/tbl4l2aYdp6ra5nqH?filterByFormula=TRUE(%7BFilter+Field%7D)&sort%5B0%5D%5Bfield%5D=Category&sort%5B0%5D%5Bdirection%5D=asc`;
      }
    }
  };
  const updateSelectedGoals = (newGoalArr, oldIndex, newIndex) => {
    let newGoals = arrayMove(newGoalArr, oldIndex, newIndex);

    dispatch({
      type: "DRAG_GOALS",
      data: {
        selectedGoals: newGoals,
        snackOpen: true,
        snackMessage: "Goal Priority Changed",
      },
    });
  };

  const changeProgress = (type) => {
    if (type === "increment") {
      // if progress = 1 (location stage), check if textfield has a value? then set state address to that value
      // if(state.progress === 1) {
      //   if(document.getElementById('google-map-autocompletebar').)
      // }
      dispatch({
        type: "UPDATE_PROGRESS",
        data: {
          type: "INCREMENT",
        },
      });
    }

    if (type === "decrement") {
      dispatch({
        type: "UPDATE_PROGRESS",
        data: {
          type: "DECREMENT",
        },
      });
    }
  };

  const handleClick = (index) => {
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
          ),
        },
      });
    }

    props.setGrowthWindow(growthWindowVisible);
  }, [dateRange, growthWindowVisible]);

  React.useEffect(() => {
    props.sortEnvTolCropData(keysArray);
  }, [keysArrChanged]);

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
      <ListItem
        button
        onClick={() => handleClick(0)}
        style={
          goalsOpen
            ? {
                backgroundColor: CustomStyles().lightGreen,
                borderTop: "4px solid white",
              }
            : { backgroundColor: "inherit", borderTop: "4px solid white" }
        }
      >
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
      <ListItem
        button
        onClick={() => handleClick(1)}
        style={
          cashCropOpen
            ? { backgroundColor: CustomStyles().lightGreen }
            : { backgroundColor: "inherit" }
        }
      >
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
              helperText="Enter crop"
              margin="dense"
              variant="outlined"
            />
          </ListItem>
          <ListItem className={classes.nested}>
            <TextField
              label="Planting to Harvest"
              value={`${state.cashCropData.dateRange.startDate} - ${state.cashCropData.dateRange.endDate}`}
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
                ),
              }}
            />
          </ListItem>
          <ListItem style={{ zIndex: 99 }}>
            <DateRangePicker
              open={dateRangeOpen}
              onChange={(range) => setDateRange(range)}
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
      <ListItem
        button
        onClick={() => handleClick(2)}
        style={
          cropFiltersOpen
            ? { backgroundColor: CustomStyles().lightGreen }
            : { backgroundColor: "inherit" }
        }
      >
        <ListItemText primary="COVER CROP FILTERS" />
        {cropFiltersOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={cropFiltersOpen} timeout="auto">
        <List component="div" disablePadding className="cropFilters">
          {filtersSelected ? (
            <ListItem onClick={() => {}}>
              <ListItemText
                primary={
                  <Button size="small" onClick={resetAllFilters}>
                    <small className="text-danger font-weight-bold">
                      CLEAR FILTERS
                    </small>
                  </Button>
                }
              />
            </ListItem>
          ) : (
            <ListItem></ListItem>
          )}

          {sidebarFilters.map((filter, index) => (
            <Fragment key={index}>
              <ListItem
                // className={classes.nested}
                className={
                  sidebarFiltersOpen[index].open ? "filterOpen" : "filterClose"
                }
                button
                onClick={() => toggleSidebarFilterItems(index)}
              >
                {filter.description !== null ? (
                  <Tooltip
                    enterDelay={3000}
                    interactive
                    arrow
                    placement="right-start"
                    title={
                      <div className="tooltipTextContainer text-left">
                        <p>{filter.description}</p>
                      </div>
                    }
                    key={`tooltip${index}`}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="body2">
                          {filter.name.toUpperCase()}
                        </Typography>
                      }
                    />
                  </Tooltip>
                ) : (
                  <ListItemText
                    primary={
                      <Typography variant="body2">
                        {filter.name.toUpperCase()}
                      </Typography>
                    }
                  />
                )}

                {sidebarFiltersOpen[index].open ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItem>

              <Collapse in={sidebarFiltersOpen[index].open} timeout="auto">
                <List component="div" disablePadding>
                  <ListItem
                    // className={classes.subNested}
                    // title={sidebarFilters[index].description}
                    component="div"
                  >
                    {filter.name.toUpperCase() === "COVER CROP TYPE" ? (
                      <CoverCropType
                        filters={sidebarFilters[index]}
                        sidebarFilterOptions={sidebarFilterOptions}
                        setSidebarFilterOptions={setSidebarFilterOptions}
                        resetAllFilters={resetAllFilters}
                        {...props}
                      />
                    ) : (
                      ""
                    )}

                    {filter.name.toUpperCase() ===
                    "ENVIRONMENTAL TOLERANCES" ? (
                      <EnvironmentalTolerance
                        filters={sidebarFilters[index]}
                        sidebarFilterOptions={sidebarFilterOptions}
                        setSidebarFilterOptions={setSidebarFilterOptions}
                        resetAllFilters={resetAllFilters}
                        {...props}
                      />
                    ) : (
                      ""
                    )}

                    {filter.name.toUpperCase() === "SEEDS" ? (
                      <Seeds
                        filters={sidebarFilters[index]}
                        sidebarFilterOptions={sidebarFilterOptions}
                        setSidebarFilterOptions={setSidebarFilterOptions}
                        resetAllFilters={resetAllFilters}
                        {...props}
                      />
                    ) : (
                      ""
                    )}
                    {filter.name.toUpperCase() === "SEEDING METHODS" ? (
                      <SeedingMethods
                        filters={sidebarFilters[index]}
                        sidebarFilterOptions={sidebarFilterOptions}
                        setSidebarFilterOptions={setSidebarFilterOptions}
                        resetAllFilters={resetAllFilters}
                        {...props}
                      />
                    ) : (
                      ""
                    )}
                    {filter.name.toUpperCase() === "GROWTH" ? (
                      <Grid container spacing={1}>
                        <Grid item>
                          <Growth
                            filters={sidebarFilters[index]}
                            sidebarFilterOptions={sidebarFilterOptions}
                            setSidebarFilterOptions={setSidebarFilterOptions}
                            resetAllFilters={resetAllFilters}
                            {...props}
                          />
                        </Grid>
                      </Grid>
                    ) : (
                      ""
                    )}
                    {filter.name.toUpperCase() === "ROOTS" ? (
                      <Grid container spacing={1}>
                        <Grid item>
                          <Roots
                            filters={sidebarFilters[index]}
                            sidebarFilterOptions={sidebarFilterOptions}
                            setSidebarFilterOptions={setSidebarFilterOptions}
                            resetAllFilters={resetAllFilters}
                            {...props}
                          />
                        </Grid>
                      </Grid>
                    ) : (
                      ""
                    )}
                    {filter.name.toUpperCase() === "TERMINATION METHODS" ? (
                      <TerminationMethods
                        filters={sidebarFilters[index]}
                        sidebarFilterOptions={sidebarFilterOptions}
                        setSidebarFilterOptions={setSidebarFilterOptions}
                        resetAllFilters={resetAllFilters}
                        {...props}
                      />
                    ) : (
                      ""
                    )}
                    {filter.name.toUpperCase() === "BENEFICIALS" ? (
                      <Beneficials
                        filters={sidebarFilters[index]}
                        sidebarFilterOptions={sidebarFilterOptions}
                        setSidebarFilterOptions={setSidebarFilterOptions}
                        resetAllFilters={resetAllFilters}
                        {...props}
                      />
                    ) : (
                      ""
                    )}
                    {filter.name.toUpperCase() === "WEEDS" ? (
                      <Weeds
                        filters={sidebarFilters[index]}
                        sidebarFilterOptions={sidebarFilterOptions}
                        setSidebarFilterOptions={setSidebarFilterOptions}
                        resetAllFilters={resetAllFilters}
                        {...props}
                      />
                    ) : (
                      ""
                    )}
                    {filter.name.toUpperCase() ===
                    "DISEASE & NON WEED PESTS" ? (
                      <DiseaseAndNonWeedPests
                        filters={sidebarFilters[index]}
                        sidebarFilterOptions={sidebarFilterOptions}
                        setSidebarFilterOptions={setSidebarFilterOptions}
                        resetAllFilters={resetAllFilters}
                        {...props}
                      />
                    ) : (
                      ""
                    )}
                  </ListItem>
                </List>
              </Collapse>
            </Fragment>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

const findCommonElements = (arr1 = [], arr2 = []) => {
  // Iterate through each element in the
  // first array and if some of them
  // include the elements in the second
  // array then return true.
  return arr1.some((item) => arr2.includes(item));
};

export default CropSidebarComponent;
