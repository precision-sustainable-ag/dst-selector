import React, { useContext, useState, Fragment, useEffect } from "react";
import { Context } from "../../store/Store";
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  FormGroup,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { List, arrayMove } from "react-movable";

import { ExpandMore, CalendarToday } from "@material-ui/icons";

import "../../styles/cropSelector.scss";
import CropTableComponent from "./CropTable";
import ListIcon from "@material-ui/icons/List";
import MyCoverCropList from "../MyCoverCropList/MyCoverCropList";
import CropCalendarViewComponent from "./CropCalendarView";
import CropSidebarComponent from "./CropSidebar";
import CropCardViewComponent from "./CardView/CropCardView";

const _ = require("lodash");

const CropSelector = () => {
  const [state, dispatch] = useContext(Context);
  // let [isExpansionExpanded, setIsExpansionExpanded] = useState(true);
  let [showGrowthWindow, setShowGrowthWindow] = useState(true);
  // sortAllGoals = false would mean default i.e.
  const [sortAllGoals, setSortAllGoals] = useState(false);
  const [sortPreference, setSortPreference] = useState("desc");
  const [disabledIds, setDisabledIds] = useState([]);
  const [filterByCheckBoxKeys, setfilterByCheckBoxKeys] = useState([]);
  // let [isListView, setIsListView] = useState(true);

  // TODO: set list view as default. Calendar component is activated currently
  let [isListView, setIsListView] = useState(true);

  const [cropData, setCropData] = useState([]);

  const sortEnvTolCropData = (objDataArr) => {
    // console.log(objDataArr);
    if (cropData.length !== 0) {
      let crop_data = cropData;

      // console.log(objData);
      // const activeObjKeys = _.keys(_.pickBy(objData));
      // console.log('activeObjKeys', activeObjKeys)
      // console.log("activeObjKeys", activeObjKeys);
      // let objData = objDataArr;

      let objData = objDataArr.map((obj) => {
        return `fields.${obj}`;
      });
      // console.log(objData);

      // console.log(objData);
      if (objData.length > 0) {
        // some values are truthy

        let updatedCropData = _.sortBy(crop_data, objData);

        setCropData(updatedCropData);
      } else {
        // reset! none are true
        const activeObjKeys = [];
        let { selectedGoals } = state;
        selectedGoals.forEach((val, index) => {
          //  Crop Data is inside cropData.fields
          activeObjKeys[index] = `fields.${val}`;
        });
        let updatedCropData = _.orderBy(crop_data, activeObjKeys, [
          "desc",
          "desc",
          "desc",
        ]);

        setCropData(updatedCropData);
      }
    }
  };

  // latest

  const filterByStars = () => {
    let { selectedStars } = state;
    let crop_data = cropData;
    // console.log(selectedStars);

    for (let [key, value] of Object.entries(selectedStars)) {
      // console.log(`------\n${key}: ${value}------\n`);
      if (value === null) {
        // reset that key i.e. pick its id and reset css
        let newArr = [];
        let zoneIncludeArr = crop_data.filter((x) => {
          if (
            x.fields["Zone Decision"] === "Include" &&
            x.fields[key] !== undefined &&
            x.fields[key] === value
          )
            return x.fields;
        });

        zoneIncludeArr.forEach((val) => {
          newArr = disabledIds.filter((e) => e !== val.id);
        });

        setDisabledIds(newArr);
      } else {
        let ids = [];
        let zoneIncludeArr = crop_data.filter((x) => {
          if (
            x.fields["Zone Decision"] === "Include" &&
            x.fields[key] !== undefined
          )
            return x.fields;
        });

        zoneIncludeArr.forEach((val, index) => {
          // console.log(
          //   `${val.fields["Cover Crop Name"]} : ${val.fields[key]}, Expected: ${value}`
          // );
          if (val.fields[key] !== value) {
            ids.push(val.id);
            let el = document.getElementById(val.id);
            el.classList.add("disabled");
            el.style.opacity = "0.2";
          }
          // console.log(val);

          // if()
        });
        setDisabledIds(ids);
      }
    }
  };

  useEffect(() => {
    filterByStars();
  }, [state.selectedStars]);

  const filterByCheckboxValues = (keysArray) => {
    let crop_data = cropData;
    // console.log("keys", keysArray);
    setfilterByCheckBoxKeys(keysArray);
    // console.log(keysArray);
    // let keysToBePushed = [];
    // keysArray.forEach((k) => {
    //   if (!filterByCheckBoxKeys.includes(k)) keysToBePushed.push(k);
    // });
    // setfilterByCheckBoxKeys(keysToBePushed);
    // console.log("keysPushed", keysToBePushed);
    // list of keys that have "array" as values
    // this list still does not include "month, mid/early" keys
    const arrayKeys = [
      "Active Growth Period",
      "Active Growth Period-USDA PLANTS",
      "Common Mixes",
      "Duration",
      "Flowering Trigger",
      "Inoculant Type (Legumes Only)",
      "Root Architecture",
      "Shape & Orientation",
      "Soil Drainage",
      "Soil Textures",
      "Winter Survival",
    ];
    // format == value~key

    // to "filter", add opacity: 0.2 and disabled class to relevant "id"

    let key = "";
    let value = "";
    // let obj = {};
    var ids = [];
    let namesA = [];
    if (filterByCheckBoxKeys.length > 0) {
      filterByCheckBoxKeys.forEach((element) => {
        let wholeString = element.split("~");
        key = wholeString[1];
        value = wholeString[0];
        // ids.push(value);
        // obj[key] = value;

        if (arrayKeys.includes(key)) {
          console.log(`${key} is in arrayKeys\n`);

          // it is an array
          let a = crop_data.filter((x) => {
            if (x.fields[key] && x.fields["Zone Decision"] === "Include")
              return x.fields[key].indexOf(value);
          });
          a.forEach((ele) => {
            // console.log(ele.id, ele.fields["Cover Crop Name"]);
            // push id to ids array for resetting later
            // if id is in not in array, add it else -> remove it
            if (!ids.includes(ele.id)) {
              ids.push(ele.id);
              namesA.push(ele.fields["Cover Crop Name"]);
            } else {
              ids = ids.filter((item) => item !== ele.id);
              namesA = namesA.filter(
                (item) => item !== ele.fields["Cover Crop Name"]
              );
            }

            let el = document.getElementById(ele.id);
            el.classList.add("disabled");
            el.style.opacity = "0.2";
          });

          // a.map((i) => {
          //   let el = document.getElementById(i.id);
          //   el.classList.add("disabled");
          //   el.style.opacity = "0.2";
          // });
        } else {
          console.log("not array");
        }
        console.log("Array Names: ", namesA);
        setDisabledIds(ids);
      });

      //  var a =  _.filter(crop_data, _.matches({ 'a': 4, 'c': 6 }));
    } else {
      // reset filter
      // console.log("Disabled Ids", disabledIds);

      // disabledIds.forEach((id) => {
      //   let el = document.getElementById(id);
      //   el.classList.remove("disabled");
      //   el.style.opacity = "1";
      // });
      setDisabledIds([]);
    }

    // console.log(keysArray);
  };

  useEffect(() => {
    // get all ids and compare with the disabled ids array
    let allIds = [
      ...document.querySelectorAll(
        ".calendarViewTableWrapper table > tbody > tr"
      ),
    ].map((x) => {
      if (x.id !== "" || x.id !== undefined) return x.id;
    });

    let differenceIds = allIds.filter((x) => {
      if (x !== "") return !disabledIds.includes(x);
    });

    if (differenceIds.length > 0) {
      differenceIds.map((id) => {
        let ele = document.getElementById(id);
        ele.classList.remove("disabled");
        ele.style.opacity = "1";
      });
    }
  }, [disabledIds]);

  const sortCropsBy = (orderBy) => {
    if (state.cropData.length > 0) {
      const { selectedGoals } = state;
      if (selectedGoals.length > 0) {
        let crop_data = cropData;
        // console.log("cropdata", crop_data);
        const activeObjKeys = [];
        selectedGoals.forEach((val, index) => {
          //  Crop Data is inside cropData.fields
          activeObjKeys[index] = `fields.${val}`;
        });
        switch (orderBy) {
          case "asc": {
            let updatedCropData = _.orderBy(crop_data, activeObjKeys, [
              "asc",
              "asc",
              "asc",
            ]);
            setCropData(updatedCropData);
            setSortPreference("asc");
            break;
          }
          case "desc": {
            let updatedCropData = _.orderBy(crop_data, activeObjKeys, [
              "desc",
              "desc",
              "desc",
            ]);

            setCropData(updatedCropData);
            setSortPreference("desc");
            break;
          }
          default: {
            break;
          }
        }
      }
    }
  };

  useEffect(() => {
    if (state.cropData) {
      if (state.cropData.length > 0) {
        // sort crop data by goal priority
        const { selectedGoals } = state;
        if (selectedGoals.length > 0) {
          let updatedCropData = _.sortBy(state.cropData, selectedGoals);
          setCropData(updatedCropData);
        } else {
          setCropData(state.cropData);
        }
      }
    }
    return () => {
      setCropData([]);
    };
  }, [state.cropData]);

  const expandCoverCropFilter = (id) => {
    let listItemId = `cropFilterList${id}`;
    let x = document.querySelectorAll(`#${listItemId} div`);
    if (document.getElementById(listItemId).classList.contains("active")) {
      document.getElementById(listItemId).classList.remove("active");
      // hide dropdown
      // document.querySelectorAll(`#${listItemId} div`).classList.remove("show");
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("show");
      }
    } else {
      document.getElementById(listItemId).classList.add("active");
      // show dropdown

      for (var j = 0; j < x.length; j++) {
        if (!x[j].classList.contains("show")) {
          x[j].classList.add("show");
        }
      }
    }
  };

  const toggleListView = () => {
    setIsListView(!isListView);
  };
  // const renderRelevantComponent = () => {
  //   if (isListView) {

  //   }
  // };
  return (
    <div className="container-fluid mt-2">
      <div className="row toggleComparisonRow">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-12 col-sm-12">
              {/* <div className="iconsWrapper"> */}
              <div className="row">
                {state.myCoverCropActivationFlag ? (
                  <Fragment>
                    {/* <div className="iconToggle">
                      <IconButton
                        className={isListView ? `iconActive` : ""}
                        onClick={toggleListView}
                      >
                        <ListIcon style={{ fontSize: "larger" }} />
                      </IconButton>
                    </div> */}
                    <div className="iconToggle col-lg-3">
                      <Typography component="div" variant="body1">
                        <IconButton
                          color={"secondary"}
                          className={`iconActive`}
                          onClick={toggleListView}
                        >
                          {isListView ? (
                            <CalendarToday style={{ fontSize: "larger" }} />
                          ) : (
                            <ListIcon style={{ fontSize: "larger" }} />
                          )}
                        </IconButton>
                        {isListView ? "CALENDAR VIEW" : "LIST VIEW"}
                      </Typography>
                    </div>{" "}
                    <br />
                    <small>LIST VIEW</small>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className="iconToggle col-lg-3">
                      <Button
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
                  </Fragment>
                )}
                <div className="col-lg-9">hello world</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row cropSelectorRow mt-3">
        <div className="col-lg-2 col-sm-12">
          <CropSidebarComponent
            sortEnvTolCropData={sortEnvTolCropData}
            setGrowthWindow={setShowGrowthWindow}
            filterByCheckboxValues={filterByCheckboxValues}
          />
        </div>

        <div className="col-lg-10">
          {state.speciesSelectorActivationFlag ? (
            isListView ? (
              <CropTableComponent
                cropData={cropData}
                showGrowthWindow={showGrowthWindow}
                sortAllGoals={setSortAllGoals}
                sortAllCrops={sortCropsBy}
                sortPreference={sortPreference}
              />
            ) : (
              // <CropCardViewComponent
              //   cropData={cropData}
              //   showGrowthWindow={showGrowthWindow}
              // />
              <CropCalendarViewComponent />
            )
          ) : (
            <MyCoverCropList />
          )}
        </div>
      </div>
    </div>
  );
};

export default CropSelector;
