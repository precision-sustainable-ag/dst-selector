/*
  App is the species selector tool
  styled using ./styles/App.scss
*/

import { Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CropSelector from './pages/CropSelector/CropSelector';
import GoalsSelector from './pages/GoalsSelector/GoalsSelector';
import Header from './pages/Header/Header';
import Landing from './pages/Landing/Landing';
import LocationComponent from './pages/Location/Location';
import LocationConfirmation from './pages/Location/LocationConfirmation/LocationConfirmation';
import './styles/App.scss';
import { snackHandler } from './reduxStore/sharedSlice';

const LoadRelevantRoute = ({ progress, calcHeight }) => {
  switch (progress) {
    case 1:
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
  const dispatchRedux = useDispatch();
  const [calcHeight, setCalcHeight] = useState(0);
  const snackOpenRedux = useSelector((stateRedux) => stateRedux.sharedData.snackOpen);
  const snackMessageRedux = useSelector((stateRedux) => stateRedux.sharedData.snackMessage);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const snackVerticalRedux = useSelector((stateRedux) => stateRedux.sharedData.snackVertical);
  const snackHorizontalRedux = useSelector((stateRedux) => stateRedux.sharedData.snackHorizontal);
  const handleSnackClose = () => {
    dispatchRedux(snackHandler({ snackOpen: false, snackMessage: '' }));
    // dispatch({
    //   type: 'SNACK',
    //   data: {
    //     snackOpen: false,
    //     snackMessage: '',
    //   },
    // });
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
          {progressRedux === 0 ? (
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
              <LoadRelevantRoute progress={progressRedux} calcHeight={calcHeight} />
            </div>
          )}
        </div>
      </div>

      <div>
        <Snackbar
          anchorOrigin={{
            vertical: snackVerticalRedux,
            horizontal: snackHorizontalRedux,
          }}
          key={{
            vertical: snackVerticalRedux,
            horizontal: snackHorizontalRedux,
          }}
          autoHideDuration={3000}
          open={snackOpenRedux}
          onClose={handleSnackClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={snackMessageRedux}
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
