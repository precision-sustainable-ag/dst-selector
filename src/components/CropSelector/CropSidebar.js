/*
  This file contains the CropSidebar and it's styles
  The CropSidebar is the sidebar which contains the filtering and calendar view components
  Styles are created using makeStyles
*/

import {
  Button,
  Checkbox,
  Chip,
  Collapse,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  makeStyles,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  CalendarToday,
  CalendarTodayRounded,
  Clear,
  Compare,
  ExpandLess,
  ExpandMore,
} from "@material-ui/icons";
import ListIcon from "@material-ui/icons/List";
import moment from "moment";
import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { arrayMove, List as ListMovable } from "react-movable";
import { CustomStyles } from "../../shared/constants";
// import filterData from "../../shared/sidebar-dictionary.json";
import { Context } from "../../store/Store";
import "../../styles/cropSidebar.scss";
import ComparisonBar from "../MyCoverCropList/ComparisonBar/ComparisonBar";
import DateRangeDialog from "./DateRangeDialog";
import CoverCropType from "./Filters/CoverCropType";
import EnvironmentalTolerance from "./Filters/EnvironmentalTolerance";
import Growth from "./Filters/Growth";
import Roots from "./Filters/Roots";
import SeedingMethods from "./Filters/SeedingMethods";
import Seeds from "./Filters/Seeds";
import SoilConditions from "./Filters/SoilConditions";
import TerminationMethods from "./Filters/TerminationMethods";
import Weeds from "./Filters/Weeds";
import sidebarCategoriesData from "../../shared/json/sidebar/sidebar-categories.json";
import sidebarFiltersData from "../../shared/json/sidebar/sidebar-filters.json";

const _ = require("lodash");

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
  },
  nested: {
    paddingLeft: theme.spacing(3),
  },
  subNested: {
    paddingLeft: theme.spacing(4),
  },
}));

