import {
  Tooltip,
  Typography,
  Grid,
} from '@mui/material';
import {
  WbSunnyOutlined, Info, Opacity,
} from '@mui/icons-material';
import React from 'react';
import { useSelector } from 'react-redux';

const WeatherFrostFreeDays = () => {
  const weatherDataRedux = useSelector((stateRedux) => stateRedux.weatherData.weatherData);

  return (
    <Grid
      container
      item
      direction="column"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Typography variant="body1">
          <WbSunnyOutlined />
            &nbsp; Average Frost Free Days &nbsp;
          {' '}
          <Tooltip
            arrow
            placement="right"
            enterTouchDelay={0}
            title={(
              <div>
                Number of days in your growing season, based on the PSA Weather API using data from the
                {' '}
                <a href="https://www.ncei.noaa.gov/products/land-based-station/us-climate-normals" rel="noopener noreferrer">
                  NOAA 30-Year Climate Normals.
                </a>
              </div>
              )}
          >
            <Info fontSize="small" />
          </Tooltip>
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="body1">
          <Opacity style={{ color: 'transparent' }} />
            &nbsp;
          {' '}
          <span>
            Frost Free Days
            :
          </span>
          {' '}
&nbsp;
          {weatherDataRedux?.frostFreeDays}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default WeatherFrostFreeDays;
