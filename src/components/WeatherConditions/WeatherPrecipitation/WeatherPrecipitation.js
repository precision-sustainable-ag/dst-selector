import {
  Tooltip, Typography, Grid, Box,
} from '@mui/material';
import { Info, Opacity } from '@mui/icons-material';
import React from 'react';
import { useSelector } from 'react-redux';

const WeatherPrecipitation = ({ currentMonthFull }) => {
  const weatherDataRedux = useSelector((stateRedux) => stateRedux.weatherData.weatherData);

  return (
    <Grid
      container
      direction="row"
      style={{
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '0.5rem',
        width: 'auto',
        border: '2px solid #598445',
      }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid item>
        <Box
          style={{
            backgroundColor: 'rgba(176, 236, 130, 0.8)',
            padding: '30px',
            borderRadius: '15px',
            marginRight: '10px',
          }}
        >
          <Opacity />
        </Box>
      </Grid>

      <Grid item direction="column">
        <Grid item>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Average Precipitation</span>
            &nbsp;
            {' '}
            <Tooltip
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
                  <a target="_blank" rel="noopener noreferrer" href="/#">
                    NASA NLDAS-2
                  </a>
                  {' '}
                  weather data.
                </div>
              )}
            >
              <Info fontSize="small" />
            </Tooltip>
          </Typography>
        </Grid>
        <Grid item direction="column">
          <Grid item>
            <Typography
              variant="body1"
              style={{ fontWeight: 'bold', fontSize: '0.6rem', color: '#abaeb4' }}
            >
              {currentMonthFull.toUpperCase()}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>
              {weatherDataRedux?.averagePrecipitation?.thisMonth}
              {' '}
              inches
            </Typography>
          </Grid>
        </Grid>

        <Grid item direction="column">
          <Grid item>
            <Typography
              variant="body1"
              style={{ fontWeight: 'bold', fontSize: '0.6rem', color: '#abaeb4' }}
            >
              Annual
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>
              {weatherDataRedux?.averagePrecipitation?.annual}
              {' '}
              inches
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WeatherPrecipitation;
