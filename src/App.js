import React, { useContext, useEffect } from "react";

import "./App.css";
// import Header from "./components/Header/header";
// import Body from "./components/body";
import { Box, Snackbar } from "@material-ui/core";
// import Navigation from "./components/navigation";
// import Footer from "./components/Footer/footer";
import Header from "./components/Header/header";

import Landing from "./components/Landing/Landing";

import { Context } from "./store/Store";
import LocationComponent from "./components/Location/Location";
import { loadProgressBar } from "axios-progress-bar";
import ProgressButtons from "./shared/ProgressButtons";
import ProgressBar from "./shared/ProgressBar";
// import { GreenBarComponent } from "./components/GreenBar/greenBarComponent";
// import BodyComponent from "./components/body";

const logoPath = "/images/neccc_wide_logo_color_web.jpg";

const loadRelevantRoute = progress => {
  switch (progress) {
    case 0:
      return <Landing bg="/images/cover-crop-field.png" />;
    case 1:
      return <LocationComponent />;
    default:
      return "";
  }
};

const App = () => {
  useEffect(() => {
    loadProgressBar();
  });

  const [state, dispatch] = useContext(Context);
  // const isRootRoute = this.props.path == "/" ? true : false;
  const handleSnackClose = () => {
    dispatch({
      action: "SNACK",
      data: {
        snackOpen: false,
        snackMessage: ""
      }
    });
  };

  return (
    <div className="contentWrapper">
      <Header logo="neccc_wide_logo_color_web.jpg" />

      {loadRelevantRoute(state.progress)}

      <div className="row progressIndicatorWrapper mt-4">
        <div
          className="col-lg-12"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            className="row"
            style={{
              width: "90%"
            }}
          >
            <div className="col-lg-4">
              <ProgressButtons />
            </div>
            <div
              className="col-lg-8"
              style={{
                textAlign: "right"
              }}
            >
              <ProgressBar />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: state.snackVertical,
            horizontal: state.snackHorizontal
          }}
          key={{
            vertical: state.snackVertical,
            horizontal: state.snackHorizontal
          }}
          autoHideDuration={5000}
          open={state.snackOpen}
          onClose={handleSnackClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={state.snackMessage}
        />
      </div>
    </div>
  );
  // {
  //   /* <Header logoPath={`${logoPath}`} /> */
  //   /* <WellComponent /> */
  // }
  // {
  //   /* <BodyComponent /> */
  // }
  // {
  //   /* {isRootRoute ? <Header logoPath={`${logoPath}`} /> : ""} */
  // }

  // {
  //   /*
  //     Our Main part of this application would be this Navigation component. It contains code for our main navigation
  //     It is using a material-ui tab panel for simplicity and ease of use.
  //     Each tab contains/would-contain components individually, as required.
  //     */
  // }

  // {
  //   /* <Navigation /> */
  // }

  // {
  //   /* body.js is just a temporary code, that would eventually be replaced by footer.js
  //     Until production, this can serve as a playground!!
  //     */
  // }

  // {
  //   /* <Body /> */
  // }
  // {
  //   /* </Box> */
  // }
  // {
  //   /* <Footer /> */
  // }
  // </div>
};

export default App;
