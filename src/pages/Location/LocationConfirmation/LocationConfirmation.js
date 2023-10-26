/*
  Shows the location selected, which zone the user is in, and shows a disclaimer
  styled using CustomStyles from ../../shared/constants
*/

import React from 'react';
import { useSelector } from 'react-redux';

import { Grid } from '@mui/material';
import SoilCondition from '../SoilCondition/SoilCondition';
import WeatherConditions from '../../../components/WeatherConditions/WeatherConditions';

const LocationConfirmation = () => {
  // redux vars
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        {progressRedux === 2 && <SoilCondition />}
        {progressRedux === 3 && <WeatherConditions />}
      </Grid>
    </Grid>
  );
};

export default LocationConfirmation;
