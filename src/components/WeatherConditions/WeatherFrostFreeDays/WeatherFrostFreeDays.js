import {
  Tooltip,
  Typography,
} from '@mui/material';
import {
  WbSunnyOutlined, Info, Opacity,
} from '@mui/icons-material';
import React from 'react';
import { useSelector } from 'react-redux';

const WeatherFrostFreeDays = () => {
  const weatherDataRedux = useSelector((stateRedux) => stateRedux.weatherData.weatherData);

  return (
    <div className="mt-3 col-12 row">
      <div className="col-12">
        <Typography variant="body1" className="font-weight-bold text-uppercase text-left">
          <WbSunnyOutlined />
            &nbsp; Average Frost Free Days &nbsp;
          {' '}
          <Tooltip
            arrow
            placement="right"
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
      </div>

      <div className="col-12">
        <Typography variant="body1" className="text-left">
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
      </div>
    </div>
  );
};

export default WeatherFrostFreeDays;
