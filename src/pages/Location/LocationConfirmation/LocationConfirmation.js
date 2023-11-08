/*
  Shows the location selected, which zone the user is in, and shows a disclaimer
  styled using CustomStyles from ../../shared/constants
*/

import React from 'react';
import { useSelector } from 'react-redux';

import { Grid, Typography, Box } from '@mui/material';
import SoilCondition from '../SoilCondition/SoilCondition';
import WeatherConditions from '../../../components/WeatherConditions/WeatherConditions';

const LocationConfirmation = () => {
  // redux vars
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);

  // If progressRedux is not 2, do not render anything
  if (progressRedux !== 2) {
    return null;
  }

  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        border: '4px solid #f5f5f5',
        borderRadius: '10px',
        marginTop: '1rem',
        flexGrow: 1,
        p: '1rem',
      }}
    >
      <Grid container spacing={4}>
        <Grid item sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '2rem' }}>
            Site Conditions
          </Typography>
        </Grid>
        <Grid item container spacing={3}>
          <Grid item container lg={6} spacing={3} justifyContent="flex-end">
            <SoilCondition />
          </Grid>
          <Grid item container lg={6} justifyContent="center">
            <Grid item container spacing={3} lg={6} justifyContent="center">
              <WeatherConditions />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LocationConfirmation;
