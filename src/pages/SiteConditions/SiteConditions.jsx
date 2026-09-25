/*
  Shows the location selected, which zone the user is in, and shows a disclaimer
  styled using CustomStyles from ../../shared/constants
*/

import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect } from 'react';
import WeatherConditions from '../../components/WeatherConditions/WeatherConditions';
import pirschAnalytics from '../../shared/analytics';
import SoilCondition from './SoilCondition/SoilCondition';

const SiteConditions = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    pirschAnalytics('Visited Page', { meta: { visited: 'Site Conditions' } });
  }, []);

  return (
    <Box>
      <Grid container spacing={4} sx={{ p: isLargeScreen ? '1rem' : '0.5rem' }}>
        <Grid sx={{ flexGrow: 1, textAlign: 'center' }}>
          {/* <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '2rem' }}>
            Site Conditions
          </Typography> */}
          <Typography variant="h4" data-test="site-conditions-title">
            Site Conditions
          </Typography>
          <Typography variant="body1">
            {'This information is based on your location. Crops that do not meet these site conditions will ' +
              'be filtered to the bottom and grayed out when your results are displayed. Update only as needed.'}
          </Typography>
        </Grid>
        <Grid container spacing={3}>
          <Grid
            container
            spacing={3}
            sx={{
              alignContent: 'flex-start',
              justifyContent: isLargeScreen ? 'flex-end' : 'center',
            }}
            size={{
              lg: 6,
            }}
          >
            <WeatherConditions />
          </Grid>
          <Grid
            container
            spacing={3}
            size={{
              lg: 6,
            }}
          >
            <SoilCondition />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SiteConditions;
