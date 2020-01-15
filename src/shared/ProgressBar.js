import React from "react";
// import { LightButton } from "./constants";
import { Context } from "../store/Store";
import "../styles/progressIndicator.scss";

const ProgressBar = () => {
  const [state, dispatch] = React.useContext(Context);
  return (
    <div className="gprogress">
      <div className="progress-track">1/4</div>
      <div className="progress-diagram">
        <div
          id="step1"
          className="progress-step"
          style={
            state.progress !== 1
              ? { backgroundColor: "#f0f7eb", color: "black" }
              : { backgroundColor: "#8abc62" }
          }
        ></div>

        <div
          id="step2"
          className="progress-step"
          style={
            state.progress !== 2
              ? { backgroundColor: "#f0f7eb", color: "black" }
              : { backgroundColor: "#8abc62" }
          }
        ></div>

        <div
          id="step3"
          className="progress-step"
          style={
            state.progress !== 3
              ? { backgroundColor: "#f0f7eb", color: "black" }
              : { backgroundColor: "#8abc62" }
          }
        ></div>

        <div
          id="step4"
          className="progress-step"
          style={
            state.progress !== 4
              ? { backgroundColor: "#f0f7eb", color: "black" }
              : { backgroundColor: "#8abc62" }
          }
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
