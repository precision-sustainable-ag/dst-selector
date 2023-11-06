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
    <Grid
      container
      direction="column"
      alignItems="center"
      display="flex"
      style={{
        boxSizing: 'border-box',
        border: '4px solid #f5f5f5',
        borderRadius: '10px',
      }}
    >
      <Grid item>
        <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '2rem' }}>
          Site Conditions
        </Typography>
      </Grid>
      <Grid
        item
        style={{
          padding: '1rem',
          margin: '0', // Removed margin to fill the entire screen
          boxSizing: 'border-box', // Include padding in the width and height
          borderRadius: '10px',
        }}
        display="flex"
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid
          item
          lg={5.5}
            // sx={{ mt: '1rem', p: '1rem' }}
          xs={12}
          style={{
            border: '4px solid #f5f5f5',
            boxSizing: 'border-box',
            // backgroundColor: "yellow"
            borderRadius: '10px',
          }}
          alignSelf="stretch"
        >
          {progressRedux === 2 && <SoilCondition />}
        </Grid>
        <Grid
          item
          lg={5.5}
            // sx={{ mt: '1rem', p: '1rem' }}
          xs={12}
          style={{
            border: '4px solid #f5f5f5',
            boxSizing: 'border-box',
            // backgroundColor: "yellow"
            borderRadius: '10px',
          }}
          alignSelf="stretch"
        >
          {progressRedux === 2 && <WeatherConditions />}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LocationConfirmation;
