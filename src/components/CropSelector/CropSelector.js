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
  makeStyles
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
  // let [isListView, setIsListView] = useState(true);

  // TODO: set list view as default. Calendar component is activated currently
  let [isListView, setIsListView] = useState(true);

  const [cropData, setCropData] = useState([]);

  const sortEnvTolCropData = objData => {
    if (cropData.length !== 0) {
      let crop_data = cropData;

      // console.log(objData);
      const activeObjKeys = _.keys(_.pickBy(objData));
      activeObjKeys.forEach((val, index) => {
        //  Crop Data is inside cropData.fields
        activeObjKeys[index] = `fields.${val}`;
      });

      if (activeObjKeys.length > 0) {
        // some values are truthy
        console.log(activeObjKeys);
        // console.log(crop_data);
        let updatedCropData = _.sortBy(crop_data, activeObjKeys);
        console.log(updatedCropData[0].fields);
        setCropData(updatedCropData);
      } else {
        // reset! none are true
        setCropData(state.cropData);
      }
    }
  };

  useEffect(() => {
    setCropData(state.cropData);
  }, [state.cropData]);

  const expandCoverCropFilter = id => {
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
              <div className="">
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
                    <div className="iconToggle">
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
                    <div className="iconToggle">
                      {/* <IconButton
                        className={isListView ? `iconActive` : ""}
                        onClick={toggleListView}
                      >
                        <ListIcon style={{ fontSize: "larger" }} />
                      </IconButton>
                    </div>
                    <div className="iconToggle">
                      <IconButton
                        className={isListView ? `` : `iconActive`}
                        onClick={toggleListView}
                      >
                        <CalendarToday style={{ fontSize: "larger" }} />
                      </IconButton> */}
                      {/* <Typography component="div" variant="body1">
                        <IconButton
                          color={"secondary"}
                          className={`iconActive`}
                          onClick={toggleListView}
                        >
                          {isListView ? (
                            <ListIcon style={{ fontSize: "larger" }} />
                          ) : (
                            <CalendarToday style={{ fontSize: "larger" }} />
                          )}
                        </IconButton>
                        {isListView ? "LIST VIEW" : "CALENDAR VIEW"}
                      </Typography> */}
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
                    {/* <small className="mt-2">
                      {isListView ? "LIST VIEW" : "CALENDAR VIEW"}
                    </small> */}
                  </Fragment>
                )}
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
          />
        </div>

        <div className="col-lg-10">
          {state.speciesSelectorActivationFlag ? (
            isListView ? (
              <CropTableComponent
                cropData={cropData}
                showGrowthWindow={showGrowthWindow}
                sortAllGoals={setSortAllGoals}
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
          {/* {renderRelevantComponent} */}
          {/* {isListView ? (
            state.myCoverCropActivationFlag ? (
              <MyCoverCropList />
            ) : (
              <CropTableComponent />
            )
          ) : (
            <CropCalendarViewComponent />
          )} */}
          {/* {state.myCoverCropActivationFlag ? (
            <MyCoverCropList />
          ) : (
            <CropTableComponent />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default CropSelector;
