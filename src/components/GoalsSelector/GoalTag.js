import React, { useContext, useState, useEffect } from "react";
import { Badge, Chip, Tooltip, Avatar } from "@material-ui/core";
import { Context } from "../../store/Store";

const GoalTag = (props) => {
  const [state, dispatch] = useContext(Context);

  let goalDescription = props.goalDescription;
  let goalTitle = props.goaltTitle;
  let key = props.id;
  let goal = props.goal;

  useEffect(() => {
    if (state.selectedGoals.length > 0) {
      state.selectedGoals.forEach((val, index) => {
        document
          .getElementsByClassName(val.toUpperCase())[0]
          .classList.add("active");
      });
    }
  }, []);
  const updateSelectedGoals = (item, key) => {
    const goals = [...state.selectedGoals];

    if (goals.indexOf(item.fields["Cover Crop Goal"]) === -1) {
      // does not exist, dispatch to state and add to local state

      document.getElementById(`chip${key}`).classList.add("active");
      dispatch({
        type: "ADD_SELECTED_GOALS",
        data: item.fields["Cover Crop Goal"],
      });

      //   document.getElementById(`avatar${key}`).innerHTML =
    } else {
      // exists, remove it from the state and update the state
      let index = goals.indexOf(item.fields["Cover Crop Goal"]);
      goals.splice(index, 1);

      // make it lighter on the ui

      document.getElementById(`chip${key}`).classList.remove("active");

      dispatch({
        type: "UPDATE_SELECTED_GOALS",
        data: goals,
      });
    }
  };
  return (
    <Tooltip
      enterDelay={1000}
      enterNextDelay={1000}
      id={`tooltip-${props.id}`}
      placement="top-end"
      arrow
      title={
        <div className="tooltipTextContainer text-center">
          <p>{goalDescription}</p>
        </div>
      }
      key={`tooltip${key}`}
    >
      <Chip
        disabled={
          state.selectedGoals.length >= 3
            ? state.selectedGoals.includes(goalTitle)
              ? false
              : true
            : false
        }
        avatar={
          state.selectedGoals.length !== 0 &&
          state.selectedGoals.includes(goalTitle) ? (
            <Avatar id={`avatar${key}`}>
              {state.selectedGoals.indexOf(goalTitle) + 1}
            </Avatar>
          ) : (
            <Avatar className="d-none"></Avatar>
          )
        }
        // style={{ textAlign: "left" }}
        label={goalTitle.toUpperCase()}
        onClick={() => updateSelectedGoals(goal, key)}
        key={`chip${key}`}
        id={`chip${key}`}
        size="medium"
        variant="outlined"
        // color={"primary"}
        className={`goal enabled ${goalTitle.toUpperCase()}`}
      />
    </Tooltip>
  );
};

export default GoalTag;
