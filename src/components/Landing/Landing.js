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
        <aside className="text-left">
          <h2>Welcome to the NECCC Cover Crop Decision Support Tools</h2>
          <p>
            You are currently interacting with a Beta version of the Cover Crop
            The purpose of this interaction is so that we may gather feedback
            about the usability and usefulness of these tools. Technically, this
            is called a “high-fidelity prototype”. “High fidelity”, because it’s
            made to look and feel like the actual tool that we will build this
            Winter. “Prototype”, because it’s meant for testing with potential
            users of the tools.
          </p>
          <p>
            {" "}
            The cover crop data you will see originated in the Midwest Cover
            Crops Council (MCCC) species selector tool, the USDA Plants
            database, and a seeding rate calculator developed by NY NRCS. It has
            been reviewed by cover crop experts in the Northeast in each USDA
            plant hardiness zone. Please note: these data are still being
            finalized and are shown here as a preview.
          </p>
          <p className="mt-4">
            {" "}
            Thank you for your time and consideration. We look forward to your
            feedback and hope to build a pleasant cover crop tool experience
            that helps you to effectively select and manage your cover crops.
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
