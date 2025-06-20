/*
  This file contains the GoalTag component, helper functions, and styles
  The GoalTag is individual goal tag inside the goal selector window
*/

import { Avatar, Chip } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PSATooltip } from 'shared-react-components/src';
import { addSelectedGoals, updateSelectedGoal } from '../../../reduxStore/goalSlice';
import { historyState, setHistoryState } from '../../../reduxStore/userSlice';
import pirschAnalytics from '../../../shared/analytics';

// TODO: Whats up with goalt?? we need to look into fixing this.
const GoalTag = ({
  goaltTitle, goalDescription, goal, id, selectedGoalIndex,
}) => {
  const dispatchRedux = useDispatch();
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const historyStateRedux = useSelector((stateRedux) => stateRedux.userData.historyState);

  const key = id;
  const goalTitle = goaltTitle;

  const updateSelectedGoals = () => {
    // update history state here
    if (historyStateRedux === historyState.imported) dispatchRedux(setHistoryState(historyState.updated));
    const goals = [...selectedGoalsRedux];

    if (goals.indexOf(goal.label) === -1) {
      // does not exist, dispatch to state and add to local state
      dispatchRedux(addSelectedGoals(goal.label));
      pirschAnalytics('Goals', { meta: { goal: goal.label } });
    } else {
      // exists, remove it from the state and update the state
      const index = goals.indexOf(goal.label);
      goals.splice(index, 1);

      // make it lighter on the ui
      dispatchRedux(updateSelectedGoal(goals));
    }
  };

  return (
    <PSATooltip
      enterDelay={1000}
      enterNextDelay={1000}
      id={`tooltip-${id}`}
      placement="top"
      arrow
      title={goalDescription}
      key={`tooltip${key}`}
      tooltipContent={(
        <span>
          <Chip
            disabled={selectedGoalsRedux.length >= 3 ? !selectedGoalsRedux.includes(goalTitle) : false}
            color={selectedGoalsRedux.includes(goalTitle) ? 'primary' : 'secondary'}
            avatar={
              selectedGoalsRedux.length !== 0 && selectedGoalsRedux.includes(goalTitle) ? (
                <Avatar id={`avatar${key}`}>{selectedGoalIndex}</Avatar>
              ) : null
            }
            label={goalTitle}
            onClick={updateSelectedGoals}
            key={`chip${key}`}
            id={`chip${key}`}
            size="medium"
            data-test={`goal-tag-${key}`}
            sx={{
              '&.MuiChip-root:focus': {
                boxShadow: 'none',
                '&.Mui-disabled': {
                  color: '#757575',
                },
              },
              '&.Mui-disabled': {
                opacity: 1,
                color: '#757575',
              },
            }}
          />
        </span>
      )}
    />
  );
};

export default GoalTag;
