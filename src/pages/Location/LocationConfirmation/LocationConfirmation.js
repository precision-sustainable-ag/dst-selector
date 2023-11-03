/*
  Shows the location selected, which zone the user is in, and shows a disclaimer
  styled using CustomStyles from ../../shared/constants
*/

import React from 'react';
import { useSelector } from 'react-redux';

import { Grid, Typography } from '@mui/material';
import SoilCondition from '../SoilCondition/SoilCondition';
import WeatherConditions from '../../../components/WeatherConditions/WeatherConditions';

const LocationConfirmation = () => {
  // redux vars
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);

  return (
    <>
      <Typography variant="body1" style={{ color: '#abaeb4', fontWeight: 'bold' }}>
        This information is based on your location and average weather data, it is not used to
        filter recommended crops.
      </Typography>
      <Grid container direction="row" justifyContent="space-evenly" alignItems="flex-start">
        <Grid item lg={4} sx={{ mt: '1rem' }}>
          {progressRedux === 2 && <SoilCondition />}
        </Grid>
        <Grid item lg={4} sx={{ mt: '1rem' }}>
          {progressRedux === 2 && <WeatherConditions />}
        </Grid>
      </Grid>
    </>
  );
};

export default LocationConfirmation;
