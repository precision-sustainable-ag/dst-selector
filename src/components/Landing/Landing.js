/*
  This file contains the Landing component, helper functions, and styles
  The Landing page is a static pages that has information about the project and prompts the user to select their location and goals
  styled using ../../styles/landing.scss
*/

import { Grid, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Typography, Button } from "@material-ui/core";
import { LightButton } from "../../shared/constants";
import { Context } from "../../store/Store";
import "../../styles/landing.scss";

const Landing = (props) => {
  const [state, dispatch] = useContext(Context);
  const height = props.height - 45;
  const [containerHeight, setContainerHeight] = useState(props.height);
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
    minHeight: `${height}px`,
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

  useEffect(() => {
    document.title = props.title;
    function updateSize() {
      let documentHeight = document
        .getElementsByTagName("html")[0]
        .getBoundingClientRect().height;

      let headerHeight = document
        .getElementsByTagName("header")[0]
        .getBoundingClientRect().height;

      let footerHeight = document
        .getElementsByClassName("primaryFooter")[0]
        .getBoundingClientRect().height;

      let containerHeight = documentHeight - (headerHeight + footerHeight) + 7;
      document.getElementById("landingWrapper").style.minHeight =
        containerHeight + "px";
      setContainerHeight(containerHeight);
    }
    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      id="landingWrapper"
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: containerHeight,
        background: `url(${props.bg})`,
        backgroundSize: "cover",
      }}
    >
      <Grid
        className="p-2"
        spacing={2}
        container
        justify="center"
        alignItems="center"
        style={{
          width: "90%",
          backgroundColor: "rgba(240,247,235,.8)",
          borderRadius: "10px",
          border: "1px solid #598445",
        }}
      >
        <Grid item>
          <Typography variant="h4" gutterBottom align="center">
            Welcome to the Northeast Cover Crop Species Selector Tool
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="body1"
            gutterBottom
            align="left"
            // style={{ paddingBottom: "1em" }}
          >
            You are currently interacting with the Northeast Cover Crop Species
            Selector Tool. We seek feedback about the usability and usefulness
            of this tool. Our goal is to encourage and support the use of cover
            crops in the Northeast US. You can learn more about the cover crop
            data and design of this tool <Link to={"/about"}> here</Link>. If
            you need assistance, consult the <Link to={"/help"}>help page</Link>
            .
          </Typography>
        </Grid>
        <Grid item>
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
            variant="body1"
            style={{ fontWeight: "bold", paddingBottom: "1em" }}
            align="left"
            gutterBottom
          >
            Thank you for your time and consideration. You may provide input by
            visiting our <Link to="/feedback">Feedback</Link> page. We look
            forward to your hearing about your experience.
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            align="left"
            className="font-weight-bold"
          >
            Click Next to enter the Species Selector.
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify="center" alignItems="center" className="pt-4">
        <Grid item>
          <LightButton onClick={() => incrementProgress(1)}>NEXT</LightButton>
        </Grid>
      </Grid>
    </div>
  );

  // return (
  //   <div className="container-fluid pt-5 pb-5" style={bgImage}>
  //     <div className="row boxContainerRow" style={boxWrapper}>
  //       <div className="col-12">
  //         <Typography variant="h4" gutterBottom>
  //           Welcome to the Northeast Cover Crop Species Selector Tool
  //         </Typography>
  //       </div>

  //       <div className="col-12">
  // <Typography
  //   variant="body1"
  //   gutterBottom
  //   align="left"
  //   style={{ paddingBottom: "1em" }}
  // >
  //   You are currently interacting with the Northeast Cover Crop Species
  //   Selector Tool, beta version. We seek feedback about the usability
  //   and usefulness of this tool. Our goal is to encourage and support
  //   the use of cover crops in the Northeast US. You can learn more about
  //   the cover crop data and design of this tool{" "}
  //   <Link to={"/about"}> here</Link>. If you need assistance, consult
  //   the <Link to={"/help"}>help page</Link>.
  // </Typography>

  // <Typography
  //   align="left"
  //   variant="body1"
  //   gutterBottom
  //   style={{ paddingBottom: "1em" }}
  // >
  //   In the future, this platform will host a variety of tools including
  //   a cover crop mixture and seeding rate calculator and an economics
  //   calculator. Our ultimate goal is to provide a suite of
  //   interconnected tools that function together seamlessly.
  // </Typography>
  // <Typography
  //   align="left"
  //   variant="body1"
  //   gutterBottom
  //   style={{ paddingBottom: "1em" }}
  // >
  //   This tool is currently undergoing beta testing. This means that we
  //   are double checking the data and the underlying decision logic.
  //   Please do not use this tool for actual cover crop planning and
  //   consult your cover crop advisor at this stage.
  // </Typography>
  // <Typography
  //   variant="body1"
  //   style={{ fontWeight: "bold", paddingBottom: "1em" }}
  //   align="left"
  //   gutterBottom
  // >
  //   Thank you for your time and consideration. You may provide input by
  //   visiting our <Link to="/feedback">Feedback</Link> page. We look
  //   forward to your hearing about your experience.
  // </Typography>
  // <Typography
  //   variant="body1"
  //   gutterBottom
  //   align="left"
  //   className="font-weight-bold"
  // >
  //   Click Next to enter the Species Selector.
  // </Typography>
  //       </div>
  //     </div>
  //     <div className="d-flex justify-content-center align-items-center">
  //       <LightButton onClick={() => incrementProgress(1)}>NEXT</LightButton>
  //     </div>
  //   </div>
  // );

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
