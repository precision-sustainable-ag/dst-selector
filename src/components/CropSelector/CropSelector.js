/*
  This file contains the CropSelector and its styles.
  The CropSelector is the top level component for the crop selector tool and allows users to choose crops based on their needs.
  Styles are created using makeStyles.
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
import { Context } from "../../store/Store";
import "../../styles/cropSelector.scss";
import MyCoverCropList from "../MyCoverCropList/MyCoverCropList";
import CropCalendarViewComponent from "./CropCalendarView";
import CropSidebarComponent from "./CropSidebar";
import CropTableComponent from "./CropTable";
import ReactGA from "react-ga";
const _ = require("lodash");

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const ScrollTop = (props) => {
  const { children } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 180,
  });
  const handleBackToTopClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      ".topHeader"
    );
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
  const {state, dispatch} = useContext(Context);
  let [showGrowthWindow, setShowGrowthWindow] = useState(true);
  const [sortPreference, setSortPreference] = useState("desc");
  const { selectedGoals } = state;

  const activeCropData = state.activeCropData;

  // toggles list view and calendar view
  let [isListView, setIsListView] = useState(true);

  const [comparisonView, setComparisonView] = useState(false);
  // reset back to false

  const [cropData, setCropData] = useState([]);
  useEffect(() => {
    if (state.consent === true) {
      console.log("viewing selector");
      ReactGA.initialize("UA-181903489-1");

      ReactGA.pageview("cover crop selector");
    }
  }, [state.consent]);

  const sortEnvTolCropData = (objDataArr) => {
    if (cropData.length !== 0) {
      let crop_data = cropData;

      let objData = objDataArr.map((obj) => {
        return `fields.${obj}`;
      });

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

  const [cropDataChanged, setCropDataChanged] = useState(false);

  useEffect(() => {
    setCropDataChanged((c) => !c);
  }, [state.cropData]);

  const sortCropsBy = (orderBy) => {
    if (state.cropData.length > 0) {
      // const { selectedGoals } = state;
      if (selectedGoals.length > 0) {
        let activeCropDataCopy = activeCropData.length > 0 ? activeCropData : state.cropData;
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
              dispatch({
                type: "UPDATE_ACTIVE_CROP_DATA",
                data: {
                  value: updatedCropData,
                },
              });
            }
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
              dispatch({
                type: "UPDATE_ACTIVE_CROP_DATA",
                data: {
                  value: updatedCropData,
                },
              });
            }
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

        if (selectedGoals.length > 0) {
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
  }, [state.cropData, selectedGoals]);

  const toggleListView = () => {
    setIsListView(!isListView);
  };

  const toggleComparisonView = () => {
    setComparisonView(!comparisonView);
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
  }, [state.selectedGoals, dispatch]);

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
            cropDataChanged={cropDataChanged}
            comparisonView={comparisonView}
            toggleComparisonView={toggleComparisonView}
            toggleListView={toggleListView}
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
                activeCropData={activeCropData}
                showGrowthWindow={showGrowthWindow}
                sortAllCrops={sortCropsBy}
                sortPreference={sortPreference}
              />
            ) : (
              <CropCalendarViewComponent
                cropData={cropData}
                activeCropData={activeCropData}
                showGrowthWindow={showGrowthWindow}
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
  )
};

export default CropSelector;
