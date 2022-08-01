/*
  Unused
*/

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
  Checkbox,
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
import SidebarFilters from "./SidebarFilters";
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
    borderTopLeftRadius: CustomStyles().semiRoundedRadius,
    borderTopRightRadius: CustomStyles().semiRoundedRadius,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  subNested: {
    paddingLeft: theme.spacing(5),
  },
}));

const CropSidebarComponent = (props) => {
  const classes = useStyles();
  const [state, dispatch] = React.useContext(Context);
  const [cropFiltersOpen, setCropFiltersOpen] = React.useState(false);
  const [cashCropOpen, setCashCropOpen] = React.useState(false);
  const [goalsOpen, setGoalsOpen] = React.useState(true);

  const [dateRangeOpen, setDateRangeOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState({
    startDate: null,
    endDate: null,
  });

  const [filtersObjectOpen, setFiltersObjectOpen] = React.useState({
    Taxonomy: false,
    "Environmental Tolerances": false,
    "Basic Agronomics": false,
    "Soil Conditions": false,
    Growth: false,
    Planting: false,
    Termination: false,
    "Grazers & Pollinators": false,
    Weeds: false,
    "Disease & Non-Weed Pests": false,
  });

  // const [sidebarFiltersObj, setSidebarFiltersObj] = React.useState([{}]);
  // const [sidebarFilterVariables, setSidebarFilterVariables] = React.useState(
  //   []
  // );

  // const renderCheckBoxes = (arrayIndex) => {
  //   console.log(sidebarFiltersObj[arrayIndex]);

  //   return (
  //     <div>
  //       <div></div>
  //     </div>
  //   );
  // };
  // React.useEffect(() => {
  //   let url = getAirtableDictionaryURL(state.zone);

  //   Axios({
  //     url: url,
  //     headers: {
  //       Authorization: `Bearer ${AirtableBearerKey}`,
  //     },
  //   }).then((response) => {
  //     let sidebarFiltersArr = [{}];
  //     let sidebarFilterCategories = [];
  //     let data = response.data;
  //     sidebarFilterCategories = data.records.map((record, index) => {
  //       // sidebarFiltersArr.push(record.fields["Category"])

  //       return record.fields;
  //     });

  //     if (data.offset) {
  //       // get more results
  //       Axios({
  //         url: url + `&offset=${data.offset}`,
  //         headers: {
  //           Authorization: `Bearer ${AirtableBearerKey}`,
  //         },
  //       })
  //         .then((resp) => {
  //           let offsetObj = [];
  //           offsetObj = resp.data.records.map((record, index) => {
  //             // sidebarFiltersArr.push(record.fields["Category"])

  //             return record.fields;
  //           });

  //           return _.concat(sidebarFilterCategories, offsetObj);
  //         })
  //         .then((cats) => {
  //           // console.log(cats);
  //           // console.log("unionbycategory", _.unionBy(cats, "Category"));
  //           let outObject = cats.reduce(function (a, e) {
  //             // GROUP BY estimated key (estKey), well, may be a just plain key
  //             // a -- Accumulator result object
  //             // e -- sequentally checked Element, the Element that is tested just at this itaration

  //             // new grouping name may be calculated, but must be based on real value of real field
  //             let estKey = e["Category"];

  //             if (e["Filter Field"]) {
  //               // if(e["Information Sheet"]) {
  //               (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
  //             }

  //             return a;
  //           }, {});
  //           // let keysData = _.map(outObject, (val, index) => {
  //           //   console.log(val);
  //           //   return { index: false };
  //           // });

  //           outObject = _.map(outObject, (val, key) => {
  //             // return { category: key, data: val, open: false, active: false };
  //             return { category: key, data: val };
  //           });
  //           console.log(outObject);
  //           // setEnvTolData(keysData);
  //           setSidebarFiltersObj(outObject);
  //         });
  //     }
  //   });
  // .then((cats) => {
  //   // console.log([...new Set(cats)]);
  //   console.log(cats);
  // });
  // }, []);

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
          ),
        },
      });
    }

    props.setGrowthWindow(growthWindowVisible);
  }, [dateRange, growthWindowVisible]);

  // React.useEffect(() => {
  //   // console.log(keysArray);
  //   // if (keysArray.length ) {
  //   props.sortEnvTolCropData(keysArray);
  //   // }
  //   // return () => {
  //   //   keysArray = [];
  //   // };
  // }, [keysArrChanged]);

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
      <ListItem button onClick={() => handleClick(2)}>
        <ListItemText primary="COVER CROP FILTERS" />
        {cropFiltersOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={cropFiltersOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* Commented to remove dynamic data pulling feature and move towards hardcoding these filters */}
          {/* <ListItem>
            <FormControlLabel
              classes={{ root: classes.formControlLabel }}
              control={
                <Checkbox
                  checked={true}
                  disabled={true}
                  value="Show Growth Window"
                />
              }
              label={
                <Typography variant="body2">Zone Decision = Include</Typography>
              }
            />
          </ListItem> */}

          {/* {sidebarFiltersObj.map((sidebarObj, index1) => {
            return (
              <Fragment key={index1}>
                <ListItem
                  button
                  className={classes.nested}
                  key={index1}
                  onClick={() => {
                    const newState = sidebarFiltersObj.map((obj, index2) => {
                      if (index2 === index1) return { ...obj, open: !obj.open };
                      else return { ...obj };
                    });
                    setSidebarFiltersObj(newState);
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2">
                        {sidebarObj.category}
                      </Typography>
                    }
                  />
                  {sidebarObj.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={sidebarObj.open} timeout="auto">
                  <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                      <CropSidebarFilters
                        sidebarObj={sidebarObj}
                        classes={classes.formControlLabel}
                        keysArray={keysArray}
                        keysArrChanged={keysArrChanged}
                        sidebarFiltersObj={sidebarFiltersObj}
                        index={index1}
                        setSidebarFiltersObj={setSidebarFiltersObj}
                        setKeysArray={setKeysArray}
                        setKeysArrChanges={setKeysArrChanges}
                        filterByCheckboxValues={props.filterByCheckboxValues}
                      />
                    </ListItem>
                  </List>
                </Collapse>
              </Fragment>
            );
          })} */}
          <ListItem
            button
            onClick={() =>
              setFiltersObjectOpen({
                ...filtersObjectOpen,
                Taxonomy: !filtersObjectOpen.Taxonomy,
              })
            }
          >
            <ListItemText primary="Taxonomy" />
            {filtersObjectOpen.Taxonomy ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={filtersObjectOpen.Taxonomy}>
            <SidebarFilters type={"Taxonomy"} />
          </Collapse>
          <ListItem
            button
            onClick={() =>
              setFiltersObjectOpen({
                ...filtersObjectOpen,
                "Basic Agronomics": !filtersObjectOpen["Basic Agronomics"],
              })
            }
          >
            <ListItemText primary="Basic Agronomics" />
            {filtersObjectOpen["Basic Agronomics"] ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </ListItem>
          <Collapse in={filtersObjectOpen["Basic Agronomics"]}>
            <SidebarFilters type={"Basic Agronomics"} />
          </Collapse>
          <ListItem
            button
            onClick={() =>
              setFiltersObjectOpen({
                ...filtersObjectOpen,
                "Disease & Non-Weed Pests": !filtersObjectOpen[
                  "Disease & Non-Weed Pests"
                ],
              })
            }
          >
            <ListItemText primary="Disease & Non-Weed Pests" />
            {filtersObjectOpen["Disease & Non-Weed Pests"] ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </ListItem>
          <Collapse in={filtersObjectOpen["Disease & Non-Weed Pests"]}>
            <SidebarFilters type={"Disease & Non-Weed Pests"} />
          </Collapse>

          <ListItem
            button
            onClick={() =>
              setFiltersObjectOpen({
                ...filtersObjectOpen,
                "Environmental Tolerances": !filtersObjectOpen[
                  "Environmental Tolerances"
                ],
              })
            }
          >
            <ListItemText primary="Environmental Tolerances" />
            {filtersObjectOpen["Environmental Tolerances"] ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </ListItem>
          <Collapse in={filtersObjectOpen["Environmental Tolerances"]}>
            <SidebarFilters type={"Environmental Tolerances"} />
          </Collapse>
          <ListItem
            button
            onClick={() =>
              setFiltersObjectOpen({
                ...filtersObjectOpen,
                "Grazers & Pollinators": !filtersObjectOpen[
                  "Grazers & Pollinators"
                ],
              })
            }
          >
            <ListItemText primary="Grazers & Pollinators" />
            {filtersObjectOpen["Grazers & Pollinators"] ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </ListItem>
          <Collapse in={filtersObjectOpen["Grazers & Pollinators"]}>
            <SidebarFilters type={"Grazers & Pollinators"} />
          </Collapse>

          <ListItem
            button
            onClick={() =>
              setFiltersObjectOpen({
                ...filtersObjectOpen,
                Growth: !filtersObjectOpen.Growth,
              })
            }
          >
            <ListItemText primary="Growth" />
            {filtersObjectOpen.Growth ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={filtersObjectOpen.Growth}>
            <SidebarFilters type={"Growth"} />
          </Collapse>

          <ListItem
            button
            onClick={() =>
              setFiltersObjectOpen({
                ...filtersObjectOpen,
                Planting: !filtersObjectOpen.Planting,
              })
            }
          >
            <ListItemText primary="Planting" />
            {filtersObjectOpen.Planting ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={filtersObjectOpen.Planting}>
            <SidebarFilters type={"Planting"} />
          </Collapse>

          <ListItem
            button
            onClick={() =>
              setFiltersObjectOpen({
                ...filtersObjectOpen,
                "Soil Conditions": !filtersObjectOpen["Soil Conditions"],
              })
            }
          >
            <ListItemText primary="Soil Conditions" />
            {filtersObjectOpen["Soil Conditions"] ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </ListItem>
          <Collapse in={filtersObjectOpen["Soil Conditions"]}>
            <SidebarFilters type={"Soil Conditions"} />
          </Collapse>

          <ListItem
            button
            onClick={() =>
              setFiltersObjectOpen({
                ...filtersObjectOpen,
                Termination: !filtersObjectOpen.Termination,
              })
            }
          >
            <ListItemText primary="Termination" />
            {filtersObjectOpen.Termination ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={filtersObjectOpen.Termination}>
            <SidebarFilters type={"Termination"} />
          </Collapse>

          <ListItem
            button
            onClick={() =>
              setFiltersObjectOpen({
                ...filtersObjectOpen,
                Weeds: !filtersObjectOpen.Weeds,
              })
            }
          >
            <ListItemText primary="Weeds" />
            {filtersObjectOpen.Weeds ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={filtersObjectOpen.Weeds}>
            <SidebarFilters type={"Weeds"} />
          </Collapse>
        </List>
      </Collapse>
    </List>
  );
};

export default CropSidebarComponent;