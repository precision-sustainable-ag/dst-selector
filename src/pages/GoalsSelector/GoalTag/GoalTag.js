/*
  This file contains the GoalTag component, helper functions, and styles
  The GoalTag is individual goal tag inside the goal selector window
*/

import { Avatar, Chip, Tooltip } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { Context } from '../../../store/Store';
import { addSelectedGoals, updateSelectedGoal } from '../../../reduxStore/goalSlice';
import { useDispatch } from 'react-redux';
// TODO: Whats up with goalt?? we need to look into fixing this.
const GoalTag = ({
  goaltTitle, goalDescription, goal, id,
}) => {
  const { state, dispatch } = useContext(Context);
  const dispatchRedux = useDispatch();
  const key = id;
  const goalTitle = goaltTitle;

  useEffect(() => {
    if (state.selectedGoals.length > 0) {
      state.selectedGoals.forEach((val) => {
        document.getElementsByClassName(val.toUpperCase())[0].classList.add('active');
      });
    }
  }, [state.selectedGoals]);

  const updateSelectedGoals = (item, k) => {
    const goals = [...state.selectedGoals];

    if (goals.indexOf(item.label) === -1) {
      // does not exist, dispatch to state and add to local state

      document.getElementById(`chip${k}`).classList.add('active');
      dispatchRedux(addSelectedGoals(item.label));
      // dispatch({
      //   type: 'ADD_SELECTED_GOALS',
      //   data: item.label,
      // });
    } else {
      // exists, remove it from the state and update the state
      const index = goals.indexOf(item.label);
      goals.splice(index, 1);

      // make it lighter on the ui
      document.getElementById(`chip${k}`).classList.remove('active');

      dispatchRedux(updateSelectedGoal(goals));
      // dispatch({
      //   type: 'UPDATE_SELECTED_GOALS',
      //   data: goals,
      // });
    }
  };
  return (
    <Tooltip
      enterDelay={1000}
      enterNextDelay={1000}
      id={`tooltip-${id}`}
      placement="top"
      arrow
      title={(
        <div className="filterTooltip">
          {/* <p>{`${goalDescription} ${valuesDescriptions}`}</p> */}
          <p>{`${goalDescription}`}</p>
        </div>
      )}
      key={`tooltip${key}`}
    >
      <span>
        <Chip
          disabled={
          state.selectedGoals.length >= 3
            ? !state.selectedGoals.includes(goalTitle)
            : false
        }
          avatar={
          state.selectedGoals.length !== 0 && state.selectedGoals.includes(goalTitle) ? (
            <Avatar id={`avatar${key}`}>{state.selectedGoals.indexOf(goalTitle) + 1}</Avatar>
          ) : (
            <Avatar className="d-none" />
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
      </span>
    </Tooltip>
  );
};

export default GoalTag;
