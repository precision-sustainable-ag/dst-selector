import React, { useContext, useEffect, Fragment } from "react";

import "./styles/App.scss";
// import Header from "./components/Header/header";
// import Body from "./components/body";
import {
  Box,
  Snackbar,
  MuiThemeProvider,
  createMuiTheme,
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
import { SnackbarProvider } from "notistack";

const loadRelevantRoute = (progress) => {
  // TODO: Handle case 3 as cropselector vs soil sample selector
  switch (progress) {
    case 0:
      return <Landing bg="/images/cover-crop-field.webp" />;
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
  // useEffect(() => {
  //   document.title = "Cover Crop Decision Support Tool";
  //   loadProgressBar();
  // }, [state.ajaxInProgress]);

  // const isRootRoute = this.props.path == "/" ? true : false;
  const handleSnackClose = () => {
    dispatch({
      type: "SNACK",
      data: {
        snackOpen: false,
        snackMessage: "",
      },
    });
  };

  // useEffect(() => {
  //   switch (parseInt(state.zone)) {
  //     case 7: {
  //       dispatch({
  //         type: "PULL_CROP_DATA",
  //         data: state.zone7CropData,
  //       });
  //       console.log("z7 data dispatched");
  //       break;
  //     }
  //     case 6: {
  //       dispatch({
  //         type: "PULL_CROP_DATA",
  //         data: state.zone6CropData,
  //       });
  //       console.log("z6 data dispatched");
  //       break;
  //     }
  //     case 5: {
  //       dispatch({
  //         type: "PULL_CROP_DATA",
  //         data: state.zone5CropData,
  //       });
  //       console.log("z5 data dispatched");
  //       break;
  //     }
  //     default: {
  //       dispatch({
  //         type: "PULL_CROP_DATA",
  //         data: state.zone7CropData,
  //       });
  //       console.log("default data dispatched");
  //       break;
  //     }
  //   }
  // }, [
  //   state.zone,
  //   state.zone7CropData,
  //   state.zone6CropData,
  //   state.zone5CropData,
  // ]);

  return (
    <SnackbarProvider
      maxSnack={5}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <div className="contentWrapper">
        <Header logo="neccc_wide_logo_color_web.jpg" />

        {loadRelevantRoute(state.progress)}

        {state.progress !== 0 && state.progress < 5 ? (
          <div className="row progressIndicatorWrapper mt-4">
            <div
              className="col-lg-12"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                className="row"
                style={{
                  width: "90%",
                }}
              >
                <div className="col-lg-4 col-sm-4 col-md-4 pb-2">
                  <ProgressButtons />
                </div>
                <div
                  className="col-lg-4 offset-lg-4 col-md-6 offset-md-2 col-sm-8 pt-2"
                  style={{
                    textAlign: "right",
                  }}
                >
                  <ProgressBar />
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

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
            autoHideDuration={5000}
            open={state.snackOpen}
            onClose={handleSnackClose}
            ContentProps={{
              "aria-describedby": "message-id",
            }}
            message={state.snackMessage}
          />
        </div>
      </div>
    </SnackbarProvider>
  );
};

export default App;
