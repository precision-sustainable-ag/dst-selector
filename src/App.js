/*
  App is the species selector tool
  styled using ./styles/App.scss
*/

import {
  Snackbar, Box, Container, Grid, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CropSelector from './pages/CropSelector/CropSelector';
import GoalsSelector from './pages/GoalsSelector/GoalsSelector';
import Header from './pages/Header/Header';
import Landing from './pages/Landing/Landing';
import LocationComponent from './pages/Location/Location';
import LocationConfirmation from './pages/Location/LocationConfirmation/LocationConfirmation';
import './styles/App.scss';
import { snackHandler } from './reduxStore/sharedSlice';
import { updateRegion, updateStateInfo } from './reduxStore/mapSlice';

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
  const history = useHistory();

  // redux vars
  const snackOpenRedux = useSelector((stateRedux) => stateRedux.sharedData.snackOpen);
  const snackMessageRedux = useSelector((stateRedux) => stateRedux.sharedData.snackMessage);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const snackVerticalRedux = useSelector((stateRedux) => stateRedux.sharedData.snackVertical);
  const snackHorizontalRedux = useSelector((stateRedux) => stateRedux.sharedData.snackHorizontal);

  // eslint-disable-next-line
  const crop = window.location.search.match(/crop=([^\^]+)/);
  // eslint-disable-next-line
  const stateId = window.location.search.match(/state=([^\^]+)/); // for automating Information Sheet PDFs
  // eslint-disable-next-line
  const regionId = window.location.search.match(/region=([^\^]+)/); // for automating Information Sheet PDFs

  // this handlespopulating redux state if there are url params
  if (crop && stateId && regionId) {
    dispatchRedux(updateStateInfo({
      stateLabel: null,
      stateId: stateId[1],
      councilShorthand: null,
      councilLabel: null,
    }));
    dispatchRedux(updateRegion({
      regionId: regionId[1],
      regionLabel: null,
      regionShorthand: null,
    }));
    history.push(`/explorer?crop=${crop[1]}^&stateId=${stateId[1]}^&regionId=${regionId[1]}`);
  }

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
    <Box className="contentWrapper" id="mainContentWrapper">
      <Header logo="neccc_wide_logo_color_web.jpg" />

      <Container disableGutters maxWidth={false}>
        <Box className="contentContainer">
          {progressRedux === 0 ? (
            <Landing
              title="Decision Support Tool"
              height={calcHeight}
              bg="/images/cover-crop-field.png"
            />
          ) : (
            <Grid container item xs={12} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <LoadRelevantRoute progress={progressRedux} calcHeight={calcHeight} />
            </Grid>
          )}
        </Box>
      </Container>

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
    </Box>
  );
};

export default App;

const RouteNotFound = () => (
  <Container>
    <Grid container justifyContent="center" alignItems="center" spacing={3}>
      <Grid item xs={4}>
        <Typography variant="h3" align="center">
          Unknown Route
        </Typography>
      </Grid>
    </Grid>
  </Container>
);
