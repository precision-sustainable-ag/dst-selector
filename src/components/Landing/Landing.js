import React, { useContext } from "react";
import "../../styles/landing.scss";
import { Context } from "../../store/Store";
// import { Typography, Button } from "@material-ui/core";
import { LightButton } from "../../shared/constants";

const setWrapperStyle = bg => {
  return {
    background: `url(${bg})`,
    backgroundSize: "cover"
  };
};

const Landing = props => {
  const [state, dispatch] = useContext(Context);

  const incrementProgress = incVal => {
    incVal = parseInt(incVal);
    if (incVal === 1) {
      if (state.progress === 0) {
        dispatch({
          type: "UPDATE_PROGRESS",
          data: {
            type: "INCREMENT"
          }
        });
      }
    }
  };
  return (
    <aside className="landingWrapper" style={setWrapperStyle(props.bg)}>
      <div className="boxWrapper">
        <aside>
          <h2>
            Welcome to the NECCC Cover Crop Decision Support Tools hands-on
            session
          </h2>
          <p>
            You are currently interacting with a visualization of the Cover Crop
            DST user interface. The purpose of this interaction is so we may
            gather feedback about the usability and usefulness of these tools.
            In this exercise, we will walk you through one of the decision
            tools, the Species Selector.{" "}
          </p>
          <p>
            Technically, this is called a “high-fidelity prototype”. “High
            fidelity”, because it’s made to look and feel like the actual tool
            that we will build this Winter. “Prototype”, because it’s meant for
            testing with potential users of the tools.
          </p>
          <p>
            {" "}
            The cover crop data you will see has been created by the NECCC Data
            Verification Team of cover crop experts, the original MCCC species
            selector tool, a seeding rate calculator developd by NRCS NY, and
            several other data sources. Please note: these data are still being
            finalized by NECCC teams for each of the plant hardiness zones. The
            data shown are a preview and are yet to be finalized.
          </p>
          <p className="mt-4">
            {" "}
            Thank you for your time and consideration. We look forward to your
            feedback and hope to build a pleasant cover crop tool experience for
            you to effectively select and manage your cover crops.
          </p>
        </aside>
        <div className="nextButton pt-4">
          {/* <button onClick={() => incrementProgress(1)}>NEXT</button> */}
          <LightButton onClick={() => incrementProgress(1)}>NEXT</LightButton>
        </div>
      </div>
    </aside>
  );
};

export default Landing;
