import {
  Tooltip,
  Typography,
} from '@mui/material';
import {
  WbSunnyOutlined, Info, Opacity,
} from '@mui/icons-material';
import React, { useContext } from 'react';
import { Context } from '../../../store/Store';

const WeatherFrostFreeDays = () => {
  const { state } = useContext(Context);

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
                Number of days in your growing season, based on average first and last frost dates
                for the last five years from the Precision Sustainable Agriculture Weather API
                powered by
                {' '}
                <a href="https://www.nssl.noaa.gov/projects/mrms/" rel="noopener noreferrer">
                  NSSL MRMS
                </a>
                {' '}
                and
                {' '}
                <a href="/#" target="_blank" rel="noopener noreferrer">
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
            Frost Free Days
            :
          </span>
          {' '}
&nbsp;
          {state.weatherData.frostFreeDays}
        </Typography>
      </div>
    </div>
  );
};

export default WeatherFrostFreeDays;
