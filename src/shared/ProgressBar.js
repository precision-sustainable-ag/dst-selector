/*
  This file contains the ProgressBar component
  The ProgressBar shows the user what step they are on in the goal selection process
*/

import { Typography } from '@mui/material';
import React, { useContext } from 'react';
import { Context } from '../store/Store';
import '../styles/progressIndicator.scss';

const checkProgressStatus = (actualProgress, expectedProgress) => {
  if (actualProgress === expectedProgress) {
    // exact progress
    return 'progress-step active';
  } if (actualProgress > expectedProgress) {
    return 'progress-step active';
  }
  return 'progress-step';
};

const ProgressBar = () => {
  const { state } = useContext(Context);
  return (
    <div className="gprogress">
      <Typography variant="body1" className="progress-track" component="div">
        Question
        {' '}
        {state.councilLabel === 'Midwest' && state.progress >= 3 ? state.progress - 1 : state.progress}
        {' '}
        {state.councilLabel === 'Midwest' ? 'of 3' : 'of 4'}
      </Typography>
      <div className="progress-diagram">
        <div id="step1" className={checkProgressStatus(state.progress, 1)} />

        {state.councilLabel !== 'Midwest' && <div id="step2" className={checkProgressStatus(state.progress, 2)} />}

        <div id="step3" className={checkProgressStatus(state.progress, 3)} />

        <div id="step4" className={checkProgressStatus(state.progress, 4)} />
      </div>
    </div>
  );
};

export default ProgressBar;
