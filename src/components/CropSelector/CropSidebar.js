import React, { Fragment, useEffect, useRef } from "react";
import filterData from "../../shared/data-dictionary7-optimised.json";

import {
  makeStyles,
  List,
  ListSubheader,
  ListItem,
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
  ExpandLess,
  ExpandMore,
  CalendarTodayRounded,
  CalendarToday,
  Compare,
} from "@material-ui/icons";
import ListIcon from "@material-ui/icons/List";
import { CustomStyles } from "../../shared/constants";
import { Context } from "../../store/Store";
import { List as ListMovable, arrayMove } from "react-movable";

import { DateRangePicker } from "@matharumanpreet00/react-daterange-picker";
import moment from "moment";

import CoverCropType from "./Filters/CoverCropType";
import EnvironmentalTolerance from "./Filters/EnvironmentalTolerance";
import Seeds from "./Filters/Seeds";
import SeedingMethods from "./Filters/SeedingMethods";
import Growth from "./Filters/Growth";
import TerminationMethods from "./Filters/TerminationMethods";
import Beneficials from "./Filters/Beneficials";
import Weeds from "./Filters/Weeds";
// import DiseaseAndNonWeedPests from "./Filters/DiseaseAndNonWeedPests";
import Roots from "./Filters/Roots";
import "../../styles/cropSidebar.scss";
import SoilConditions from "./Filters/SoilConditions";
const _ = require("lodash");
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
    // borderTopLeftRadius: CustomStyles().semiRoundedRadius,
    // borderTopRightRadius: CustomStyles().semiRoundedRadius,
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

  const comparisonView = props.comparisonView;

  const [cropFiltersOpen, setCropFiltersOpen] = React.useState(
    props.isListView ? true : false
  );
  const [showFilters, setShowFilters] = React.useState(
    window.location.pathname === "/"
      ? props.from === "table"
        ? state.speciesSelectorActivationFlag
          ? true
          : comparisonView
          ? true
          : false
        : true
      : true
  );
  useEffect(() => {
    if (window.location.pathname !== "/") {
      setShowFilters(true);
    } else {
      if (props.from === "table") {
        if (state.speciesSelectorActivationFlag) {
          setShowFilters(true);
        } else {
          if (comparisonView) {
            setShowFilters(true);
          } else {
            setShowFilters(false);
          }
        }
      } else {
        setShowFilters(true);
      }
    }
  }, [
    window.location.pathname,
    state.speciesSelectorActivationFlag,
    props.from,
    comparisonView,
  ]);

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
  const seedingMethodRef = useRef();
  const beneficialsRef = useRef();
  const coverCropTypeRef = useRef();
  // const diseaseRef = useRef();
  const growthRef = useRef();
  const rootsRef = useRef();
  const seedsRef = useRef();
  const weedsRef = useRef();
  const terminationRef = useRef();
  const envTolRef = useRef();

  const [resetFilters, setResetFilters] = React.useState(false);
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    filterSidebarItems();
  }, [sidebarFilterOptions]);

  const filterSidebarItems = () => {
    const crop_data = props.cropData.filter(
      (crop) => crop.fields["Zone Decision"] === "Include"
    );

    const nonZeroes = Object.keys(sidebarFilterOptions).map((key) => {
      if (sidebarFilterOptions[key].length !== 0) {
        return { [key]: sidebarFilterOptions[key] };
      } else return "";
    });
    const nonZeroKeys2 = nonZeroes.filter((val) => val !== "");

    const nonZeroKeys = nonZeroKeys2.map((obj) => {
      // console.log(obj)
      // console.log(Object.keys(obj));
      return Object.keys(obj).toString();
    });

    // console.log(nonZeroKeys)
    // localStorage.setItem("filterKeys", JSON.stringify(nonZeroKeys));
    dispatch({
      type: "UPDATE_FILTER_KEYS",
      data: {
        filterKeys: nonZeroKeys,
      },
    });
    if (sidebarFilterOptions["Active Growth Period"].length > 0) {
      let growthArray = [];

      if (sidebarFilterOptions["Active Growth Period"].includes("Fall")) {
        growthArray.push("Sep");
        growthArray.push("Oct");
        growthArray.push("Nov");
      }
      if (sidebarFilterOptions["Active Growth Period"].includes("Winter")) {
        growthArray.push("Dec");
        growthArray.push("Jan");
        growthArray.push("Feb");
      }
      if (sidebarFilterOptions["Active Growth Period"].includes("Spring")) {
        growthArray.push("Mar");
        growthArray.push("Apr");
        growthArray.push("May");
      }
      if (sidebarFilterOptions["Active Growth Period"].includes("Summer")) {
        growthArray.push("Jun");
        growthArray.push("Jul");
        growthArray.push("Aug");
      }

      dispatch({
        type: "UPDATE_ACTIVE_GROWTH_PERIOD",
        data: {
          activeGrowthPeriod: growthArray,
        },
      });
    } else {
      dispatch({
        type: "UPDATE_ACTIVE_GROWTH_PERIOD",
        data: {
          activeGrowthPeriod: [],
        },
      });
    }

    if (nonZeroKeys.length > 0) {
      // const filtered = getFilteredObjects(crop_data, nonZeroKeys);

      const arrayKeys = [
        "Duration",
        "Active Growth Period",
        "Winter Survival",
        "Flowering Trigger",
        "Root Architecture",
      ];
      const booleanKeys = ["Aerial Seeding", "Frost Seeding"];
      const aerialOrFrost = [""];

      const filtered = crop_data.filter((crop) => {
        const totalActiveFilters = Object.keys(nonZeroKeys2).length;
        let i = 0;
        nonZeroKeys2.forEach((keyObject) => {
          const key = Object.keys(keyObject);
          // console.log(key);
          const vals = keyObject[key];
          if (areCommonElements(arrayKeys, key)) {
            // Handle array type havlues

            if (_.intersection(vals, crop.fields[key]).length > 0) {
              i++;
            }
          } else if (areCommonElements(booleanKeys, key)) {
            //  Handle boolean types
            if (crop.fields[key]) {
              i++;
            }
          } else {
            if (vals.includes(crop.fields[key])) {
              i++;
            }
          }
        });

        if (i === totalActiveFilters) return true;
      });

      const inactives = crop_data.filter((e) => !filtered.includes(e));

      // if(!firstUpdate){
      props.setActiveCropData(filtered);
      props.setInactiveCropData(inactives);
      // }
      console.log("total", crop_data.length);
      console.log("active", filtered.length);
      console.log("first", filtered);
      console.log("inactive", inactives.length);
      //
    } else {
      props.setActiveCropData(crop_data);
      props.setInactiveCropData([]);
    }
  };
  const areCommonElements = (arr1, arr2) => {
    const arr2Set = new Set(arr2);
    return arr1.some((el) => arr2Set.has(el));
  };

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
    beneficialsRef.current.resetFilters();
    coverCropTypeRef.current.resetFilters();
    // diseaseRef.current.resetFilters();
    envTolRef.current.resetFilters();
    growthRef.current.resetFilters();
    rootsRef.current.resetFilters();
    seedingMethodRef.current.resetFilters();

    seedsRef.current.resetFilters();
    terminationRef.current.resetFilters();
    weedsRef.current.resetFilters();
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
  useEffect(() => {
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

  React.useMemo(() => {
    if (beneficialsRef.current) {
      resetAllFilters();
    }
  }, [props.cropDataChanged]);

  const [growthWindowVisible, setGrowthWindowVisible] = React.useState(true);

  let [keysArray, setKeysArray] = React.useState([]);
  const [keysArrChanged, setKeysArrChanges] = React.useState(false);

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

  useEffect(() => {
    if (props.from === "table") {
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
    }
  }, [dateRange, growthWindowVisible, props.from]);

  useEffect(() => {
    if (props.from === "table") {
      props.sortEnvTolCropData(keysArray);
    }
  }, [keysArrChanged]);

  const [tableHeight, setTableHeight] = React.useState(0);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (
      document.querySelector(".MuiTableRow-root.theadFirst.MuiTableRow-head")
    ) {
      const totalHt = document
        .querySelector(".MuiTableRow-root.theadFirst.MuiTableRow-head")
        .getBoundingClientRect().height;
      const btnHt = document
        .querySelector(".dynamicToggleBtn")
        .getBoundingClientRect().height;

      const ht = totalHt - btnHt;

      setTableHeight(ht);
    }
  });

  return (
    <div className="row">
      {state.myCoverCropActivationFlag && props.from === "table" ? (
        <div
          className="col-12"
          style={{
            paddingBottom: tableHeight,
          }}
        >
          {/* <div className="iconToggle"> */}
          <Button
            className="dynamicToggleBtn"
            fullWidth
            variant="contained"
            onClick={props.toggleComparisonView}
            size="large"
            color="secondary"
            startIcon={
              props.comparisonView ? (
                <Compare style={{ fontSize: "larger" }} />
              ) : (
                <ListIcon style={{ fontSize: "larger" }} />
              )
            }
          >
            {props.comparisonView ? "COMPARISON VIEW" : "LIST VIEW"}
          </Button>
        </div>
      ) : props.from === "table" ? (
        <div
          className="col-12"
          style={{
            paddingBottom: tableHeight,
          }}
        >
          <Button
            className="dynamicToggleBtn"
            fullWidth
            variant="contained"
            onClick={props.toggleListView}
            size="large"
            color="secondary"
            startIcon={
              props.isListView ? (
                <CalendarToday style={{ fontSize: "larger" }} />
              ) : (
                <ListIcon style={{ fontSize: "larger" }} />
              )
            }
          >
            {props.isListView ? "CALENDAR VIEW" : "LIST VIEW"}
          </Button>
        </div>
      ) : (
        ""
      )}

      <div className="col-12">
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
          {props.from === "table" ? (
            <Fragment>
              {showFilters &&
              state.speciesSelectorActivationFlag &&
              props.isListView ? (
                <ListItem>
                  <ListItemText>
                    <TextField
                      fullWidth
                      color="secondary"
                      label="Search Cover Crop Name"
                      value={props.coverCropName}
                      onInput={props.covercropsNamesFilter}
                    />
                  </ListItemText>
                </ListItem>
              ) : (
                ""
              )}
              <ListItem
                button
                onClick={() => handleClick(0)}
                style={
                  goalsOpen
                    ? {
                        backgroundColor: CustomStyles().lightGreen,
                        borderTop: "4px solid white",
                      }
                    : {
                        backgroundColor: "inherit",
                        borderTop: "4px solid white",
                      }
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
                        updateSelectedGoals(
                          state.selectedGoals,
                          oldIndex,
                          newIndex
                        )
                      }
                      renderList={({ children, props, isDragged }) => (
                        <ol
                          className="goalsListFilter"
                          {...props}
                          style={{
                            cursor: isDragged ? "grabbing" : undefined,
                          }}
                        >
                          {children}
                        </ol>
                      )}
                      renderItem={({ value, props, isDragged, isSelected }) => (
                        <li
                          {...props}
                          style={{
                            ...props.style,
                            cursor: isDragged ? "grabbing" : "grab",
                            fontSize: "10pt",
                            fontWeight:
                              isDragged || isSelected ? "700" : "normal",
                            color: "#48a8ab",
                          }}
                        >
                          {value.toUpperCase()}
                        </li>
                      )}
                    />

                    <ListItem className={classes.nested}>
                      <ListItemText
                        primary="Click & drag to reorder"
                        style={{
                          fontWeight: "normal",
                          fontSize: "10pt",
                        }}
                        disableTypography
                      />
                    </ListItem>

                    {/* <Button onClick={() => changeProgress("decrement")}>
                      Click to edit
                    </Button> */}

                    <ListItem className={classes.nested}>
                      <ListItemText disableTypography>
                        <Typography
                          variant="button"
                          className="font-weight-bold text-uppercase text-left"
                          onClick={() => changeProgress("decrement")}
                          style={{ cursor: "pointer" }}
                        >
                          &nbsp;Click To Edit
                        </Typography>
                      </ListItemText>
                    </ListItem>
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
                      margin="dense"
                      variant="outlined"
                    />
                  </ListItem>
                  <ListItem className={classes.nested}>
                    {/* <DatePicker
        label="Start Date"
        value={state.cashCropData.dateRange.startDate}
        onChange={handleDateChange}
        animateYearScrolling
      /> */}
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
                            value="Show Cash Crop Growth Window"
                          />
                        }
                        label={
                          <Typography variant="body2">
                            Show Growth Window
                          </Typography>
                        }
                      />
                    </FormGroup>
                  </ListItem>
                </List>
              </Collapse>
            </Fragment>
          ) : (
            ""
          )}

          {showFilters ? (
            <Fragment>
              {props.from === "explorer" ? (
                <ListItem>
                  <ListItemText>
                    <TextField
                      fullWidth
                      color="secondary"
                      label="Search Cover Crop Name"
                      value={props.searchValue}
                      onChange={props.handleSearchChange}
                    />
                  </ListItemText>
                </ListItem>
              ) : (
                ""
              )}

              <ListItem
                button
                onClick={() => handleClick(2)}
                style={
                  props.from === "table"
                    ? cropFiltersOpen
                      ? { backgroundColor: CustomStyles().lightGreen }
                      : { backgroundColor: "inherit" }
                    : { backgroundColor: CustomStyles().lightGreen }
                }
              >
                <ListItemText primary="COVER CROP PROPERTIES" />
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

                  {sidebarFilters.map((filter, index) => {
                    if (filter.name !== "Soil Conditions") {
                      // if (true) {
                      return (
                        <Fragment key={index}>
                          {filter.description !== null ? (
                            <Tooltip
                              interactive
                              arrow
                              placement="right-start"
                              title={
                                <div className="filterTooltip">
                                  <p>{filter.description}</p>
                                </div>
                              }
                              key={`tooltip${index}`}
                            >
                              <ListItem
                                // className={classes.nested}
                                className={
                                  sidebarFiltersOpen[index].open
                                    ? "filterOpen"
                                    : "filterClose"
                                }
                                component="div"
                                onClick={() => toggleSidebarFilterItems(index)}
                              >
                                <ListItemText
                                  primary={
                                    <Typography variant="body2">
                                      {filter.name.toUpperCase()}
                                    </Typography>
                                  }
                                />
                                {sidebarFiltersOpen[index].open ? (
                                  <ExpandLess />
                                ) : (
                                  <ExpandMore />
                                )}
                              </ListItem>
                            </Tooltip>
                          ) : (
                            <ListItem
                              // className={classes.nested}
                              className={
                                sidebarFiltersOpen[index].open
                                  ? "filterOpen"
                                  : "filterClose"
                              }
                              component="div"
                              onClick={() => toggleSidebarFilterItems(index)}
                            >
                              <ListItemText
                                primary={
                                  <Typography variant="body2">
                                    {filter.name.toUpperCase()}
                                  </Typography>
                                }
                              />
                              {sidebarFiltersOpen[index].open ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMore />
                              )}
                            </ListItem>
                          )}

                          <Collapse
                            in={sidebarFiltersOpen[index].open}
                            timeout="auto"
                          >
                            <List component="div" disablePadding>
                              <ListItem
                                // className={classes.subNested}
                                // title={sidebarFilters[index].description}
                                component="div"
                              >
                                {filter.name.toUpperCase() ===
                                "COVER CROP TYPE" ? (
                                  <CoverCropType
                                    ref={coverCropTypeRef}
                                    filters={sidebarFilters[index]}
                                    sidebarFilterOptions={sidebarFilterOptions}
                                    setSidebarFilterOptions={
                                      setSidebarFilterOptions
                                    }
                                    resetAllFilters={resetAllFilters}
                                    {...props}
                                  />
                                ) : (
                                  ""
                                )}

                                {filter.name.toUpperCase() ===
                                "ENVIRONMENTAL TOLERANCES" ? (
                                  <EnvironmentalTolerance
                                    ref={envTolRef}
                                    filters={sidebarFilters[index]}
                                    sidebarFilterOptions={sidebarFilterOptions}
                                    setSidebarFilterOptions={
                                      setSidebarFilterOptions
                                    }
                                    resetAllFilters={resetAllFilters}
                                    {...props}
                                  />
                                ) : (
                                  ""
                                )}

                                {filter.name.toUpperCase() === "SEEDS" ? (
                                  <Seeds
                                    ref={seedsRef}
                                    filters={sidebarFilters[index]}
                                    sidebarFilterOptions={sidebarFilterOptions}
                                    setSidebarFilterOptions={
                                      setSidebarFilterOptions
                                    }
                                    resetAllFilters={resetAllFilters}
                                    {...props}
                                  />
                                ) : (
                                  ""
                                )}
                                {filter.name.toUpperCase() ===
                                "SEEDING METHODS" ? (
                                  <SeedingMethods
                                    ref={seedingMethodRef}
                                    filters={sidebarFilters[index]}
                                    sidebarFilterOptions={sidebarFilterOptions}
                                    setSidebarFilterOptions={
                                      setSidebarFilterOptions
                                    }
                                    resetAllFilters={resetAllFilters}
                                    {...props}
                                  />
                                ) : (
                                  ""
                                )}

                                {filter.name.toUpperCase() ===
                                "SOIL CONDITIONS" ? (
                                  <SoilConditions
                                    filters={sidebarFilters[index]}
                                    sidebarFilterOptions={sidebarFilterOptions}
                                    setSidebarFilterOptions={
                                      setSidebarFilterOptions
                                    }
                                    resetAllFilters={resetAllFilters}
                                    filterSidebarItems={filterSidebarItems}
                                    {...props}
                                  />
                                ) : (
                                  ""
                                )}

                                {filter.name.toUpperCase() === "GROWTH" ? (
                                  <Grid container spacing={1}>
                                    <Grid item>
                                      <Growth
                                        ref={growthRef}
                                        filters={sidebarFilters[index]}
                                        sidebarFilterOptions={
                                          sidebarFilterOptions
                                        }
                                        setSidebarFilterOptions={
                                          setSidebarFilterOptions
                                        }
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
                                        ref={rootsRef}
                                        filters={sidebarFilters[index]}
                                        sidebarFilterOptions={
                                          sidebarFilterOptions
                                        }
                                        setSidebarFilterOptions={
                                          setSidebarFilterOptions
                                        }
                                        resetAllFilters={resetAllFilters}
                                        {...props}
                                      />
                                    </Grid>
                                  </Grid>
                                ) : (
                                  ""
                                )}
                                {filter.name.toUpperCase() ===
                                "TERMINATION METHODS" ? (
                                  <TerminationMethods
                                    ref={terminationRef}
                                    filters={sidebarFilters[index]}
                                    sidebarFilterOptions={sidebarFilterOptions}
                                    setSidebarFilterOptions={
                                      setSidebarFilterOptions
                                    }
                                    resetAllFilters={resetAllFilters}
                                    {...props}
                                  />
                                ) : (
                                  ""
                                )}
                                {filter.name.toUpperCase() === "BENEFICIALS" ? (
                                  <Beneficials
                                    ref={beneficialsRef}
                                    filters={sidebarFilters[index]}
                                    sidebarFilterOptions={sidebarFilterOptions}
                                    setSidebarFilterOptions={
                                      setSidebarFilterOptions
                                    }
                                    resetAllFilters={resetAllFilters}
                                    {...props}
                                  />
                                ) : (
                                  ""
                                )}
                                {filter.name.toUpperCase() === "WEEDS" ? (
                                  <Weeds
                                    ref={weedsRef}
                                    filters={sidebarFilters[index]}
                                    sidebarFilterOptions={sidebarFilterOptions}
                                    setSidebarFilterOptions={
                                      setSidebarFilterOptions
                                    }
                                    resetAllFilters={resetAllFilters}
                                    {...props}
                                  />
                                ) : (
                                  ""
                                )}
                                {/* code at end of page */}
                                {filter.name.toUpperCase() ===
                                "DISEASE & NON WEED PESTS"
                                  ? ""
                                  : ""}
                              </ListItem>
                            </List>
                          </Collapse>
                        </Fragment>
                      );
                    }
                  })}
                </List>
              </Collapse>
            </Fragment>
          ) : (
            ""
          )}
        </List>
      </div>
    </div>
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

// <DiseaseAndNonWeedPests
//   ref={diseaseRef}
//   filters={sidebarFilters[index]}
//   sidebarFilterOptions={sidebarFilterOptions}
//   setSidebarFilterOptions={
//     setSidebarFilterOptions
//   }
//   resetAllFilters={resetAllFilters}
//   {...props}
// />
