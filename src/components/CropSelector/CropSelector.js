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
import { keys } from "lodash";

const _ = require("lodash");

const CropSelector = () => {
  const [state, dispatch] = useContext(Context);
  // let [isExpansionExpanded, setIsExpansionExpanded] = useState(true);
  let [showGrowthWindow, setShowGrowthWindow] = useState(true);
  // sortAllGoals = false would mean default i.e.
  const [sortAllGoals, setSortAllGoals] = useState(false);
  const [sortPreference, setSortPreference] = useState("desc");
  const [disabledIds, setDisabledIds] = useState([]);
  const [starDisabledIds, setStarDisabledIds] = useState([]);
  const [activeCropData, setActiveCropData] = useState([]);
  const [inactiveCropData, setInactiveCropData] = useState([]);
  // const [filterByCheckBoxKeys, setfilterByCheckBoxKeys] = useState([]);
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

        setStarDisabledIds(newArr);
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
        setStarDisabledIds(ids);
      }
    }
  };

  // useEffect(() => {
  //   filterByStars();
  // }, [state.selectedStars]);

  const [text, setText] = useState("");
  const [differenceText, setDifferenceText] = useState("");
  const [disabledIdsTextNodes, setDisabledIdsTextNodes] = useState("");
  const [split_arr, setSplit_arr] = useState([]);
  // Debug text
  const [debug, setDebug] = useState(true);

  useEffect(() => {
    filterByCheckboxValues("checkboxes", state.selectedCheckboxes);
  }, [state.selectedCheckboxes]);

  useEffect(() => {
    filterByCheckboxValues("stars", state.selectedStars);
  }, [state.selectedStars]);

  const filterByCheckboxValues = (type, keysArray) => {
    let crop_data = cropData;
    // console.log("keys", keysArray);
    setText(JSON.stringify(keysArray));
    // setfilterByCheckBoxKeys(keysArray);

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
    // let disabledIdsArr = [];

    // attempt 3
    console.log("ATT3KEYSARR", keysArray);

    // let keys = [];
    // let values = [];
    // let keyValObj = {};

    // for (let key in keysArray) {
    //   console.log(keysArray[key]);
    //   let splitString = keysArray[key].split("~");
    //   keys.push(splitString[1]);
    //   values.push(splitString[0]);

    // }
    // console.log("keys", keys);
    // console.log("vals", values);

    // let spl_arr = crop_data.filter((x) => {
    //   if (keys.length > 1) {
    //     let keysLength = [];
    //       if (x.fields["Zone Decision"] === "Include") {
    //         if (!x.fields[keys[i]].includes(values[i])) {
    //           return x;
    //         }
    //       }

    //   } else {
    //     if (x.fields["Zone Decision"] === "Include") {
    //       if (!x.fields[keys[0]].includes(values[0])) {
    //         return x;
    //       }
    //     }
    //   }
    // });
    // console.log(spl_arr);
    let keys = [];
    if (type === "checkboxes") {
      if (keysArray.length > 0) {
        let keyValObj = keysArray.map((keyVal) => {
          let splitString = keyVal.split("~");
          let key = splitString[1];
          keys.push(key);
          let value = splitString[0];
          if (key === "Soil Textures") {
            value = value.toLowerCase();
          }
          return { [key]: value };
        });
        let spl_arr = [];

        let validKeysLength = 0;

        keys.forEach((key) => {
          if (arrayKeys.includes(key)) {
            validKeysLength += 1;
          }
        });

        if (validKeysLength === keys.length) {
          // console.log(keyValObj);
          keyValObj = Object.entries(keyValObj);
          // console.log(keyValObj);
          for (const [index, val] of keyValObj) {
            if (crop_data.length > 0) {
              crop_data = crop_data.filter((x) => {
                for (const [key, value] of Object.entries(val)) {
                  if (x.fields["Zone Decision"] === "Include") {
                    if (!x.fields[key].includes(value)) {
                      return x;
                    }
                  }
                }
              });
            }
          }

          // setCropData(crop_data);
          // CHECK: to see if sorting can work by breaking the objects into active:inactive
          var dif = _.differenceWith(cropData, crop_data, _.isEqual);
          dif = dif.filter((val) => val.fields["Zone Decision"] === "Include");
          console.log(dif);
          setActiveCropData(dif);
          setInactiveCropData(crop_data);
          let disableIds = crop_data.map((cd) => cd.id);
          console.log("disable: ", disableIds);
          setDisabledIds(disableIds);
        }
        //TODO: sort crop data based on filtered values
      }
    }

    if (type === "stars") {
      let selectedStars = keysArray;
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
            newArr = starDisabledIds.filter((e) => e !== val.id);
          });

          setStarDisabledIds(newArr);
          console.log("disabled:if ", newArr);
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
          console.log("disabled:else ", ids);
          setStarDisabledIds(ids);
        }
      }
    }
    // if (keysArray.length > 0) {
    //   // setDisabledIds("rec1KNI87iZslbLy2");
    //   let key = "";
    //   let value = "";

    //   keysArray.forEach((keyString) => {
    //     let splitString = keyString.split("~");
    //     key = splitString[0];
    //     value = splitString[1];
    //     console.log("key,val", { key: key, val: value });
    //     if (arrayKeys.includes(value)) {
    //       if (split_arr.length === 0) {
    //         let spl_arr = crop_data.filter((x) => {
    //           if (x.fields["Zone Decision"] === "Include") {
    //             if (!x.fields[value].includes(key)) {
    //               return x;
    //             }
    //           }
    //         });
    //         console.log("split", spl_arr);
    //         setSplit_arr(spl_arr);
    //       } else {
    //         let spl_arr = split_arr.filter((x) => {
    //           if (x.fields["Zone Decision"] === "Include") {
    //             if (!x.fields[value].includes(key)) {
    //               return x;
    //             }
    //           }
    //         });
    //         console.log("split", spl_arr);
    //         setSplit_arr(spl_arr);
    //       }
    //     } else {
    //       console.log(false);
    //     }
    //   });

    //   // console.log(crop_data);
    //   // sort crop_data based on ids
    //   let ids = [];
    //   console.log("statesplit", split_arr);
    //   split_arr.map((cropItem) => {
    //     // if id is not in disabled ids array add it else remove it
    //     if (!ids.includes(cropItem.id)) {
    //       ids.push(cropItem.id);
    //     } else {
    //       let itemIndex = ids.indexOf(cropItem.id);
    //       if (itemIndex > -1) {
    //         ids.splice(itemIndex, 1);
    //       }
    //     }
    //   });
    //   setDisabledIds(ids);
    // } else {
    //   // reset all css for checkboxes

    //   setDisabledIds([]);
    //   setSplit_arr([]);
    // }
    // console.log(disabledIdsArr);
    // if (keysArray.length > 0) {

    //   let key = "";
    //   let value = "";
    //   // let obj = {};
    //   var ids = [];
    //   let namesA = [];
    //   if (filterByCheckBoxKeys.length > 0) {
    //     filterByCheckBoxKeys.forEach((element) => {
    //       let wholeString = element.split("~");
    //       key = wholeString[1];
    //       value = wholeString[0];
    //       // ids.push(value);
    //       // obj[key] = value;

    //       if (arrayKeys.includes(key)) {
    //         console.log(`${key} is in arrayKeys\n`);

    //         // it is an array
    //         let a = crop_data.filter((x) => {
    //           if (x.fields[key] && x.fields["Zone Decision"] === "Include")
    //             return x.fields[key].indexOf(value);
    //         });
    //         a.forEach((ele) => {
    //           // console.log(ele.id, ele.fields["Cover Crop Name"]);
    //           // push id to ids array for resetting later
    //           // if id is in not in array, add it else -> remove it
    //           if (!ids.includes(ele.id)) {
    //             ids.push(ele.id);
    //             namesA.push(ele.fields["Cover Crop Name"]);
    //           } else {
    //             ids = ids.filter((item) => item !== ele.id);
    //             namesA = namesA.filter(
    //               (item) => item !== ele.fields["Cover Crop Name"]
    //             );
    //           }

    //           let el = document.getElementById(ele.id);
    //           el.classList.add("disabled");
    //           el.style.opacity = "0.2";
    //         });

    //         // a.map((i) => {
    //         //   let el = document.getElementById(i.id);
    //         //   el.classList.add("disabled");
    //         //   el.style.opacity = "0.2";
    //         // });
    //       } else {
    //         console.log("not array");
    //       }
    //       console.log("Array Names: ", namesA);
    //       setDisabledIds(ids);
    //     });

    //     //  var a =  _.filter(crop_data, _.matches({ 'a': 4, 'c': 6 }));
    //   } else {
    //     // reset filter
    //     // console.log("Disabled Ids", disabledIds);

    //     // disabledIds.forEach((id) => {
    //     //   let el = document.getElementById(id);
    //     //   el.classList.remove("disabled");
    //     //   el.style.opacity = "1";
    //     // });
    //     setDisabledIds([]);
    //   }

    //   // console.log(keysArray);
    // }
  };

  useEffect(() => {
    // get all ids and compare with the disabled ids array
    let allIds = [
      ...document.querySelectorAll(
        ".calendarViewTableWrapper table > tbody > tr"
      ),
    ].map((x) => {
      // if (x.id !== "") {
      return x.id;
      // }
    });
    // filter empty nodes(strings) from above array
    allIds = allIds.filter((x) => x !== "");
    // console.log(allIds);

    // if (disabledIds.length > 0) {
    let disabledIdssTextNodes = disabledIds.map((val) => {
      return document.querySelector(`#${val} div div span:nth-child(2)`)
        .innerText;
    });
    setDisabledIdsTextNodes(JSON.stringify(disabledIdssTextNodes));
    // }
    // setDisabledIdsTextNodes(JSON.stringify(disabledIds));
    // let differenceIds = allIds.filter((x) => {
    //   if (x !== "") return !disabledIds.includes(x);
    // });
    // let differenceNames = differenceIds.map((val) => {
    //   return document.querySelector(`#${val} div div span:nth-child(2)`)
    //     .innerText;
    // });
    // setDifferenceText(JSON.stringify(differenceNames));

    // if (differenceIds.length > 0) {
    //   differenceIds.map((id) => {
    //     let ele = document.getElementById(id);
    //     ele.classList.remove("disabled");
    //     ele.style.opacity = "1";
    //   });
    // }

    if (disabledIds.length > 0) {
      allIds.map((id) => {
        if (disabledIds.includes(id) || starDisabledIds.includes(id)) {
          // need not be disabled
          let ele = document.getElementById(id);
          ele.classList.add("disabled");
          ele.style.opacity = "0.2";
        } else {
          // disable
          let ele = document.getElementById(id);
          ele.classList.remove("disabled");
          ele.style.opacity = "1";
        }
      });
    } else {
      if (starDisabledIds.length === 0) {
        allIds.map((id) => {
          let ele = document.getElementById(id);
          ele.classList.remove("disabled");
          ele.style.opacity = "1";
        });
      } else {
        allIds.map((id) => {
          if (starDisabledIds.includes(id)) {
            // need not be disabled
            let ele = document.getElementById(id);
            ele.classList.add("disabled");
            ele.style.opacity = "0.2";
          } else {
            // disable
            let ele = document.getElementById(id);
            ele.classList.remove("disabled");
            ele.style.opacity = "1";
          }
        });
      }
    }
  }, [disabledIds]);

  useEffect(() => {
    // get all ids and compare with the disabled ids array
    let allIds = [
      ...document.querySelectorAll(
        ".calendarViewTableWrapper table > tbody > tr"
      ),
    ].map((x) => {
      // if (x.id !== "") {
      return x.id;
      // }
    });
    // filter empty nodes(strings) from above array
    allIds = allIds.filter((x) => x !== "");
    // console.log(allIds);

    // if (disabledIds.length > 0) {
    let disabledIdssTextNodes = disabledIds.map((val) => {
      return document.querySelector(`#${val} div div span:nth-child(2)`)
        .innerText;
    });
    if (starDisabledIds.length > 0) {
      allIds.map((id) => {
        if (disabledIds.includes(id) || starDisabledIds.includes(id)) {
          // need not be disabled
          let ele = document.getElementById(id);
          ele.classList.add("disabled");
          ele.style.opacity = "0.2";
        } else {
          // disable
          let ele = document.getElementById(id);
          ele.classList.remove("disabled");
          ele.style.opacity = "1";
        }
      });
    } else {
      if (disabledIds.length === 0) {
        allIds.map((id) => {
          let ele = document.getElementById(id);
          ele.classList.remove("disabled");
          ele.style.opacity = "1";
        });
      } else {
        allIds.map((id) => {
          if (disabledIds.includes(id)) {
            // need not be disabled
            let ele = document.getElementById(id);
            ele.classList.add("disabled");
            ele.style.opacity = "0.2";
          } else {
            // disable
            let ele = document.getElementById(id);
            ele.classList.remove("disabled");
            ele.style.opacity = "1";
          }
        });
      }
    }
  }, [starDisabledIds]);

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
                <div className="col-lg-9">
                  <div className="row">
                    {debug ? (
                      <Fragment>
                        <div className="col-12">
                          {text !== "" ? (
                            <div className="alert alert-primary" role="alert">
                              {text}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="col-12">{disabledIdsTextNodes}</div>
                      </Fragment>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
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
                activeCropData={activeCropData}
                inactiveCropData={inactiveCropData}
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
              <CropCalendarViewComponent cropData={cropData} />
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
