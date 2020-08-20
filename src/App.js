import React, { useContext, useEffect, Fragment, useState } from "react";

import "./styles/App.scss";
// import Header from "./components/Header/header";
// import Body from "./components/body";
import {
  Box,
  Snackbar,
  MuiThemeProvider,
  createMuiTheme,
  Button,
} from "@material-ui/core";
// import Navigation from "./components/navigation";
// import Footer from "./components/Footer/footer";
import Header from "./components/Header/header";

import Landing from "./components/Landing/Landing";

import { Context } from "./store/Store";
import LocationComponent from "./components/Location/Location";
// import { loadProgressBar } from "axios-progress-bar";
import ProgressButtons from "./shared/ProgressButtons";
import ProgressBar from "./shared/ProgressBar";
import GoalsSelector from "./components/GoalsSelector/GoalsSelector";
import LocationConfirmation from "./components/Location/LocationConfirmation";
import CropSelector from "./components/CropSelector/CropSelector";
// import { CustomStyles } from "./shared/constants";

const loadRelevantRoute = (progress, calcHeight) => {
  // TODO: Handle case 3 as cropselector vs soil sample selector
  switch (progress) {
    case 0:
      return <Landing height={calcHeight} bg="/images/cover-crop-field.png" />;
    case 1:
      return <LocationComponent />;
    case 2:
      return <LocationConfirmation />;
    case 3:
      return <LocationConfirmation />;
    case 4:
      return <GoalsSelector />;
    case 5:
      return <CropSelector />;

    default:
      return <RouteNotFound />;
  }
};

const RouteNotFound = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-4 offset-4">
          <h3>Unknown Route</h3>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [state, dispatch] = useContext(Context);
  const [calcHeight, setCalcHeight] = useState(0);
  const handleSnackClose = () => {
    dispatch({
      type: "SNACK",
      data: {
        snackOpen: false,
        snackMessage: "",
      },
    });
  };

  useEffect(() => {
    let parentDocHeight = document
      .getElementById("mainContentWrapper")
      .getBoundingClientRect().height;
    let headerHeight = document.querySelector("header").getBoundingClientRect()
      .height;

    let calculatedHeight = parentDocHeight - headerHeight;

    setCalcHeight(calculatedHeight);
  }, []);

  return (
    <div className="contentWrapper" id="mainContentWrapper">
      <Header logo="neccc_wide_logo_color_web.jpg" />

      <div className="container-fluid pl-0 pr-0">
        <div
          className="contentContainer"
          style={
            {
              // height: calcHeight,
              // width: "100%",
              // position: "absolute",
              // top: "50%",
              // left: "50%",
              // transform: "translate(-50%, -50%)",
            }
          }
        >
          <div
            className="col-12"
            style={{ paddingLeft: "0px", paddingRight: "0px" }}
          >
            {loadRelevantRoute(state.progress, calcHeight)}
            {state.progress !== 0 && state.progress < 5 ? (
              <div className="container-fluid mt-5 mb-5">
                <div className="row" style={{ width: "95%", margin: "0 auto" }}>
                  <div className="col-lg-5 col-12 col-md-5"></div>
                  <div className="col-lg-5 col-12 col-md-5">
                    <ProgressButtons />
                  </div>
                  <div className="col-lg-2 pr-0 col-12 col-md-2">
                    <ProgressBar />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div>
        <Snackbar
          anchorOrigin={{
            vertical: state.snackVertical,
            horizontal: state.snackHorizontal,
          }}
          key={{
            vertical: state.snackVertical,
            horizontal: state.snackHorizontal,
          }}
          autoHideDuration={3000}
          open={state.snackOpen}
          onClose={handleSnackClose}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          message={state.snackMessage}
        />
      </div>
    </div>
  );
};

export default App;
