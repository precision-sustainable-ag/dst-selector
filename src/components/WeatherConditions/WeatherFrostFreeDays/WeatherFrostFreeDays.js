import { Tooltip, Typography, Grid } from '@mui/material';
import { WbSunnyOutlined, Info } from '@mui/icons-material';
import React from 'react';
import { useSelector } from 'react-redux';

const WeatherFrostFreeDays = () => {
  const weatherDataRedux = useSelector((stateRedux) => stateRedux.weatherData.weatherData);

  return (
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
        <Grid item>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Frost Free Days</span>
            &nbsp;
            {' '}
            <Tooltip
              arrow
              placement="right"
              enterTouchDelay={0}
              title={(
                <div>
                  Number of days in your growing season, based on the PSA Weather API using data
                  from the
                  {' '}
                  <a
                    href="https://www.ncei.noaa.gov/products/land-based-station/us-climate-normals"
                    rel="noopener noreferrer"
                  >
                    NOAA 30-Year Climate Normals.
                  </a>
                </div>
              )}
            >
              <Info sx={{ fontSize: '1rem' }} />
            </Tooltip>
          </Typography>
        </Grid>
        <Grid item>
          <WbSunnyOutlined />
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
            style={{ fontWeight: 'bold', fontSize: '0.6rem', color: '#abaeb4' }}
          >
            Last Frost Date
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '1rem' }}>
            {weatherDataRedux?.frostFreeDays}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WeatherFrostFreeDays;
