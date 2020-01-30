import React, { useContext, useState, Fragment } from "react";
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
  // Button,
  IconButton
} from "@material-ui/core";
import { List, arrayMove } from "react-movable";

import { ExpandMore, CalendarToday } from "@material-ui/icons";

import "../../styles/cropSelector.scss";
import CropTableComponent from "./CropTable";
import ListIcon from "@material-ui/icons/List";
import MyCoverCropList from "../MyCoverCropList/MyCoverCropList";
import CropCalendarViewComponent from "./CropCalendarView";

const CropSelector = () => {
  const [state, dispatch] = useContext(Context);
  // let [isExpansionExpanded, setIsExpansionExpanded] = useState(true);
  let [showGrowthWindow, setShowGrowthWindow] = useState(true);

  // let [isListView, setIsListView] = useState(true);

  // TODO: set list view as default. Calendar component is activated currently
  let [isListView, setIsListView] = useState(false);

  // useEffect(() => {
  //   if (state.speciesSelectorActivationFlag) {
  //     setIsExpansionExpanded(false);
  //   } else {
  //     setIsExpansionExpanded(true);
  //   }
  //   // return isExpansionExpanded;
  // }, [isExpansionExpanded]);
  const updateSelectedGoals = (newGoalArr, oldIndex, newIndex) => {
    let newGoals = arrayMove(newGoalArr, oldIndex, newIndex);

    dispatch({
      type: "DRAG_GOALS",
      data: {
        selectedGoals: newGoals,
        snackOpen: true,
        snackMessage: "Goal Priority Changed"
      }
    });
  };

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
            <div className="col-lg-6 col-sm-12 pl-5">
              <div className="iconsWrapper">
                {state.myCoverCropActivationFlag ? (
                  <Fragment>
                    <div className="iconToggle">
                      <IconButton
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
                      </IconButton>
                    </div>
                    <small>LIST VIEW</small>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className="iconToggle">
                      <IconButton
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
                      </IconButton>
                    </div>
                    <small className="mt-2">
                      {isListView ? "LIST VIEW" : "CALENDAR VIEW"}
                    </small>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row cropSelectorRow mt-2">
        <div className="col-lg-2">
          <div className="sidebarTitle">
            <Typography variant="body1">FILTER</Typography>
          </div>
          <div className="sidebarContents">
            <ExpansionPanel
              className="sideBar"
              expanded={state.myCoverCropActivationFlag ? false : true}
              // onTouchEnd={() => {
              //   setIsExpansionExpanded(!isExpansionExpanded);
              // }}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  className="sidePanelCollapsibleHeading"
                  variant="subtitle1"
                >
                  COVER CROP GOALS
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div>
                  <Typography variant="subtitle1" className="mb-2">
                    {state.selectedGoals.length === 0
                      ? ""
                      : "Goal Priority Order"}
                  </Typography>
                  <List
                    values={state.selectedGoals}
                    onChange={({ oldIndex, newIndex }) =>
                      updateSelectedGoals(
                        state.selectedGoals,
                        oldIndex,
                        newIndex
                      )
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
                  <Typography variant="subtitle1" className="mt-2">
                    {state.selectedGoals.length === 0
                      ? "No goals selected"
                      : "Drag to reorder, click to edit"}
                  </Typography>

                  {/* ))} */}
                  {/* </ul> */}
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel className="sideBar">
              <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1b-content"
                id="panel1b-header"
              >
                <Typography className="sidePanelCollapsibleHeading">
                  CASH CROP
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap"
                }}
              >
                <p>Details for Cash Crops</p>
                <div>
                  <FormControl>
                    <FormGroup>
                      <FormControlLabel
                        value="yes"
                        control={
                          <Checkbox
                            checked={showGrowthWindow}
                            color="primary"
                            onClick={() =>
                              setShowGrowthWindow(!showGrowthWindow)
                            }
                          />
                        }
                        label="Show growth window"
                        labelPlacement="end"
                      />
                    </FormGroup>
                  </FormControl>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              className="sideBar"
              expanded={state.myCoverCropActivationFlag ? true : false}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1c-content"
                id="panel1c-header"
              >
                <Typography className="sidePanelCollapsibleHeading">
                  COVER CROP FILTERS
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className="coverCropFiltersWrapper">
                <ul>
                  <li
                    onClick={() => expandCoverCropFilter(0)}
                    id="cropFilterList0"
                  >
                    Agronomic
                  </li>
                  <li
                    id="cropFilterList1"
                    onClick={() => expandCoverCropFilter(1)}
                    className="active"
                  >
                    Environmental Tolerance
                    <div className="show">
                      <FormControlLabel
                        control={<Checkbox value="checkedC" />}
                        label={<small>HEAT</small>}
                      />
                    </div>
                    <div className="show">
                      <FormControlLabel
                        control={<Checkbox value="checkedC" />}
                        label={<small>Drought</small>}
                      />
                    </div>
                    <div className="show">
                      <FormControlLabel
                        control={<Checkbox value="checkedC" />}
                        label={<small>Shade</small>}
                      />
                    </div>
                    <div className="show">
                      <FormControlLabel
                        control={<Checkbox value="checkedC" />}
                        label={<small>Flood</small>}
                      />
                    </div>
                    <div className="show">
                      <FormControlLabel
                        control={<Checkbox value="checkedC" />}
                        label={<small>Low Fertility</small>}
                      />
                    </div>
                    <div className="show">
                      <FormControlLabel
                        control={<Checkbox value="checkedC" />}
                        label={<small>Salinity</small>}
                      />
                    </div>
                    <div className="show">
                      <FormControlLabel
                        control={<Checkbox value="checkedC" />}
                        label={<small>Winter Survival</small>}
                      />
                    </div>
                  </li>
                  <li
                    id="cropFilterList2"
                    onClick={() => expandCoverCropFilter(2)}
                  >
                    Soil Conditions
                  </li>
                  <li
                    id="cropFilterList3"
                    onClick={() => expandCoverCropFilter(3)}
                  >
                    Growth
                  </li>
                  <li
                    id="cropFilterList4"
                    onClick={() => expandCoverCropFilter(4)}
                  >
                    Planting &amp; Termination
                  </li>
                  <li
                    id="cropFilterList5"
                    onClick={() => expandCoverCropFilter(5)}
                  >
                    Grazers &amp; Pollinators
                  </li>
                  <li
                    id="cropFilterList6"
                    onClick={() => expandCoverCropFilter(6)}
                  >
                    Pests &amp; Disease
                  </li>
                </ul>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </div>
        <div className="col-lg-10">
          {state.speciesSelectorActivationFlag ? (
            isListView ? (
              <CropTableComponent />
            ) : (
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
