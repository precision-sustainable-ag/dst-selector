/*
  Shows the location selected, which zone the user is in, and shows a disclaimer
  styled using CustomStyles from ../../shared/constants
*/

import React, { useEffect } from 'react';
import {
  Grid, Typography, Box, useTheme, useMediaQuery,
} from '@mui/material';
import SoilCondition from './SoilCondition/SoilCondition';
import WeatherConditions from '../../components/WeatherConditions/WeatherConditions';
import pirschAnalytics from '../../shared/analytics';

const SiteConditions = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    pirschAnalytics('Visited Page', { meta: { visited: 'Site Conditions' } });
  }, []);

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item sx={{ flexGrow: 1, textAlign: 'center' }}>
          {/* <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '2rem' }}>
            Site Conditions
          </Typography> */}
          <Typography variant="h4" data-test="site-conditions-title">Site Conditions</Typography>
          <Typography variant="body1">
            {'This information is based on your location. Crops that do not meet these site conditions will '
              + 'be filtered to the bottom and grayed out when your results are displayed. Update only as needed.'}
          </Typography>
        </Grid>
        <Grid item container spacing={3}>
          <Grid
            item
            container
            lg={6}
            spacing={3}
            alignContent="flex-start"
            justifyContent={isLargeScreen ? 'flex-end' : 'center'}
          >
            <WeatherConditions />
          </Grid>
          <Grid item container lg={6} spacing={3}>
            <SoilCondition />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SiteConditions;
