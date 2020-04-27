// TODO: Goal tags are not responsive!
import React, { useContext, useEffect, Fragment, useState } from "react";
import { Context } from "../../store/Store";

import "../../styles/goalsSelector.scss";
import {
  Tooltip,
  Chip,
  CircularProgress,
  Badge,
  makeStyles
} from "@material-ui/core";

import Skeleton from "@material-ui/lab/Skeleton";
import GoalTag from "./GoalTag";
import { airtableAPIURL } from "../../shared/constants";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

const GoalsSelector = () => {
  const [state, dispatch] = useContext(Context);
  const classes = useStyles();

  const goalsURL = "/Cover%20Crop%20Goals?maxRecords=300";
  // let zone = parseInt(state.zone);

  //   if (zone === 7) airtableUrl = airtableAPIURL.Z7;
  //   else if (zone === 6) airtableUrl = airtableAPIURL.Z6;
  //   else if (zone === 5) airtableUrl = airtableAPIURL.Z5;
  //   else airtableUrl = airtableAPIURL.Z7;
  // console.log(`Zone ${zone} data loaded`);
  const headers = new Headers();

  useEffect(() => {
    // if (state.allGoals.length === 0) {
    console.log("fetching goals..");

    // }
    let zone = parseInt(state.zone);
    // let airtableURL = "https://api.airtable.com/v0/appC47111lCOTaMYe";
    if (zone === 7) fetchGoals(airtableAPIURL.Z7);
    else if (zone === 6) fetchGoals(airtableAPIURL.Z6);
    else if (zone === 5) fetchGoals(airtableAPIURL.Z5);
    else fetchGoals(airtableAPIURL.Z7);
  }, [state.zone]);

  const fetchGoals = async apiBase => {
    let finalGoalsURL = apiBase + goalsURL;
    console.log(finalGoalsURL);
    dispatch({
      type: "SET_AJAX_IN_PROGRESS",
      data: true
    });
    headers.append("Authorization", "Bearer ***REMOVED***");
    await fetch(finalGoalsURL, { headers: headers })
      .then(response => {
        return response.json();
      })
      .then(response => {
        dispatch({
          type: "ADD_GOALS",
          data: response.records
        });
      })
      .then(() => {
        dispatch({
          type: "SET_AJAX_IN_PROGRESS",
          data: false
        });
      });
  };

  return (
    <div className="goalsContainer mt-5">
      <div className="row boxContainerRow goalsBoxContainer">
        <div className="col-lg-12">
          <h1 className="text-center">What are your cover cropping goals</h1>
        </div>
        <div className="col-lg-12">
          <p className="text-center">
            Select up to three. Hover for more information
          </p>
        </div>
        {state.ajaxInProgress ? (
          <div className="goals col-lg-12">
            <CircularProgress />
          </div>
        ) : (
          <div className="goals row" style={{ justifyContent: "center" }}>
            {state.allGoals.length > 0 ? (
              state.allGoals.map((goal, key) =>
                !goal.fields["Cover Crop Goal"].startsWith("TBD") ? (
                  <div key={key} className={classes.root}>
                    <GoalTag
                      goal={goal}
                      id={key}
                      goaltTitle={goal.fields["Cover Crop Goal"]}
                      goalDescription={goal.fields["Description"]}
                    />
                  </div>
                ) : (
                  ""
                )
              )
            ) : (
              <Skeleton
                animation="pulse"
                height="100"
                width="100"
                variant="rect"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalsSelector;
