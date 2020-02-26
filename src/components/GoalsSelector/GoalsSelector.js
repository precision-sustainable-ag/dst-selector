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

  const goalsURL =
    "https://api.airtable.com/v0/appC47111lCOTaMYe/Cover%20Crop%20Goals?maxRecords=300";
  const headers = new Headers();

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    dispatch({
      type: "SET_AJAX_IN_PROGRESS",
      data: true
    });
    headers.append("Authorization", "Bearer keywdZxSD9AC4vL6e");
    await fetch(goalsURL, { headers: headers })
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
          <h1>What are your cover cropping goals</h1>
        </div>
        <div className="col-lg-12">
          <p>Select up to three. Hover for more information</p>
        </div>
        {state.ajaxInProgress ? (
          <div className="goals col-lg-12">
            <CircularProgress />
          </div>
        ) : (
          <div className="goals row">
            {state.allGoals.length > 0 ? (
              state.allGoals.map((goal, key) =>
                !goal.fields["Cover Crop Goal"].startsWith("TBD") ? (
                  <div key={key} className={classes.root}>
                    {/* //   <Badge badgeContent={4} color="primary"> */}
                    {/* updateSelectedGoals(goal, key) */}
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
