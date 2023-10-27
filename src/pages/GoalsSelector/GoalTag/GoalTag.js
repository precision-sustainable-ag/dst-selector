/*
  This file contains the GoalTag component, helper functions, and styles
  The GoalTag is individual goal tag inside the goal selector window
*/

import { Avatar, Chip, Tooltip } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedGoals, updateSelectedGoal } from '../../../reduxStore/goalSlice';
// TODO: Whats up with goalt?? we need to look into fixing this.
const GoalTag = ({
  goaltTitle, goalDescription, goal, id,
}) => {
  const dispatchRedux = useDispatch();
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const key = id;
  const goalTitle = goaltTitle;

  useEffect(() => {
    if (selectedGoalsRedux.length > 0) {
      selectedGoalsRedux.forEach((val) => {
        document.getElementsByClassName(val.toUpperCase())[0].classList.add('active');
      });
    }
  }, [selectedGoalsRedux]);

  const updateSelectedGoals = (item, k) => {
    const goals = [...selectedGoalsRedux];

    if (goals.indexOf(item.label) === -1) {
      // does not exist, dispatch to state and add to local state

      document.getElementById(`chip${k}`).classList.add('active');
      dispatchRedux(addSelectedGoals(item.label));
    } else {
      // exists, remove it from the state and update the state
      const index = goals.indexOf(item.label);
      goals.splice(index, 1);

      // make it lighter on the ui
      document.getElementById(`chip${k}`).classList.remove('active');
      dispatchRedux(updateSelectedGoal(goals));
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
        <p>{`${goalDescription}`}</p>
      )}
      key={`tooltip${key}`}
    >
      <span>
        <Chip
          disabled={
            selectedGoalsRedux.length >= 3
              ? !selectedGoalsRedux.includes(goalTitle)
              : false
          }
          sx={{
            backgroundColor: selectedGoalsRedux.includes(goalTitle) ? '#598444' : '#f0f7eb',
            fontWeight: 600,
          }}
          avatar={
          selectedGoalsRedux.length !== 0 && selectedGoalsRedux.includes(goalTitle) ? (
            <Avatar id={`avatar${key}`}>{selectedGoalsRedux.indexOf(goalTitle) + 1}</Avatar>
          ) : (
            <Avatar className="d-none" />
          )
        }
          label={goalTitle}
          onClick={() => updateSelectedGoals(goal, key)}
          key={`chip${key}`}
          id={`chip${key}`}
          size="medium"
          variant="outlined"
          className={`goal enabled ${goalTitle.toUpperCase()}`}
        />
      </span>
    </Tooltip>
  );
};

export default GoalTag;
