import React, { useContext } from "react";
import "../../styles/landing.scss";
import { Context } from "../../store/Store";
// import { Typography, Button } from "@material-ui/core";
import { LightButton } from "../../shared/constants";
import { Typography, Box } from "@material-ui/core";

const Landing = (props) => {
  const [state, dispatch] = useContext(Context);
  const height = props.height;
  const backgroundWrapper = {
    background: `url(${props.bg})`,
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    flexDirection: "column",
    paddingLeft: "0px",
    paddingRight: "0px",
  };
  const boxWrapper = {
    paddingBottom: "0px",
    marginBottom: "50px",
    backgroundColor: "rgba(240,247,235,.8)",
    borderRadius: "10px",
    border: "1px solid #598445",
  };

  const incrementProgress = (incVal) => {
    incVal = parseInt(incVal);
    if (incVal === 1) {
      if (state.progress === 0) {
        dispatch({
          type: "UPDATE_PROGRESS",
          data: {
            type: "INCREMENT",
          },
        });
      }
    }
  };
  return (
    <Box
      style={{
        background: `url(${props.bg})`,
        backgroundSize: "cover",
        height: `${height}px`,
        overflow: "hidden",
      }}
    >
      <div className="container-fluid" style={backgroundWrapper}>
        <div className="row boxContainerRow mt-2" style={boxWrapper}>
          <div className="col-12">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <Typography variant="h5" align="center">
                    Welcome to the Northeast Cover Crop Species Selector Tool
                  </Typography>
                </div>
                <div className="row pt-4 text-left">
                  <div className="col-12">
                    <Typography
                      variant="body1"
                      gutterBottom
                      style={{ paddingBottom: "1em" }}
                    >
                      You are currently interacting with the Beta version of the
                      Northeast Cover Crop Species Selector Tool. We seek
                      feedback about the usability and usefulness of this tool.
                      Our goal is to encourage and support the use of cover
                      crops in the Northeast US.
                    </Typography>

                    <Typography
                      variant="body1"
                      gutterBottom
                      style={{ paddingBottom: "1em" }}
                    >
                      The cover crop data you will see built upon information
                      found in the Midwest Cover Crops Council (MCCC) species
                      selector tool, the USDA PLANTS database, and a seeding
                      rate calculator developed by USDA NRCS in NY. These
                      initial data have been reviewed, modified, and greatly
                      expanded upon by cover crop experts in the Northeast in
                      each USDA plant hardiness zone to best match the cropping
                      system types, goals, and constraints found in our region.
                    </Typography>
                    <Typography
                      variant="body1"
                      gutterBottom
                      style={{ paddingBottom: "1em" }}
                    >
                      In the future, this platform will host a variety of tools
                      including a cover crop mixture and seeding rate calculator
                      and an economics calculator. Our ultimate goal is to
                      provide a suite of interconnected tools that function
                      together seamlessly.
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{ fontWeight: "bold", paddingBottom: "1em" }}
                      align="left"
                      gutterBottom
                    >
                      Thank you for your time and consideration. We look forward
                      to your feedback. You may provide input by visiting our
                      Feedback page.
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-4 pb-4">
          <div className="col-12">
            <LightButton onClick={() => incrementProgress(1)}>NEXT</LightButton>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Landing;

// <aside className="landingWrapper" style={setWrapperStyle(props.bg)}>
//       <div className="boxWrapper">
//         <aside className="text-left">
//           <h2>Welcome to the Northeast Cover Crop Species Selector Tool</h2>
//           <p>
//             You are currently interacting with the Beta version of the Northeast
//             Cover Crop Species SelectorDecision Support Tool. We seek feedback
//             about the usability and usefulness of this tool. Our goal is to
//             encourage and support the use of cover crops in the Northeast US
//           </p>
//           <p>
//             The cover crop data you will see built upon information found in the
//             Midwest Cover Crops Council (MCCC) species selector tool, the USDA
//             PLANTS database, and a seeding rate calculator developed by USDA
//             NRCS in NY. These initial data have been reviewed, modified, and
//             greatly expanded upon by cover crop experts in the Northeast in each
//             USDA plant hardiness zone to best match the cropping system types,
//             goals, and constraints found in our region
//           </p>
//           <p>
//             In the future, this platform will host a variety of tools including
//             a cover crop mixture and seeding rate calculator and an economics
//             calculator. Our ultimate goal is to provide a suite of
//             interconnected tools that function together seamlessly.
//           </p>

//           <p className="mt-4">
//             {" "}
//             Thank you for your time and consideration. We look forward to your
//             feedback. You may provide input by visiting our Feedback page.
//           </p>
//         </aside>
//         <div className="nextButton pt-4">

//           <LightButton onClick={() => incrementProgress(1)}>NEXT</LightButton>
//         </div>
//       </div>
//     </aside>
