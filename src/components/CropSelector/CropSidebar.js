/*
  This file contains the CropSidebar and its styles
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
  useState,
} from "react";
import { arrayMove, List as ListMovable } from "react-movable";
import { CustomStyles } from "../../shared/constants";
// import filterData from "../../shared/sidebar-dictionary.json";
import { Context } from "../../store/Store";
import "../../styles/cropSidebar.scss";
import ComparisonBar from "../MyCoverCropList/ComparisonBar/ComparisonBar";
import DateRangeDialog from "./DateRangeDialog";
import ForwardFilter from "./Filters/ForwardFilter";
import sidebarCategoriesData from "../../shared/json/sidebar/sidebar-categories.json";
import sidebarFiltersData from "../../shared/json/sidebar/sidebar-filters.json";
// import SoilConditions from "./Filters/SoilConditions";  // TODO May be obsolete???  rh

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
    cropDataChanged,
    setGrowthWindow,
    toggleComparisonView,
    toggleListView,
    clearCoverCropSearch,
    style,
  } = props;
  const classes = useStyles();
  const {state, dispatch, change} = useContext(Context);
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

  const dateRangeModalOpen = () => {
    setDateRangeOpen(true);
  };

  // make an exhaustive array of all params in array e.g. cover crop group and use includes in linq
  const [sidebarFilterOptions, setSidebarFilterOptions] = useState(() => {
    const sidebarStarter = {};
    sidebarFiltersData.forEach((row) => (sidebarStarter[row.name] = []));
    return sidebarStarter;
  });

  const [resetFilters, setResetFilters] = useState(false);

  useEffect(() => {
    const filterSidebarItems = () => {
      // Object.keys(sidebarFilterOptions).forEach(key => sidebarFilterOptions[key] = []);

      const sfo = {};

      Object.keys(state.filters).forEach(key => {
        if (state.filters[key]) {
          const [k, value] = key.split(': ');
          if (value) {
            sfo[k] = sfo[k] || [];
            sfo[k].push(+value || value);
          }
        }
      });

      let crop_data = state.cropData.filter(
        (crop) => crop.fields["Zone Decision"] === "Include"
      );

      let search = state.cropSearch.toLowerCase().match(/\w+/g);

      crop_data = state.cropData.filter((crop) => {
        const match = (parm) => {
          const m = crop.fields[parm].toLowerCase().match(/\w+/g);
  
          return !search || search.every((s) => m.some((t) => t.includes(s)));
        };
  
        return match('Cover Crop Name') || match('Scientific Name');
      });

      const nonZeroKeys2 = Object.keys(sfo).map((key) => {
        if (sfo[key].length !== 0) {
          return { [key]: sfo[key] };
        } else {
          return '';
        }
      });

      console.log(JSON.stringify(sfo));
      console.log(JSON.stringify(nonZeroKeys2));

      // const nonZeroKeys = nonZeroKeys2.map((obj) => {
      //   return Object.keys(obj).toString();
      // });
  
      // dispatch({
      //   type: 'UPDATE_FILTER_KEYS',
      //   data: {
      //     filterKeys: nonZeroKeys,
      //   },
      // });
  
      let growthArray = [];

      if (state.filters['Active Growth Period: Fall']) {
        growthArray.push('Sep', 'Oct', 'Nov');
      }
      if (state.filters['Active Growth Period: Winter']) {
        growthArray.push('Dec', 'Jan', 'Feb');
      }
      if (state.filters['Active Growth Period: Spring']) {
        growthArray.push('Mar', 'Apr', 'May');
      }
      if (state.filters['Active Growth Period: Summer']) {
        growthArray.push('Jun', 'Jul', 'Aug');
      }

      dispatch({
        type: 'UPDATE_ACTIVE_GROWTH_PERIOD',
        data: {
          activeGrowthPeriod: growthArray,
        },
      });
  
      const arrayKeys = [
        'Duration',
        'Active Growth Period',
        'Winter Survival',
        'Flowering Trigger',
        'Root Architecture',
      ];
      const booleanKeys = ['Aerial Seeding', 'Frost Seeding'];

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
          } else if (vals.includes(crop.fields[key])) {
            i++;
          }
        });

        return i === totalActiveFilters;
      });

      dispatch({
        type: 'UPDATE_ACTIVE_CROP_DATA',
        data: {
          value: filtered,
        },
      });
      return crop_data;
    } // filterSidebarItems();

    filterSidebarItems();
  }, [sidebarFilterOptions, state.cropSearch, state.cropData, dispatch, state.filters]);

  const areCommonElements = (arr1, arr2) => {
    const arr2Set = new Set(arr2);
    return arr1.some((el) => arr2Set.has(el));
  };

  const [filtersSelected, setFiltersSelected] = useState(false);
  useEffect(() => {
    setFiltersSelected(
      Object.keys(state.filters).some(key => state.filters[key])
    );
  }, [sidebarFilterOptions, state.filters]);

  useEffect(() => {
    if (isListView) {
      setCropFiltersOpen(true);
      setCashCropOpen(false);
    } else {
      setCropFiltersOpen(false);
      setCashCropOpen(true);
    }
  }, [isListView]);

  const resetAllFilters = (withRef = true) => {
    change('CLEAR_FILTERS');
    return;

    if (withRef) {
      dispatch({
        type: "UPDATE_ACTIVE_CROP_DATA",
        data: {
          value: state.cropData,
        },
      });
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
            if (category.name === "Cover Crop Type") {
              const data = sidebarFiltersData.filter(
                (dictFilter) => dictFilter.__id === category.filters[0]
              )[0];

              newCategory.values = [{
                name: data.name,
                alternateName: data.dataDictionaryName,
                symbol: null,
                maxSize: data.maxSize,
                values: data.values.split(/\s*,\s*/),
              }];
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
  }, [
    state.zone,
    state.zone4Dictionary,
    state.zone5Dictionary,
    state.zone6Dictionary,
    state.zone7Dictionary,
  ]);

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

  const Filter = (Component, filter) => {
    return (
      <Grid container spacing={1}>
        <Grid item>
          <Component
            filters={filter}
            sidebarFilterOptions={sidebarFilterOptions}
            setSidebarFilterOptions={setSidebarFilterOptions}
            resetAllFilters={resetAllFilters}
            {...props}
          />
        </Grid>
      </Grid>
    )
  } // Filter

  const output = (filter) => {
    return Filter(ForwardFilter, filter);  // SoilConditions???
  } // output

  const filters = () => (
    sidebarFilters.map((filter, index) => {
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
                  state.sidebarFiltersOpen[index]
                    ? "filterOpen"
                    : "filterClose"
                }
                component="div"
                onClick={(e) => change('SIDEBAR_TOGGLE', e, index)}
              >
                <ListItemText
                  primary={
                    <Typography variant="body2">
                      {filter.name.toUpperCase()}
                    </Typography>
                  }
                />
                {state.sidebarFiltersOpen[index] ? (
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
                state.sidebarFiltersOpen[index]
                  ? "filterOpen"
                  : "filterClose"
              }
              component="div"
              onClick={(e) => change('SIDEBAR_TOGGLE', e, index)}
            >
              <ListItemText
                primary={
                  <Typography variant="body2">
                    {filter.name.toUpperCase()}
                  </Typography>
                }
              />
              {state.sidebarFiltersOpen[index] ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </ListItem>
          )}

          <Collapse
            in={state.sidebarFiltersOpen[index]}
            timeout="auto"
          >
            <List component="div" disablePadding>
              <ListItem
                // className={classes.subNested}
                // title={filter.description}
                component="div"
              >
                {output(filter)}
              </ListItem>
            </List>
          </Collapse>
        </Fragment>
      );
    })
  ); // filters

  const filtersList = () => (
    <List component="div" disablePadding className="cropFilters">
      {filtersSelected ? (
        <ListItem>
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
      {filters()}
    </List>
  ); // filterList

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
          <div className="col-12" id="Filters">
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
                          value={state.cropSearch}
                          onChange={(e) => change('CROP_SEARCH', e)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={clearCoverCropSearch}
                                  size="small"
                                >
                                  {state.cropSearch.length > 0 && <Clear fontSize="inherit" />}
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
                              <Button onClick={() => changeProgress("decrement")}>
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
                                          cursor: isDragged ? "grabbing" : "grab",
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
                        <ListItem button onClick={(e) => change('ZONE_TOGGLE', e, !state.zoneToggle)}>
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
                          {state.zoneToggle ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                      </List>
                      <Collapse in={state.zoneToggle}>
                        <List component="div" disablePadding>
                          <ListItem component="div">
                            <Grid container spacing={1}>
                              {[4, 5, 6, 7].map((zone, index) => (
                                <Grid item key={index}>
                                  <Chip
                                    onClick={(e) => change('UPDATE_ZONE', e, {zoneText: `Zone ${zone}`, zone: zone})}
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
                            value={state.cropSearch}
                            onChange={(e) => change('CROP_SEARCH', e)}
                          />
                        </ListItemText>
                      </ListItem>
                    </Fragment>
                  ) : (
                    ""
                  )}

                  {from === 'explorer' ?
                    filtersList()
                    : (
                    <>
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
                        {filtersList()}
                      </Collapse>
                    </>
                  )}
                </Fragment>
              ) : (
                ''
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
