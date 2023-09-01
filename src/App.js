/*
  App is the species selector tool
  styled using ./styles/App.scss
*/

import {
  Snackbar, Box, Container, Grid,
} from '@mui/material';
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
import RouteNotFound from './pages/RouteNotFound/RouteNotFound';

const App = () => {
  const [calcHeight, setCalcHeight] = useState(0);

  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);

  useEffect(() => {
    const parentDocHeight = document
      .getElementById('mainContentWrapper')
      .getBoundingClientRect().height;
    const headerHeight = document.querySelector('header').getBoundingClientRect().height;

    const calculatedHeight = parentDocHeight - headerHeight;

    setCalcHeight(calculatedHeight);
  }, []);

  return (
    <Box className="contentWrapper" id="mainContentWrapper">
      <Header logo="neccc_wide_logo_color_web.jpg" />

      <Container disableGutters maxWidth={false}>
        <Box className="contentContainer">

          <Grid container item xs={12} style={{ paddingLeft: 0, paddingRight: 0 }}>
            <LoadRelevantRoute progress={progressRedux} calcHeight={calcHeight} />
          </Grid>

        </Box>
      </Container>

    </Box>
  );
};

export default App;

const LoadRelevantRoute = ({ progress, calcHeight }) => {
  switch (progress) {
    case 0:
      return (
        <Landing
          title="Decision Support Tool"
          height={calcHeight}
          bg="/images/cover-crop-field.png"
        />
      );
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

// eslint-disable-next-line no-unused-vars
const SnackbarComponent = () => {
  const dispatchRedux = useDispatch();

  // redux vars
  const snackOpenRedux = useSelector((stateRedux) => stateRedux.sharedData.snackOpen);
  const snackMessageRedux = useSelector((stateRedux) => stateRedux.sharedData.snackMessage);
  const snackVerticalRedux = useSelector((stateRedux) => stateRedux.sharedData.snackVertical);
  const snackHorizontalRedux = useSelector((stateRedux) => stateRedux.sharedData.snackHorizontal);

  const handleSnackClose = () => {
    dispatchRedux(snackHandler({ snackOpen: false, snackMessage: '' }));
  };

  return (
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
  );
};
