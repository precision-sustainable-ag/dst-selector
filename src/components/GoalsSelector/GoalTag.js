import React, { useContext, useState } from "react";
import { Badge, Chip, Tooltip, Avatar } from "@material-ui/core";
import { Context } from "../../store/Store";

const GoalTag = props => {
  const [state, dispatch] = useContext(Context);

  let goalDescription = props.goalDescription;
  let goalTitle = props.goaltTitle;
  let key = props.id;
  let goal = props.goal;

  const updateSelectedGoals = (item, key) => {
    const goals = [...state.selectedGoals];

    if (goals.indexOf(item.fields["Cover Crop Goal"]) === -1) {
      // does not exist, dispatch to state and add to local state

      document.getElementById(`chip${key}`).classList.add("active");
      dispatch({
        type: "ADD_SELECTED_GOALS",
        data: item.fields["Cover Crop Goal"]
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
        data: goals
      });
    }
  };
  return (
    <Tooltip
      interactive
      arrow
      title={
        <div className="tooltipTextContainer">
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
            ""
          )
        }
        style={{ textAlign: "left" }}
        label={goalTitle.toUpperCase()}
        onClick={() => updateSelectedGoals(goal, key)}
        key={`chip${key}`}
        id={`chip${key}`}
        size="medium"
        variant="outlined"
        className="goal enabled"
      />
    </Tooltip>
  );
};

export default GoalTag;
