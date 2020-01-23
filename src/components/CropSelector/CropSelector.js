import React, { useContext, useState } from "react";
import { Context } from "../../store/Store";
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  FormGroup,
  FormControl,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import { List, arrayMove } from "react-movable";

import { ExpandMore } from "@material-ui/icons";

import "../../styles/cropSelector.scss";
import CropTableComponent from "./CropTable";
import ListIcon from "@material-ui/icons/List";

const CropSelector = () => {
  const [state, dispatch] = useContext(Context);
  let [isExpansionExpanded, setIsExpansionExpanded] = useState(true);
  let [showGrowthWindow, setShowGrowthWindow] = useState(true);

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
    // this.setState({
    //   selectedGoals: newGoals,
    //   snackOpen: true,
    //   snackMessage: "Goal Priority Changed"
    // });
    // this.setState({
    //   snackOpen: true,
    //   snackMessage: "Please select a valid address first!"
    // });
  };
  return (
    <div className="container-fluid mt-5">
      <div className="row toggleComparisonRow">
        <div className="col-lg-12">
          <div className="iconsWrapper">
            <ListIcon />
          </div>
        </div>
      </div>
      <div className="row cropSelectorRow mt-5">
        <div className="col-lg-2">
          <div className="sidebarTitle">
            <Typography variant="body1">FILTER</Typography>
          </div>
          <div className="sidebarContents">
            <ExpansionPanel
              className="sideBar"
              defaultExpanded={isExpansionExpanded}
              onTouchEnd={() => {
                setIsExpansionExpanded(!isExpansionExpanded);
              }}
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
            <ExpansionPanel className="sideBar">
              <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1c-content"
                id="panel1c-header"
              >
                <Typography className="sidePanelCollapsibleHeading">
                  COVER CROP FILTERS
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                Cover Crop Filters Details
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </div>
        <div className="col-lg-10">
          <CropTableComponent />
        </div>
      </div>
    </div>
  );
};

export default CropSelector;
