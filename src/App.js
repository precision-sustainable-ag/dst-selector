import React, { useContext, useEffect } from "react";

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
import { CustomStyles } from "./shared/constants";
import { SnackbarProvider } from "notistack";
// import { GreenBarComponent } from "./components/GreenBar/greenBarComponent";
// import BodyComponent from "./components/body";

// const logoPath = "/images/neccc_wide_logo_color_web.jpg";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: CustomStyles().lightGreen,
    },
    secondary: {
      main: CustomStyles().lighterGreen,
    },
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: CustomStyles().defaultFontSize,
        backgroundColor: CustomStyles().secondaryProgressBtnColor,
        color: "black",
        borderRadius: CustomStyles().mildlyRoundedRadius,
      },
      arrow: {},
    },
  },
});

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
    <div className="container">
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

  return (
    <MuiThemeProvider theme={theme}>
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
    </MuiThemeProvider>
  );
};

export default App;
