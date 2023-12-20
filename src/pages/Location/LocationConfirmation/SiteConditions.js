/*
  Shows the location selected, which zone the user is in, and shows a disclaimer
  styled using CustomStyles from ../../shared/constants
*/

import React from 'react';
import { Grid, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import SoilCondition from '../SoilCondition/SoilCondition';
import WeatherConditions from '../../../components/WeatherConditions/WeatherConditions';

const SiteConditions = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item sx={{ flexGrow: 1, textAlign: 'center' }}>
          {/* <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '2rem' }}>
            Site Conditions
          </Typography> */}
          <Typography
            variant="h4"
            style={{ fontWeight: 'bold', fontSize: '1.8rem', textAlign: 'center' }}
          >
            Site Conditions
          </Typography>
          <Typography
            variant={isMobile ? 'subtitle2' : 'subtitle1'}
            sx={{
              fontWeight: 'medium',
              color: '#4A4A4A',
              textAlign: 'center',
            }}
          >
            This information is based on your location. Drainage Class and Flooding Frequency are
            used to recommended cover crops. Update only as needed.
          </Typography>
        </Grid>
        <Grid item container spacing={3}>
          <Grid
            item
            container
            lg={6}
            spacing={3}
            alignContent="space-between"
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
