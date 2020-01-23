import React from "react";
// import { LightButton } from "./constants";
import { Context } from "../store/Store";
import "../styles/progressIndicator.scss";

const ProgressBar = () => {
  const [state, dispatch] = React.useContext(Context);
  return (
    <div className="gprogress">
      <div className="progress-track">Question {state.progress} of 4</div>
      <div className="progress-diagram">
        <div
          id="step1"
          className={
            state.progress !== 1 ? `progress-step` : `progress-step active`
          }
        ></div>

        <div
          id="step2"
          className={
            state.progress !== 2 ? `progress-step` : `progress-step active`
          }
        ></div>

        <div
          id="step3"
          className={
            state.progress !== 3 ? `progress-step` : `progress-step active`
          }
        ></div>

        <div
          id="step4"
          className={
            state.progress !== 4 ? `progress-step` : `progress-step active`
          }
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
