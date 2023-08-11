import {
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Info, Opacity,
} from '@mui/icons-material';
import React from 'react';
import { useSelector } from 'react-redux';

const WeatherPrecipitation = ({ currentMonthFull }) => {
  const weatherDataRedux = useSelector((stateRedux) => stateRedux.weatherData.weatherData);

  return (
    <div className="mt-3 col-12 row">
      <div className="col-12">
        <Typography variant="body1" className="font-weight-bold text-uppercase text-left">
          <Opacity />
            &nbsp; Average Precipitation &nbsp;
          {' '}
          <Tooltip
            arrow
            placement="right"
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
      </div>
      <div className="col-12">
        <Typography variant="body1" className="text-left">
          <Opacity style={{ color: 'transparent' }} />
            &nbsp;
          {' '}
          <span>
            {currentMonthFull.toUpperCase()}
            :
          </span>
          {' '}
&nbsp;
          {weatherDataRedux?.averagePrecipitation?.thisMonth}
          {' '}
          inches
        </Typography>
        <Typography variant="body1" className="text-left">
          <Opacity style={{ color: 'transparent' }} />
            &nbsp;
          {' '}
          <span>
            Annual
            :
          </span>
          {' '}
&nbsp;
          {weatherDataRedux?.averagePrecipitation?.annual}
          {' '}
          inches
        </Typography>
      </div>
    </div>
  );
};

export default WeatherPrecipitation;
