import {
  Tooltip, Typography, Grid, Box,
} from '@mui/material';
import { WbSunnyOutlined, Info } from '@mui/icons-material';
import React from 'react';
import { useSelector } from 'react-redux';

const WeatherFrostFreeDays = () => {
  const weatherDataRedux = useSelector((stateRedux) => stateRedux.weatherData.weatherData);

  return (
    <Grid
      container
      direction="row"
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
          <WbSunnyOutlined />
        </Box>
      </Grid>

      <Grid item direction="column">
        <Grid item>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Average Frost Free Days</span>
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
              <Info fontSize="small" />
            </Tooltip>
          </Typography>
        </Grid>
        <Grid item direction="column" sx={{ mt: ' 5px' }}>
          <Grid item>
            <Typography
              variant="body1"
              style={{ fontWeight: 'bold', fontSize: '0.6rem', color: '#abaeb4' }}
            >
              Frost Free Days
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '1rem' }}>
              {weatherDataRedux?.frostFreeDays}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WeatherFrostFreeDays;
