/*
  App is the species selector tool
  styled using ./styles/App.scss
*/

import { Snackbar } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import CropSelector from './pages/CropSelector/CropSelector';
import GoalsSelector from './pages/GoalsSelector/GoalsSelector';
import Header from './pages/Header/Header';
import Landing from './pages/Landing/Landing';
import LocationComponent from './pages/Location/Location';
import LocationConfirmation from './pages/Location/LocationConfirmation/LocationConfirmation';
import ProgressBar from './shared/ProgressBar';
import ProgressButtons from './shared/ProgressButtons';
import { Context } from './store/Store';
import './styles/App.scss';

const LoadRelevantRoute = ({ progress, calcHeight }) => {
  switch (progress) {
    case 0:
      return (
        <LocationComponent
          height={calcHeight}
          title="Species Selector Tool | Decision Support Tool"
        />
      );
    case 2:
      return (
        <LocationConfirmation
          height={calcHeight}
          title="Species Selector Tool | Decision Support Tool"
        />
      );
    case 3:
      return (
        <LocationConfirmation
          height={calcHeight}
          title="Species Selector Tool | Decision Support Tool"
        />
      );
    case 4:
      return (
        <GoalsSelector height={calcHeight} title="Species Selector Tool | Decision Support Tool" />
      );
    case 5:
      return (
        <CropSelector height={calcHeight} title="Species Selector Tool | Decision Support Tool" />
      );

    default:
      return <RouteNotFound height={calcHeight} />;
  }
};

const App = () => {
  const { state, dispatch } = useContext(Context);
  const [calcHeight, setCalcHeight] = useState(0);
  const handleSnackClose = () => {
    dispatch({
      type: 'SNACK',
      data: {
        snackOpen: false,
        snackMessage: '',
      },
    });
  };

  useEffect(() => {
    const parentDocHeight = document
      .getElementById('mainContentWrapper')
      .getBoundingClientRect().height;
    const headerHeight = document.querySelector('header').getBoundingClientRect().height;

    const calculatedHeight = parentDocHeight - headerHeight;

    setCalcHeight(calculatedHeight);
  }, []);

  return (
    <div className="contentWrapper" id="mainContentWrapper">
      <Header logo="neccc_wide_logo_color_web.jpg" />

      <div className="container-fluid pl-0 pr-0">
        <div className="contentContainer">
          {state.progress === 10 ? (
            <Landing
              title="Decision Support Tool"
              height={calcHeight}
              bg="/images/cover-crop-field.png"
            />
          ) : (
            <div
              className="col-12"
              style={{
                paddingLeft: '0px',
                paddingRight: '0px',
              }}
            >
              <LoadRelevantRoute progress={state.progress} calcHeight={calcHeight} />
              {state.progress > 0 && state.progress < 5 ? (
                <div className="container-fluid mt-5 mb-5">
                  <div className="row" style={{ width: '95%', margin: '0 auto' }}>
                    <div className="col-lg-5 col-12 col-md-5" />
                    <div className="col-lg-5 col-12 col-md-5">
                      <ProgressButtons />
                    </div>
                    <div className="col-lg-2 pr-0 col-12 col-md-2">
                      <ProgressBar />
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          )}
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
            'aria-describedby': 'message-id',
          }}
          message={state.snackMessage}
        />
      </div>
    </div>
  );
};

export default App;

const RouteNotFound = () => (
  <div className="container mt-4">
    <div className="row">
      <div className="col-4 offset-4">
        <h3>Unknown Route</h3>
      </div>
    </div>
  </div>
);

// eslint-disable-next-line
const crop = window.location.search.match(/crop=([^\^]+)/);

if (crop) {
  setTimeout(() => {
    [...document.querySelectorAll('.MuiCardContent-root')].forEach((o) => {
      if (o.textContent.includes(decodeURI(crop[1]))) {
        o.querySelector('a').click();
      }
    });
  }, 1000);
}
