import { Typography, Grid } from '@mui/material';
import { Info, Opacity } from '@mui/icons-material';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { PSATooltip } from 'shared-react-components/src';

const WeatherPrecipitation = () => {
  const weatherDataRedux = useSelector((stateRedux) => stateRedux.weatherData.weatherData);
  const { thisMonth, annual } = weatherDataRedux.averagePrecipitation;
  const currentMonthFull = moment().format('MMMM');

  return (
    <Grid
      container
      direction="column"
      style={{
        backgroundColor: 'rgba(176, 236, 130, 0.3)',
        padding: '1rem',
        borderRadius: '15px',
      }}
      data-test="precipitation-card"
    >
      <Grid
        item
        display="flex"
        justifyContent="space-between"
        sx={{ mb: '1.5rem' }}
      >
        <Grid item>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Precipitation</span>
            &nbsp;
            {' '}
            <PSATooltip
              arrow
              placement="right"
              enterTouchDelay={0}
              title={(
                <div>
                  Five-year average monthly and annual precipitation from the Precision Sustainable
                  Agriculture Weather API powered by
                  {' '}
                  <a
                    href="https://www.nssl.noaa.gov/projects/mrms/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NSSL MRMS
                  </a>
                  {' '}
                  and
                  {' '}
                  <a target="_blank" rel="noopener noreferrer" href="https://ldas.gsfc.nasa.gov/nldas/">
                    NASA NLDAS-2
                  </a>
                  {' '}
                  weather data.
                </div>
              )}
              tooltipContent={(
                <span
                  role="button"
                  aria-label="Five-year average monthly and annual precipitation from the Precision Sustainable
                  Agriculture Weather API powered by NSSL MRMS and NASA NLDAS-2 weather data."
                >
                  <Info sx={{ fontSize: '1rem' }} tabIndex="0" />
                </span>
              )}
            />
          </Typography>
        </Grid>
        <Grid item>
          <Opacity />
        </Grid>
      </Grid>
      <Grid
        item
        display="flex"
        alignItems="baseline"
        sx={{ mb: '0.5rem' }}
        justifyContent="space-between"
      >
        <Grid item sx={{ mr: '1rem' }}>
          <Typography
            variant="body1"
            style={{ fontWeight: 'bold', fontSize: '0.9rem' }}
          >
            {currentMonthFull}
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
            {thisMonth ? (
              <>
                {thisMonth}
                {' '}
                <span style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>inches</span>
              </>
            ) : 'No Data'}

          </Typography>
        </Grid>
      </Grid>

      <Grid
        item
        display="flex"
        alignItems="baseline"
        justifyContent="space-between"
      >
        <Grid item sx={{ mr: '1rem' }}>
          <Typography
            variant="body1"
            style={{ fontWeight: 'bold', fontSize: '0.9rem' }}
          >
            Annual
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
            {annual ? (
              <>
                {annual}
                {' '}
                <span style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>inches</span>
              </>
            ) : 'No Data'}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WeatherPrecipitation;
