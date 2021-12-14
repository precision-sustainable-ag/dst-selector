/*
  This file contains the GoalsSelector component, helper functions, and styles
  The GoalsSelector is the window where the user selects their goals
  Styles are created using makeStyles
*/

// TODO: Goal tags are not responsive!
import { makeStyles, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/Store";
import "../../styles/goalsSelector.scss";
import GoalTag from "./GoalTag";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const goalSkeletonStyle = {
  height: "50px",
  width: "100%",
  borderRadius: "10px",
};

const GoalsSelector = () => {
  const [state] = useContext(Context);
  const classes = useStyles();
  const [allGoals, setAllGoals] = useState([{}]);

  useEffect(() => {
    if (state.allGoals.length > 0) {
      const filteredGoals = state.allGoals.filter(
        (goal) =>
          goal.fields["Variable"].toLowerCase() !== "promote water quality"
      );
      setAllGoals(filteredGoals);
    }
  }, [state.allGoals]);

  return (
    <div className="container-fluid mt-5">
      <div
        className="row boxContainerRow goalsContainer"
        style={{ height: "520px" }}
      >
        <div className="col-12 goalsBoxContainer">
          <Typography variant="h4" gutterBottom>
            What are your cover cropping goals?
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="secondary"
            gutterBottom
          >
            Select up to three. Hover for more information
          </Typography>
          {allGoals.length === 0 ? (
            <div className="goals col-lg-12">
              <div className="row">
                <div className="col-3">
                  <Skeleton style={goalSkeletonStyle} />
                </div>
                <div className="col-3">
                  <Skeleton style={goalSkeletonStyle} />
                </div>
                <div className="col-3">
                  <Skeleton style={goalSkeletonStyle} />
                </div>
                <div className="col-3">
                  <Skeleton style={goalSkeletonStyle} />
                </div>
              </div>
            </div>
          ) : (
            <div
              className="goals row pt-4"
              style={{ justifyContent: "center" }}
            >
              {allGoals[0].fields ? (
                allGoals.map((goal, key) => (
                  <div key={key} className={`${classes.root} col`}>
                    <GoalTag
                      goal={goal}
                      id={key}
                      goaltTitle={goal.fields["Variable"]}
                      goalDescription={goal.fields["Description"]}
                      valuesDescriptions={goal.fields["Values Description"]}
                    />
                  </div>
                ))
              ) : (
                <Skeleton style={goalSkeletonStyle} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalsSelector;
