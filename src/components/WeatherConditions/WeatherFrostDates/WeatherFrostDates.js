import {
  Tooltip,
  Typography,
} from '@mui/material';
import {
  AcUnit, Info, Opacity,
} from '@mui/icons-material';
import React, { useContext } from 'react';
import { Context } from '../../../store/Store';

const WeatherFrostDates = () => {
  const { state } = useContext(Context);

  return (
    <div className="mt-3 col-12 row">
      <div className="col-12">
        <Typography variant="body1" className="font-weight-bold text-uppercase text-left">
          <AcUnit />
            &nbsp; Average Frost Dates &nbsp;
          {' '}
          <Tooltip
            arrow
            placement="right"
            title={(
              <div>
                Average dates of the first and last frosts for your location, based on frost dates
                for the last five years from the Precision Sustainable Agriculture Weather API
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
                weather data; you may manually change this input.
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
            First Frost Date
            :
          </span>
          {' '}
&nbsp;
          {`${state.weatherData.averageFrost.firstFrostDate.month} ${state.weatherData.averageFrost.firstFrostDate.day}`}
        </Typography>
        <Typography variant="body1" className="text-left">
          <Opacity style={{ color: 'transparent' }} />
            &nbsp;
          {' '}
          <span>
            Last Frost Date
            :
          </span>
          {' '}
&nbsp;
          {`${state.weatherData.averageFrost.lastFrostDate.month} ${state.weatherData.averageFrost.lastFrostDate.day}`}
        </Typography>
      </div>
    </div>
  );
};

export default WeatherFrostDates;
