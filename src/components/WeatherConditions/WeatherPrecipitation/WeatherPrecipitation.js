import { Tooltip, Typography, Grid } from '@mui/material';
import { Info, Opacity } from '@mui/icons-material';
import React from 'react';
import { useSelector } from 'react-redux';

const WeatherPrecipitation = ({ currentMonthFull }) => {
  const weatherDataRedux = useSelector((stateRedux) => stateRedux.weatherData.weatherData);

  return (
    <>
      <Grid
        container
        direction="column"
        style={{
          backgroundColor: 'rgba(176, 236, 130, 0.3)',
          padding: '1rem',
          borderRadius: '15px',
        }}
      >
        <Grid
          item
          direction="row"
          display="flex"
          justifyContent="space-between"
          sx={{ mb: '1.5rem' }}
        >
          <Grid item display="flex" justifyContent="center" flexGrow={1}>
            <Typography variant="body1">
              <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Precipitation</span>
              &nbsp;
              {' '}
              <Tooltip
                arrow
                placement="right"
                enterTouchDelay={0}
                title={(
                  <div>
                    Five-year average monthly and annual precipitation from the Precision
                    Sustainable Agriculture Weather API powered by
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
                <Info sx={{ fontSize: '1rem' }} />
              </Tooltip>
            </Typography>
          </Grid>
          <Grid item>
            <Opacity />
          </Grid>
        </Grid>
        <Grid
          item
          direction="row"
          display="flex"
          alignItems="baseline"
          sx={{ mb: '0.5rem' }}
          justifyContent="space-between"
        >
          <Grid item sx={{ mr: '1rem' }}>
            <Typography
              variant="body1"
              style={{ fontWeight: 'bold', fontSize: '0.8rem', color: '#abaeb4' }}
            >
              {currentMonthFull}
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
              {weatherDataRedux?.averagePrecipitation?.thisMonth}
              {' '}
              <span style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>inches</span>
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          direction="row"
          display="flex"
          alignItems="baseline"
          justifyContent="space-between"
        >
          <Grid item sx={{ mr: '1rem' }}>
            <Typography
              variant="body1"
              style={{ fontWeight: 'bold', fontSize: '0.8rem', color: '#abaeb4' }}
            >
              Annual
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
              {weatherDataRedux?.averagePrecipitation?.annual}
              {' '}
              <span style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>inches</span>
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {/* <Grid
      container
      direction="row"
      display="flex"
      style={{
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '0.8rem',
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
            padding: '1rem',
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
            <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Precipitation</span>
            &nbsp;{' '}
            <Tooltip
              arrow
              placement="right"
              enterTouchDelay={0}
              title={
                <div>
                  Five-year average monthly and annual precipitation from the Precision Sustainable
                  Agriculture Weather API powered by{' '}
                  <a
                    href="https://www.nssl.noaa.gov/projects/mrms/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NSSL MRMS
                  </a>{' '}
                  and{' '}
                  <a target="_blank" rel="noopener noreferrer" href="/#">
                    NASA NLDAS-2
                  </a>{' '}
                  weather data.
                </div>
              }
            >
              <Info fontSize="small" />
            </Tooltip>
          </Typography>
        </Grid>
        <Grid
          item
          direction="row"
          display="flex"
          justifyContent="space-between"
          sx={{ mt: ' 5px' }}
        >
          <Grid item direction="column">
            <Grid item>
              <Typography
                variant="body1"
                style={{ fontWeight: 'bold', fontSize: '0.6rem', color: '#abaeb4' }}
              >
                {currentMonthFull}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                {weatherDataRedux?.averagePrecipitation?.thisMonth}{' '}
                <span style={{ fontWeight: 'bold', fontSize: '0.6rem', color: '#abaeb4' }}>
                  inches
                </span>
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
              <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                {weatherDataRedux?.averagePrecipitation?.annual}{' '}
                <span style={{ fontWeight: 'bold', fontSize: '0.6rem', color: '#abaeb4' }}>
                  inches
                </span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
      {/* </Grid> */}
    </>
  );
};

export default WeatherPrecipitation;
