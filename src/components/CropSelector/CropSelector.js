/*
  This file contains the CropSelector and it's styles
  The CropSelector is the top level component for the crop selector tool and allows users to choose crops based on their needs
  Styles are created using makeStyles
*/

import {
  Button,
  Fab,
  makeStyles,
  useScrollTrigger,
  Zoom,
} from "@material-ui/core";
import { ArrowBack, ArrowForward, KeyboardArrowUp } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { flipCoverCropName } from "../../shared/constants";
import { Context } from "../../store/Store";
import "../../styles/cropSelector.scss";
import MyCoverCropList from "../MyCoverCropList/MyCoverCropList";
import CropCalendarViewComponent from "./CropCalendarView";
import CropSidebarComponent from "./CropSidebar";
import CropTableComponent from "./CropTable";

const _ = require("lodash");

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const ScrollTop = (props) => {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 180,
  });
  const handleBackToTopClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      ".topHeader"
    );
    // console.log(event.target.ownerDocument);
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  return (
    <Zoom in={trigger}>
      <div
        onClick={handleBackToTopClick}
        role="presentation"
        className={classes.root}
      >
        {children}
      </div>
    </Zoom>
  );
};

const CropSelector = (props) => {
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
  const [coverCropName, setCoverCropName] = useState("");

  // toggles list view and calendar view
  let [isListView, setIsListView] = useState(true);

  const [comparisonView, setComparisonView] = useState(false);
  // reset back to false

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

  // const [text, setText] = useState("");
  // const [differenceText, setDifferenceText] = useState("");
  const [disabledIdsTextNodes, setDisabledIdsTextNodes] = useState("");
  // const [split_arr, setSplit_arr] = useState([]);
  // Debug text
  // const [debug, setDebug] = useState(false);
  const [cropDataChanged, setCropDataChanged] = useState(false);

  useEffect(() => {
    // setActiveCropData(state.cropData);
    // setInactiveCropData([]);
    // sortCropsBy("asc");
    setCropDataChanged(!cropDataChanged);
  }, [state.cropData]);

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
        // let crop_data = state.cropData;
        let activeCropDataCopy =
          activeCropData.length > 0 ? activeCropData : state.cropData;
        let inactiveCropDataCopy =
          inactiveCropData.length > 0 ? inactiveCropData : [];
        // console.log("cropdata", crop_data);
        let activeObjKeys = [];
        selectedGoals.forEach((val, index) => {
          //  Crop Data is inside cropData.fields
          activeObjKeys[index] = `fields.${val}`;
        });
        console.log(activeObjKeys);
        switch (orderBy) {
          case "asc": {
            if (activeCropDataCopy.length > 0) {
              let updatedCropData = _.orderBy(
                activeCropDataCopy,
                activeObjKeys,
                ["asc", "asc", "asc"]
              );
              setActiveCropData(updatedCropData);
            }
            if (inactiveCropDataCopy.length > 0) {
              let updatedInactives = _.orderBy(
                inactiveCropDataCopy,
                activeObjKeys,
                ["asc", "asc", "asc"]
              );
              setInactiveCropData(updatedInactives);
            }
            // setCropData(updatedCropData);
            setSortPreference("asc");
            break;
          }
          case "desc": {
            if (activeCropDataCopy.length > 0) {
              let updatedCropData = _.orderBy(
                activeCropDataCopy,
                activeObjKeys,
                ["desc", "desc", "desc"]
              );
              setActiveCropData(updatedCropData);
            }
            if (inactiveCropDataCopy.length > 0) {
              let updatedInactives = _.orderBy(
                inactiveCropDataCopy,
                activeObjKeys,
                ["desc", "desc", "desc"]
              );
              setInactiveCropData(updatedInactives);
            }
            // setCropData(updatedCropData);
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
          // let updatedCropData = _.orderBy(state.cropData, selectedGoals);
          let activeCropDataShadow = state.cropData;
          selectedGoals
            .slice()
            .reverse()
            .forEach((goal) => {
              activeCropDataShadow.sort((a, b) => {
                if (a.fields[goal] && b.fields[goal]) {
                  if (a.fields[goal] > b.fields[goal]) {
                    return -1;
                  } else {
                    return 1;
                  }
                }
                return 0;
              });
            });
          setCropData(activeCropDataShadow);
        } else {
          setCropData(state.cropData);
        }
      }
    }
    return () => {
      setCropData([]);
    };
  }, [state.cropData]);

  // useEffect(() => {
  //   window.localStorage.setItem("actives", JSON.stringify(activeCropData));
  //   window.localStorage.setItem("inactives", JSON.stringify(inactiveCropData));
  // }, [activeCropData, inactiveCropData]);

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

  const toggleComparisonView = () => {
    setComparisonView(!comparisonView);
  };
  const clearCoverCropNameSearch = () => {
    setCoverCropName("");
    setActiveCropData(cropData);
    setInactiveCropData([]);
  };

  const covercropsNamesFilter = (e) => {
    let value = e.target.value;
    value = value.split(" ").join("").toLowerCase();
    setCoverCropName(e.target.value);

    if (e.target.value === "") {
      setActiveCropData(cropData);
      setInactiveCropData([]);
    } else {
      const newActives = activeCropData.filter((crops) => {
        let cropName = flipCoverCropName(crops.fields["Cover Crop Name"])
          .split(" ")
          .join("")
          .toLowerCase();

        return (
          cropName.includes(value) ||
          crops.fields["Scientific Name"].toLowerCase().includes(value)
        );
      });
      const newInactives = inactiveCropData.filter((crops) => {
        let cropName = flipCoverCropName(crops.fields["Cover Crop Name"])
          .split(" ")
          .join("")
          .toLowerCase();

        return (
          cropName.includes(value) ||
          crops.fields["Scientific Name"].toLowerCase().includes(value)
        );
      });

      // setCropData(newActives);
      // console.log("Keyword: ", e.target.value);
      // console.log("Total: ", cropData.length);
      // console.log("Active: ", activeCropData.length);
      // console.log("Inactive: ", inactiveCropData.length);
      setActiveCropData(newActives);
      setInactiveCropData(newInactives);
    }
  };
  useEffect(() => {
    if (state.selectedGoals.length === 0) {
      dispatch({
        type: "UPDATE_PROGRESS",
        data: {
          type: "DECREMENT",
        },
      });
    }
  }, [state.selectedGoals]);
  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
  }
  const size = useWindowSize();
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <div className="container-fluid mt-2">
      <div className="row cropSelectorRow mt-3">
        {/* {Shows Collapsible icon for screen width < 1680px } */}
        {size.width < 1680 ? (
          <div className="col-12 mb-2">
            <Button
              startIcon={!showSidebar ? <ArrowForward /> : <ArrowBack />}
              title="Toggle Sidebar"
              aria-label="toggle-sidebar"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              {!showSidebar ? "Show Sidebar" : "Hide Sidebar"}
            </Button>
          </div>
        ) : (
          ""
        )}

        <div
          className={`col-md-2 col-sm-12`}
          style={
            showSidebar
              ? { display: "block", visibility: "visible" }
              : { display: "none", visibility: "hidden" }
          }
        >
          <CropSidebarComponent
            sortEnvTolCropData={sortEnvTolCropData}
            setGrowthWindow={setShowGrowthWindow}
            isListView={isListView}
            cropData={cropData}
            activeCropData={
              activeCropData.length > 0 ? activeCropData : cropData
            }
            inactiveCropData={inactiveCropData}
            setActiveCropData={setActiveCropData}
            setInactiveCropData={setInactiveCropData}
            cropDataChanged={cropDataChanged}
            comparisonView={comparisonView}
            coverCropName={coverCropName}
            covercropsNamesFilter={covercropsNamesFilter}
            clearCoverCropSearch={clearCoverCropNameSearch}
            toggleComparisonView={toggleComparisonView}
            toggleListView={toggleListView}
            comparisonView={comparisonView}
            isListView={isListView}
            from={"table"}
          />
        </div>

        <div
          className={
            showSidebar ? `col-md-10 col-sm-12` : `col-md-12 col-sm-12`
          }
        >
          {state.speciesSelectorActivationFlag ? (
            isListView ? (
              <CropTableComponent
                cropData={cropData}
                setCropData={setCropData}
                // activeCropData={
                //   activeCropData.length > 0 ? activeCropData : cropData
                // }
                activeCropData={activeCropData}
                setActiveCropData={setActiveCropData}
                inactiveCropData={inactiveCropData}
                setInactiveCropData={setInactiveCropData}
                showGrowthWindow={showGrowthWindow}
                sortAllGoals={setSortAllGoals}
                sortAllCrops={sortCropsBy}
                sortPreference={sortPreference}
              />
            ) : (
              <CropCalendarViewComponent
                cropData={cropData}
                activeCropData={activeCropData}
                setActiveCropData={setActiveCropData}
                inactiveCropData={inactiveCropData}
                setInactiveCropData={setInactiveCropData}
                showGrowthWindow={showGrowthWindow}
                sortAllGoals={setSortAllGoals}
                sortAllCrops={sortCropsBy}
                sortPreference={sortPreference}
              />
            )
          ) : (
            <MyCoverCropList comparisonView={comparisonView} />
          )}
        </div>
        <ScrollTop {...props}>
          <Fab color="secondary" size="medium" aria-label="scroll back to top">
            <KeyboardArrowUp />
          </Fab>
        </ScrollTop>
      </div>
    </div>
  );
};

export default CropSelector;
