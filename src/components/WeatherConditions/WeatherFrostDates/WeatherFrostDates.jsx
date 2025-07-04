import { Typography, Grid } from '@mui/material';
import { AcUnit, Info } from '@mui/icons-material';
import React from 'react';
import { useSelector } from 'react-redux';
import { PSATooltip } from 'shared-react-components/src';

const WeatherFrostDates = () => {
  const weatherDataRedux = useSelector((stateRedux) => stateRedux.weatherData.weatherData);
  const { firstFrostDate, lastFrostDate } = weatherDataRedux.averageFrost;

  return (
    <Grid
      item
      style={{
        backgroundColor: 'rgba(176, 236, 130, 0.3)',
        padding: '1rem',
        borderRadius: '15px',
      }}
      data-test="frost-dates-card"
    >
      <Grid
        item
        display="flex"
        justifyContent="space-between"
        sx={{ mb: '1.5rem' }}
      >
        <Grid item>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Frost Dates</span>
            &nbsp;
            {' '}
            <PSATooltip
              arrow
              placement="right"
              enterTouchDelay={0}
              title={(
                <div>
                  Average dates of the first and last frosts for your location, based on frost dates
                  for the last thirty years from the Precision Sustainable Agriculture Weather API
                  powered by
                  {' '}
                  <a
                    href="https://www.nssl.noaa.gov/projects/mrms/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NSSL MRMS
                    {' '}
                  </a>
                  {' '}
                  and
                  {' '}
                  <a
                    href="https://ldas.gsfc.nasa.gov/nldas/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NASA NLDAS-2
                  </a>
                  {' '}
                  weather data.
                </div>
              )}
              tooltipContent={(
                <span
                  role="button"
                  aria-label="Average dates of the first and last frosts for your location, based on frost dates
                  for the last thirty years from the Precision Sustainable Agriculture Weather API
                  powered by NSSL MRMS and NASA NLDAS-2 weather data."
                >
                  <Info sx={{ fontSize: '1rem' }} tabIndex="0" />
                </span>
              )}
            />
          </Typography>
        </Grid>
        <Grid item>
          <AcUnit />
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
            sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}
          >
            First Frost Date
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
            {firstFrostDate?.month ? `${firstFrostDate?.month} ${firstFrostDate?.day}` : 'No Data'}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        item
        display="flex"
        alignItems="baseline"
        justifyContent="space-between"
        sx={{ mb: '0.5rem' }}
      >
        <Grid item sx={{ mr: '1rem' }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}
          >
            Last Frost Date
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
            {lastFrostDate?.month ? `${lastFrostDate?.month} ${lastFrostDate?.day}` : 'No Data'}
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
            sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}
          >
            Frost Free Days
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
            {weatherDataRedux?.frostFreeDays || 'No Data'}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WeatherFrostDates;