const CropSidebarComponent = (props) => {
  let {
    comparisonView,
    isListView,
    from,
    cropData,
    setActiveCropData,
    setInactiveCropData,
    cropDataChanged,
    setGrowthWindow,
    toggleComparisonView,
    toggleListView,
    coverCropName,
    covercropsNamesFilter,
    clearCoverCropSearch,
    style,
    searchValue,
    handleSearchChange,
  } = props;
  const classes = useStyles();
  const [state, dispatch] = useContext(Context);
  const [loading, setLoading] = useState(true);

  const [cropFiltersOpen, setCropFiltersOpen] = useState(
    isListView ? true : false
  );
  const [showFilters, setShowFilters] = useState(
    window.location.pathname === "/"
      ? from === "table"
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
      if (from === "table") {
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
  }, [state.speciesSelectorActivationFlag, from, comparisonView]);

  const [cashCropOpen, setCashCropOpen] = useState(false);
  const [cashCropVisible, setCashCropVisible] = useState(true);
  const [goalsOpen, setGoalsOpen] = useState(true);

  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const [sidebarFilters, setSidebarFilters] = useState([]);
  const [sidebarFiltersOpen, setSidebarFiltersOpen] = useState([]);

  const dateRangeModalOpen = () => {
    setDateRangeOpen(true);
  };

  // make an exhaustive array of all params in array e.g. cover crop group and use includes in linq

  const [sidebarFilterOptions, setSidebarFilterOptions] = useState(() => {
    const sidebarStarter = {};
    sidebarFiltersData.forEach((row) => (sidebarStarter[row.name] = []));
    return sidebarStarter;
  });
  const seedingMethodRef = useRef();
  const coverCropTypeRef = useRef();
  const growthRef = useRef();
  const rootsRef = useRef();
  const seedsRef = useRef();
  const weedsRef = useRef();
  const terminationRef = useRef();
  const envTolRef = useRef();

  const [resetFilters, setResetFilters] = useState(false);
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    filterSidebarItems();
  }, [sidebarFilterOptions]);

  const filterSidebarItems = () => {
    const crop_data = cropData.filter(
      (crop) => crop.fields["Zone Decision"] === "Include"
    );

    const nonZeroes = Object.keys(sidebarFilterOptions).map((key) => {
      if (sidebarFilterOptions[key].length !== 0) {
        return { [key]: sidebarFilterOptions[key] };
      } else return "";
    });
    const nonZeroKeys2 = nonZeroes.filter((val) => val !== "");

    const nonZeroKeys = nonZeroKeys2.map((obj) => {
      return Object.keys(obj).toString();
    });

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
      const arrayKeys = [
        "Duration",
        "Active Growth Period",
        "Winter Survival",
        "Flowering Trigger",
        "Root Architecture",
      ];
      const booleanKeys = ["Aerial Seeding", "Frost Seeding"];

      const filtered = crop_data.filter((crop) => {
        const totalActiveFilters = Object.keys(nonZeroKeys2).length;
        let i = 0;
        nonZeroKeys2.forEach((keyObject) => {
          const key = Object.keys(keyObject);
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

        return i === totalActiveFilters;
      });

      const inactives = crop_data.filter((e) => !filtered.includes(e));

      setActiveCropData(filtered);
      setInactiveCropData(inactives);
    } else {
      setActiveCropData(crop_data);
      setInactiveCropData([]);
    }
  };
  const areCommonElements = (arr1, arr2) => {
    const arr2Set = new Set(arr2);
    return arr1.some((el) => arr2Set.has(el));
  };

  const [filtersSelected, setFiltersSelected] = useState(false);
  useEffect(() => {
    const sidebarKeys = Object.keys(sidebarFilterOptions);

    const nonZeroKeys = sidebarKeys.filter(function (key) {
      return sidebarFilterOptions[key].length > 0;
    });

    if (nonZeroKeys.length === 0) setFiltersSelected(false);
    else setFiltersSelected(true);
  }, [sidebarFilterOptions]);

  useEffect(() => {
    if (isListView) {
      setCropFiltersOpen(true);
      setCashCropOpen(false);
    } else {
      setCropFiltersOpen(false);
      setCashCropOpen(true);
    }
  }, [isListView]);

  const toggleSidebarFilterItems = (index) => {
    const newSidebarFiltersOpen = sidebarFiltersOpen.map((obj, index2) => {
      if (index2 === index) return { ...obj, open: !obj.open };
      else return { ...obj };
    });
    setSidebarFiltersOpen(newSidebarFiltersOpen);
  };

  const resetAllFilters = (withRef = true) => {
    if (withRef) {
      coverCropTypeRef.current.resetFilters();
      envTolRef.current.resetFilters();
      growthRef.current.resetFilters();
      rootsRef.current.resetFilters();
      seedingMethodRef.current.resetFilters();

      seedsRef.current.resetFilters();
      terminationRef.current.resetFilters();
      weedsRef.current.resetFilters();
      setActiveCropData(state.cropData);
      setInactiveCropData([]);
    }
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
    let dictionary = [];

    const generateSidebarObject = async (dataDictionary) => {
      sidebarCategoriesData.forEach((category) => {
        let newCategory = {};
        newCategory["name"] = category.name;
        newCategory["description"] = category.description;
        newCategory["type"] = category.type;
        switch (category.type) {
          case "rating-only":
            newCategory["values"] = category.filters.map((f) => {
              const data = sidebarFiltersData.filter(
                (dictFilter) => dictFilter.__id === f
              )[0];

              let obj = {
                name: data.name,
                alternateName: data.dataDictionaryName,
                symbol: data.symbol,
                maxSize: data.maxSize,
              };

              const field = dataDictionary.filter(
                (item) => item.Variable === data.dataDictionaryName
              );

              const description = field[0]["Description"];
              const valuesDescription = field[0]["Values Description"];

              obj["description"] = `${description}${
                valuesDescription ? " <br><br>" : ""
              }${valuesDescription ? valuesDescription : ""}`;
              return obj;
            });
            break;
          case "chips-only":
            if (category.name !== "Seeding Methods") {
              const data = sidebarFiltersData.filter(
                (dictFilter) => dictFilter.__id === category.filters[0]
              )[0];

              newCategory["values"] = data.values
                .split(/\s+/)
                .join("")
                .split(",")
                .map((val) => {
                  return { name: val };
                });
            } else {
              newCategory["description"] = null;
              newCategory["values"] = category.filters.map((f) => {
                const data = sidebarFiltersData.filter(
                  (dictFilter) => dictFilter.__id === f
                )[0];

                let obj = {
                  name: data.name,
                  alternateName: data.dataDictionaryName,
                  symbol: null,
                  maxSize: data.maxSize,
                  values: [data.values],
                };

                const field = dataDictionary.filter(
                  (item) => item.Variable === data.dataDictionaryName
                );

                const description = field[0]["Description"];
                const valuesDescription = field[0]["Values Description"];

                obj["description"] = `${description}${
                  valuesDescription ? "<br><br>" : ""
                }${valuesDescription ? valuesDescription : ""}`;
                return obj;
              });
            }
            break;
          case "chips-rating":
            newCategory["values"] = category.filters.map((f) => {
              const data = sidebarFiltersData.filter(
                (dictFilter) => dictFilter.__id === f
              )[0];
              let obj = {
                name: data.name,
                type: data.type,
                maxSize: null,
                description: "",
              };

              if (data.type === "chip") {
                obj["values"] = data.values.split(",").map((val) => val.trim());
              } else if (data.type === "rating") {
                obj["values"] = [];
                obj["maxSize"] = data.maxSize;
              }

              const field = dataDictionary.filter(
                (item) => item.Variable === data.dataDictionaryName
              );

              const description = field[0]["Description"];
              const valuesDescription = field[0]["Values Description"];

              obj["description"] = `${description}${
                valuesDescription ? "<br><br>" : ""
              }${valuesDescription ? valuesDescription : ""}`;
              return obj;
            });
            break;
          default:
            break;
        }

        dictionary.push(newCategory);
      });
    };

    const setData = async () => {
      setSidebarFilters(dictionary);
      const filterTitles = dictionary.map((filter) => {
        return { name: filter.name, open: false };
      });
      setSidebarFiltersOpen(filterTitles);
    };

    switch (state.zone) {
      case 7:
        setLoading(true);
        generateSidebarObject(state.zone7Dictionary)
          .then(() => setData())
          .then(() => setLoading(false));
        break;
      case 6:
        setLoading(true);
        generateSidebarObject(state.zone6Dictionary)
          .then(() => setData())
          .then(() => setLoading(false));
        break;
      case 5:
        setLoading(true);
        generateSidebarObject(state.zone5Dictionary)
          .then(() => setData())
          .then(() => setLoading(false));
        break;
      case 4:
        setLoading(true);
        generateSidebarObject(state.zone4Dictionary)
          .then(() => setData())
          .then(() => setLoading(false));
        break;
      default:
        break;
    }

    return () => {
      setSidebarFilters([]);
      setSidebarFiltersOpen([]);
    };
  }, [
    state.zone,
    state.zone4Dictionary,
    state.zone5Dictionary,
    state.zone6Dictionary,
    state.zone7Dictionary,
  ]);

  useMemo(() => {
    if (envTolRef.current) {
      resetAllFilters();
    }
  }, [cropDataChanged]);

  const [zoneToggle, setZoneToggle] = useState(true);

  const handleZoneToggle = () => {
    setZoneToggle(!zoneToggle);
  };

  const handleZone = (zone = 7) => {
    if (typeof zone === "number") {
      dispatch({
        type: "UPDATE_ZONE",
        data: {
          zoneText: `Zone ${zone}`,
          zone: parseInt(zone),
        },
      });
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
    if (from === "table") {
      if (dateRange.startDate !== null && dateRange.endDate !== null) {
        dispatch({
          type: "UPDATE_DATE_RANGE",
          data: {
            startDate: moment(
              new Date(dateRange.startDate).toISOString(),
              "YYYY-MM-DD"
            ).format("YYYY-MM-DD"),
            endDate: moment(new Date(dateRange.endDate).toISOString()).format(
              "YYYY-MM-DD"
            ),
          },
        });
      }

      setGrowthWindow(true);
    }
  }, [dateRange, from, setGrowthWindow, dispatch]);

  const [tableHeight, setTableHeight] = useState(0);

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
  }, []);

  useEffect(() => {
    if (state.cashCropData.dateRange.startDate !== "") {
      window.localStorage.setItem(
        "cashCropDateRange",
        JSON.stringify(state.cashCropData.dateRange)
      );
    }
  }, [state.cashCropData.dateRange]);

  useEffect(() => {
    if (state.myCoverCropActivationFlag) {
      if (comparisonView) {
        if (filtersSelected) {
          resetAllFilters(false);
        }
      }
    }
  }, [comparisonView, state.myCoverCropActivationFlag]);

  if (!loading) {
    return from === "myCoverCropListStatic" ? (
      <div className="row">
        <div className="col-12 mb-3">
          <Button
            className="dynamicToggleBtn"
            fullWidth
            variant="contained"
            onClick={toggleComparisonView}
            size="large"
            color="secondary"
            startIcon={
              comparisonView ? (
                <ListIcon style={{ fontSize: "larger" }} />
              ) : (
                <Compare style={{ fontSize: "larger" }} />
              )
            }
          >
            {comparisonView ? "LIST VIEW" : "COMPARISON VIEW"}
          </Button>
        </div>
        {comparisonView ? (
          <div className="col-12">
            <ComparisonBar
              {...props}
              classes={classes}
              filterData={sidebarFilters}
              goals={state.selectedGoals.length > 0 ? state.selectedGoals : []}
              comparisonKeys={state.comparisonKeys}
              dispatch={dispatch}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    ) : (
      <div className="row">
        {state.myCoverCropActivationFlag && from === "table" ? (
          <div
            className={`col-12 ${
              !state.speciesSelectorActivationFlag ? `mb-3` : ``
            }`}
            style={
              state.speciesSelectorActivationFlag
                ? {
                    paddingBottom: tableHeight,
                  }
                : {}
            }
          >
            {/* <div className="iconToggle"> */}
            <Button
              className="dynamicToggleBtn"
              fullWidth
              variant="contained"
              onClick={toggleComparisonView}
              size="large"
              color="secondary"
              startIcon={
                comparisonView ? (
                  <ListIcon style={{ fontSize: "larger" }} />
                ) : (
                  <Compare style={{ fontSize: "larger" }} />
                )
              }
            >
              {comparisonView ? "LIST VIEW" : "COMPARISON VIEW"}
            </Button>
          </div>
        ) : from === "table" ? (
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
              onClick={toggleListView}
              size="large"
              color="secondary"
              startIcon={
                isListView ? (
                  <CalendarToday style={{ fontSize: "larger" }} />
                ) : (
                  <ListIcon style={{ fontSize: "larger" }} />
                )
              }
            >
              {isListView ? "CALENDAR VIEW" : "LIST VIEW"}
            </Button>
          </div>
        ) : (
          ""
        )}

        {state.speciesSelectorActivationFlag || from === "explorer" ? (
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
              {from === "table" ? (
                <Fragment>
                  {showFilters &&
                  state.speciesSelectorActivationFlag &&
                  isListView ? (
                    <ListItem>
                      <ListItemText>
                        <TextField
                          fullWidth
                          color="secondary"
                          label="Cover Crop Name"
                          helperText="Search by cover crop name"
                          value={coverCropName}
                          onInput={covercropsNamesFilter}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={clearCoverCropSearch}
                                  size="small"
                                >
                                  {coverCropName.length > 1 ? (
                                    <Clear fontSize="inherit" />
                                  ) : (
                                    ""
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </ListItemText>
                    </ListItem>
                  ) : (
                    ""
                  )}

                  {isListView ? (
                    <Fragment>
                      {" "}
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
                              <Button
                                onClick={() => changeProgress("decrement")}
                              >
                                click to edit
                              </Button>
                            </ListItem>
                          </List>
                        ) : (
                          <Fragment>
                            <List component="div" disablePadding>
                              <ListItem className={classes.nested}>
                                <ListItemText
                                  primary={
                                    <div>
                                      <div>
                                        <Typography variant="body1">
                                          {" "}
                                          Goal Priority Order
                                        </Typography>
                                      </div>
                                      <div>
                                        <Typography
                                          variant="body2"
                                          style={{
                                            fontWeight: "normal",
                                            fontSize: "10pt",
                                          }}
                                        >
                                          Click & drag to reorder
                                        </Typography>
                                      </div>
                                    </div>
                                  }
                                />
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
                              renderItem={({
                                value,
                                props,
                                isDragged,
                                isSelected,
                                index,
                              }) => (
                                <li
                                  {...props}
                                  style={{
                                    ...style,
                                  }}
                                >
                                  <div className="d-flex w-100 flex-row justify-content-between align-items-center">
                                    <div>
                                      <Typography
                                        variant="body1"
                                        style={{
                                          cursor: isDragged
                                            ? "grabbing"
                                            : "grab",
                                          fontSize: "10pt",
                                          fontWeight:
                                            isDragged || isSelected
                                              ? "700"
                                              : "normal",
                                          color: "#48a8ab",
                                          width: "100%",
                                        }}
                                      >
                                        {`${index + 1}. ${value}`}
                                      </Typography>
                                    </div>
                                  </div>
                                </li>
                              )}
                            />

                            <ListItem className={classes.nested}>
                              <ListItemText disableTypography>
                                <Typography
                                  variant="button"
                                  className="text-uppercase text-left text-danger font-weight-bold"
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
                    </Fragment>
                  ) : (
                    ""
                  )}

                  <ListItem
                    button
                    onClick={() => handleClick(1)}
                    style={
                      cashCropOpen
                        ? { backgroundColor: CustomStyles().lightGreen }
                        : { backgroundColor: "inherit" }
                    }
                  >
                    <ListItemText primary="PREVIOUS CASH CROP" />
                    {cashCropOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={cashCropOpen} timeout="auto" unmountOnExit>
                    <List component="div">
                      <ListItem className={classes.nested}>
                        <TextField
                          fullWidth
                          label="Previous Cash Crop"
                          id="outlined-margin-dense"
                          defaultValue=""
                          margin="dense"
                          variant="outlined"
                        />
                      </ListItem>
                      <ListItem className={classes.nested}>
                        <TextField
                          label="Planting to Harvest"
                          value={`${
                            state.cashCropData.dateRange.startDate
                              ? moment(
                                  state.cashCropData.dateRange.startDate
                                ).format("MM/D")
                              : ""
                          } - ${
                            state.cashCropData.dateRange.endDate
                              ? moment(
                                  state.cashCropData.dateRange.endDate
                                ).format("MM/D")
                              : ""
                          }`}
                          fullWidth
                          onClick={() => dateRangeModalOpen()}
                          margin="dense"
                          aria-haspopup="true"
                          variant="outlined"
                          InputProps={{
                            readOnly: true,
                            endAdornment: (
                              <InputAdornment>
                                <IconButton
                                  size="small"
                                  onClick={() => dateRangeModalOpen()}
                                >
                                  <CalendarTodayRounded />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </ListItem>
                      <ListItem className={classes.nested}>
                        <FormGroup>
                          <FormControlLabel
                            classes={{ root: classes.formControlLabel }}
                            control={
                              <Checkbox
                                checked={cashCropVisible}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    let cashCropDateRange = JSON.parse(
                                      window.localStorage.getItem(
                                        "cashCropDateRange"
                                      )
                                    );
                                    dispatch({
                                      type: "UPDATE_DATE_RANGE",
                                      data: {
                                        startDate: cashCropDateRange.startDate,
                                        endDate: cashCropDateRange.endDate,
                                      },
                                    });
                                  } else {
                                    dispatch({
                                      type: "UPDATE_DATE_RANGE",
                                      data: {
                                        startDate: "",
                                        endDate: "",
                                      },
                                    });
                                  }
                                  setCashCropVisible(!cashCropVisible);
                                }}
                                value="Show Cash Crop Growth Window"
                              />
                            }
                            label={
                              <Typography variant="body2">
                                Show Previous Cash Crop Growth Window
                              </Typography>
                            }
                          />
                        </FormGroup>
                      </ListItem>
                    </List>
                  </Collapse>
                  {dateRangeOpen ? (
                    <DateRangeDialog
                      open={dateRangeOpen}
                      close={() => setDateRangeOpen(!dateRangeOpen)}
                      onChange={(range) => setDateRange(range)}
                      range={[]}
                    />
                  ) : (
                    ""
                  )}
                </Fragment>
              ) : (
                ""
              )}

              {showFilters ? (
                <Fragment>
                  {from === "explorer" ? (
                    <Fragment>
                      <List component="div" disablePadding>
                        <ListItem button onClick={handleZoneToggle}>
                          <ListItemText
                            primary={
                              <Typography
                                variant="body2"
                                className="text-uppercase"
                              >
                                Plant Hardiness Zone
                              </Typography>
                            }
                          />
                          {zoneToggle ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                      </List>
                      <Collapse in={zoneToggle}>
                        <List component="div" disablePadding>
                          <ListItem component="div">
                            <Grid container spacing={1}>
                              {[4, 5, 6, 7].map((zone, index) => (
                                <Grid item key={index}>
                                  <Chip
                                    onClick={() => handleZone(zone)}
                                    component="li"
                                    size="medium"
                                    label={`Zone ${zone}`}
                                    color={
                                      parseInt(state.zone) === zone
                                        ? "primary"
                                        : "secondary"
                                    }
                                  />
                                </Grid>
                              ))}
                            </Grid>
                          </ListItem>
                        </List>
                      </Collapse>
                      <ListItem>
                        <ListItemText>
                          <TextField
                            fullWidth
                            color="secondary"
                            label="Cover Crop Name"
                            helperText="Search by cover crop name"
                            value={searchValue}
                            onChange={handleSearchChange}
                          />
                        </ListItemText>
                      </ListItem>
                    </Fragment>
                  ) : (
                    ""
                  )}

                  {from === "explorer" ? (
                    <List
                      component="div"
                      disablePadding
                      className="cropFilters"
                    >
                      {filtersSelected ? (
                        <ListItem onClick={() => {}}>
                          <ListItemText
                            primary={
                              <Typography
                                variant="button"
                                className="text-uppercase text-left text-danger font-weight-bold"
                                onClick={resetAllFilters}
                                style={{ cursor: "pointer" }}
                              >
                                Clear Filters
                              </Typography>
                            }
                          />
                        </ListItem>
                      ) : (
                        <ListItem></ListItem>
                      )}

                      {sidebarFilters.map((filter, index) => {
                        if (
                          filter.name !== "Soil Conditions" &&
                          filter.name !== "Disease & Non Weed Pests"
                        ) {
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
                                    onClick={() =>
                                      toggleSidebarFilterItems(index)
                                    }
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
                                  onClick={() =>
                                    toggleSidebarFilterItems(index)
                                  }
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
                                        sidebarFilterOptions={
                                          sidebarFilterOptions
                                        }
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
                                        sidebarFilterOptions={
                                          sidebarFilterOptions
                                        }
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
                                        sidebarFilterOptions={
                                          sidebarFilterOptions
                                        }
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
                                        sidebarFilterOptions={
                                          sidebarFilterOptions
                                        }
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
                                        sidebarFilterOptions={
                                          sidebarFilterOptions
                                        }
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
                                        sidebarFilterOptions={
                                          sidebarFilterOptions
                                        }
                                        setSidebarFilterOptions={
                                          setSidebarFilterOptions
                                        }
                                        resetAllFilters={resetAllFilters}
                                        {...props}
                                      />
                                    ) : (
                                      ""
                                    )}
                                    {filter.name.toUpperCase() === "BENEFICIALS"
                                      ? ""
                                      : ""}
                                    {filter.name.toUpperCase() === "WEEDS" ? (
                                      <Weeds
                                        ref={weedsRef}
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
                        } else return <Fragment />;
                      })}
                    </List>
                  ) : (
                    <Fragment>
                      <ListItem
                        button
                        onClick={() => handleClick(2)}
                        style={
                          from === "table"
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
                        <List
                          component="div"
                          disablePadding
                          className="cropFilters"
                        >
                          {filtersSelected ? (
                            <ListItem onClick={() => {}}>
                              <ListItemText
                                primary={
                                  <Typography
                                    variant="button"
                                    className="text-uppercase text-left text-danger font-weight-bold"
                                    onClick={resetAllFilters}
                                    style={{ cursor: "pointer" }}
                                  >
                                    Clear Filters
                                  </Typography>
                                }
                              />
                            </ListItem>
                          ) : (
                            <ListItem></ListItem>
                          )}

                          {sidebarFilters.map((filter, index) => {
                            if (
                              filter.name !== "Soil Conditions" &&
                              filter.name !== "Disease & Non Weed Pests"
                            ) {
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
                                        onClick={() =>
                                          toggleSidebarFilterItems(index)
                                        }
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
                                      className={
                                        sidebarFiltersOpen[index].open
                                          ? "filterOpen"
                                          : "filterClose"
                                      }
                                      component="div"
                                      onClick={() =>
                                        toggleSidebarFilterItems(index)
                                      }
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
                                            sidebarFilterOptions={
                                              sidebarFilterOptions
                                            }
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
                                            sidebarFilterOptions={
                                              sidebarFilterOptions
                                            }
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
                                        "SEEDS" ? (
                                          <Seeds
                                            ref={seedsRef}
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
                                        ) : (
                                          ""
                                        )}
                                        {filter.name.toUpperCase() ===
                                        "SEEDING METHODS" ? (
                                          <SeedingMethods
                                            ref={seedingMethodRef}
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
                                        ) : (
                                          ""
                                        )}

                                        {filter.name.toUpperCase() ===
                                        "SOIL CONDITIONS" ? (
                                          <SoilConditions
                                            filters={sidebarFilters[index]}
                                            sidebarFilterOptions={
                                              sidebarFilterOptions
                                            }
                                            setSidebarFilterOptions={
                                              setSidebarFilterOptions
                                            }
                                            resetAllFilters={resetAllFilters}
                                            filterSidebarItems={
                                              filterSidebarItems
                                            }
                                            {...props}
                                          />
                                        ) : (
                                          ""
                                        )}

                                        {filter.name.toUpperCase() ===
                                        "GROWTH" ? (
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
                                                resetAllFilters={
                                                  resetAllFilters
                                                }
                                                {...props}
                                              />
                                            </Grid>
                                          </Grid>
                                        ) : (
                                          ""
                                        )}
                                        {filter.name.toUpperCase() ===
                                        "ROOTS" ? (
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
                                                resetAllFilters={
                                                  resetAllFilters
                                                }
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
                                            sidebarFilterOptions={
                                              sidebarFilterOptions
                                            }
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
                                        "BENEFICIALS"
                                          ? ""
                                          : ""}
                                        {filter.name.toUpperCase() ===
                                        "WEEDS" ? (
                                          <Weeds
                                            ref={weedsRef}
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
                            } else {
                              return <Fragment />;
                            }
                          })}
                        </List>
                      </Collapse>
                    </Fragment>
                  )}
                </Fragment>
              ) : (
                ""
              )}
            </List>
          </div>
        ) : (
          <div className="col-12">
            <ComparisonBar
              {...props}
              classes={classes}
              filterData={sidebarFilters}
              goals={state.selectedGoals.length > 0 ? state.selectedGoals : []}
              comparisonKeys={state.comparisonKeys}
              dispatch={dispatch}
            />
          </div>
        )}
      </div>
    );
  } else return <Fragment />;
};

export default CropSidebarComponent;
