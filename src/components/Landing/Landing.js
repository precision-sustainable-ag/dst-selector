import React, { useContext } from "react";
import "../../styles/landing.scss";
import { Context } from "../../store/Store";
// import { Typography, Button } from "@material-ui/core";
import { LightButton } from "../../shared/constants";
import { Typography, Box } from "@material-ui/core";
import { Link } from "react-router-dom";

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
  const bgImage = {
    background: `url(${props.bg})`,
    backgroundSize: "cover",
    height: `${height}px`,
  };
  const boxWrapper = {
    paddingBottom: "0px",
    marginBottom: "50px",
    backgroundColor: "rgba(240,247,235,.8)",
    borderRadius: "10px",
    border: "1px solid #598445",
    minHeight: "520px",
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
    <div className="container-fluid pt-5" style={bgImage}>
      <div className="row boxContainerRow" style={boxWrapper}>
        <div className="col-12">
          <Typography variant="h4" gutterBottom>
            Welcome to the Northeast Cover Crop Species Selector Tool
          </Typography>
        </div>

        <div className="col-12">
          <Typography
            variant="body1"
            gutterBottom
            align="left"
            style={{ paddingBottom: "1em" }}
          >
            You are currently interacting with the Northeast Cover Crop Species
            Selector Tool, beta version. We seek feedback about the usability
            and usefulness of this tool. Our goal is to encourage and support
            the use of cover crops in the Northeast US. You can learn more about
            the cover crop data and design of this tool{" "}
            <Link to={"/about"}> here</Link>. If you need assistance, consult
            the <Link to={"/help"}>help page</Link>.
          </Typography>

          <Typography
            align="left"
            variant="body1"
            gutterBottom
            style={{ paddingBottom: "1em" }}
          >
            In the future, this platform will host a variety of tools including
            a cover crop mixture and seeding rate calculator and an economics
            calculator. Our ultimate goal is to provide a suite of
            interconnected tools that function together seamlessly.
          </Typography>
          <Typography
            align="left"
            variant="body1"
            gutterBottom
            style={{ paddingBottom: "1em" }}
          >
            This tool is currently undergoing beta testing. This means that we
            are double checking the data and the underlying decision logic.
            Please do not use this tool for actual cover crop planning and
            consult your cover crop advisor at this stage.
          </Typography>
          <Typography
            variant="body1"
            style={{ fontWeight: "bold", paddingBottom: "1em" }}
            align="left"
            gutterBottom
          >
            Thank you for your time and consideration. You may provide input by
            visiting our <Link to="/feedback">Feedback</Link> page. We look
            forward to your hearing about your experience.
          </Typography>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <LightButton onClick={() => incrementProgress(1)}>NEXT</LightButton>
      </div>
    </div>
  );

  // return (
  //   <Box
  //     style={{
  //       background: `url(${props.bg})`,
  //       backgroundSize: "cover",
  //       height: `${height}px`,
  //       overflow: "hidden",
  //     }}
  //   >
  //     <div className="container-fluid" style={backgroundWrapper}>
  //       <div className="row boxContainerRow mt-2" style={boxWrapper}>
  //         <div className="col-12">
  //           <div className="container-fluid">
  //             <div className="row">
  //               <div className="col-12">
  //                 <Typography variant="h4" align="center">
  //                   Welcome to the Northeast Cover Crop Species Selector Tool
  //                 </Typography>
  //               </div>
  //               <div className="row pt-4 text-left">
  //                 <div className="col-12">
  //                   <Typography
  //                     variant="body1"
  //                     gutterBottom
  //                     style={{ paddingBottom: "1em" }}
  //                   >
  //                     You are currently interacting with the Northeast Cover
  //                     Crop Species Selector Tool, beta version. We seek feedback
  //                     about the usability and usefulness of this tool. Our goal
  //                     is to encourage and support the use of cover crops in the
  //                     Northeast US. You can learn more about the cover crop data
  //                     and design of this tool <Link to={"/about"}> here</Link>.
  //                     If you need assistance, consult the{" "}
  //                     <Link to={"/help"}>help page</Link>.
  //                   </Typography>

  //                   <Typography
  //                     variant="body1"
  //                     gutterBottom
  //                     style={{ paddingBottom: "1em" }}
  //                   >
  //                     In the future, this platform will host a variety of tools
  //                     including a cover crop mixture and seeding rate calculator
  //                     and an economics calculator. Our ultimate goal is to
  //                     provide a suite of interconnected tools that function
  //                     together seamlessly.
  //                   </Typography>
  //                   <Typography
  //                     variant="body1"
  //                     gutterBottom
  //                     style={{ paddingBottom: "1em" }}
  //                   >
  //                     This tool is currently undergoing beta testing. This means
  //                     that we are double checking the data and the underlying
  //                     decision logic. Please do not use this tool for actual
  //                     cover crop planning and consult your cover crop advisor at
  //                     this stage.
  //                   </Typography>
  //                   <Typography
  //                     variant="body1"
  //                     style={{ fontWeight: "bold", paddingBottom: "1em" }}
  //                     align="left"
  //                     gutterBottom
  //                   >
  //                     Thank you for your time and consideration. You may provide
  //                     input by visiting our <Link to="/feedback">Feedback</Link>{" "}
  //                     page. We look forward to your hearing about your
  //                     experience.
  //                   </Typography>
  //                 </div>
  // //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="row pt-4 pb-4">
  //         <div className="col-12">
  //           <LightButton onClick={() => incrementProgress(1)}>NEXT</LightButton>
  //         </div>
  //       </div>
  //     </div>
  //   </Box>
  // );
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
