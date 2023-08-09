/*
  App is the species selector tool
  styled using ./styles/App.scss
*/

import {
  Snackbar, Box, Container, Grid, Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import CropSelector from './pages/CropSelector/CropSelector';
import GoalsSelector from './pages/GoalsSelector/GoalsSelector';
import Header from './pages/Header/Header';
import Landing from './pages/Landing/Landing';
import LocationComponent from './pages/Location/Location';
import LocationConfirmation from './pages/Location/LocationConfirmation/LocationConfirmation';
import { Context } from './store/Store';
import './styles/App.scss';

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
    <Box className="contentWrapper" id="mainContentWrapper">
      <Header logo="neccc_wide_logo_color_web.jpg" />

      <Container maxWidth="lg">
        <Box className="contentContainer">
          {state.progress === 0 ? (
            <Landing
              title="Decision Support Tool"
              height={calcHeight}
              bg="/images/cover-crop-field.png"
            />
          ) : (
            <Grid container item xs={12} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <LoadRelevantRoute progress={state.progress} calcHeight={calcHeight} />
            </Grid>
          )}
        </Box>
      </Container>

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
