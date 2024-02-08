/*
  This file contains the GoalTag component, helper functions, and styles
  The GoalTag is individual goal tag inside the goal selector window
*/

import { Avatar, Chip, Tooltip } from '@mui/material';
import React from 'react';
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

  const updateSelectedGoals = (item) => {
    const goals = [...selectedGoalsRedux];

    if (goals.indexOf(item.label) === -1) {
      // does not exist, dispatch to state and add to local state
      dispatchRedux(addSelectedGoals(item.label));
    } else {
      // exists, remove it from the state and update the state
      const index = goals.indexOf(item.label);
      goals.splice(index, 1);

      // make it lighter on the ui
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
          color={selectedGoalsRedux.includes(goalTitle) ? 'primary' : 'secondary'}
          avatar={
            selectedGoalsRedux.length !== 0 && selectedGoalsRedux.includes(goalTitle) ? (
              <Avatar id={`avatar${key}`}>{selectedGoalsRedux.indexOf(goalTitle) + 1}</Avatar>
            ) : (
              null
            )
          }
          label={goalTitle}
          onClick={() => updateSelectedGoals(goal)}
          key={`chip${key}`}
          id={`chip${key}`}
          size="medium"
          variant="outlined"
        />
      </span>
    </Tooltip>
  );
};

export default GoalTag;
