/*
  This file contains the ProgressBar component
  The ProgressBar shows the user what step they are on in the goal selection process
*/

import { Typography } from "@material-ui/core";
import React from "react";
// import { LightButton } from "./constants";
import { Context } from "../store/Store";
import "../styles/progressIndicator.scss";

const checkProgressStatus = (actualProgress, expectedProgress) => {
  if (actualProgress === expectedProgress) {
    // exact progress
    return "progress-step active";
  } else if (actualProgress > expectedProgress) {
    return "progress-step active";
  } else {
    return "progress-step";
  }
};

const ProgressBar = () => {
  const [state, dispatch] = React.useContext(Context);
  return (
    <div className="gprogress">
      <Typography variant="body1" className="progress-track" component="div">
        Question {state.progress} of 4
      </Typography>
      <div className="progress-diagram">
        <div
          id="step1"
          className={checkProgressStatus(state.progress, 1)}
        ></div>

        <div
          id="step2"
          className={checkProgressStatus(state.progress, 2)}
        ></div>

        <div
          id="step3"
          className={checkProgressStatus(state.progress, 3)}
        ></div>

        <div
          id="step4"
          className={checkProgressStatus(state.progress, 4)}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
