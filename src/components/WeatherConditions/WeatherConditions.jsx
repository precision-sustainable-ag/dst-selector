/*
  Contains the climate conditions widget
  validateAndBroadcastModalData validates that the day is between 1 and 31
*/

import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import SoilComposition from '../../pages/SiteConditions/SoilCondition/SoilComposition/SoilComposition';
import WeatherFrostDates from './WeatherFrostDates/WeatherFrostDates';
import WeatherPrecipitation from './WeatherPrecipitation/WeatherPrecipitation';

const WeatherConditions = () => {
  const weatherDataRedux = useSelector((stateRedux) => stateRedux.weatherData.weatherData);
  const { thisMonth, annual } = weatherDataRedux.averagePrecipitation;

  return (
    <>
      <Grid
        size={{
          xs: 12,
          md: 10,
          lg: 10,
        }}
      >
        <SoilComposition />
      </Grid>
      <Grid
        size={{
          xs: 12,
          md: 10,
          lg: 10,
        }}
      >
        <WeatherFrostDates />
      </Grid>
      {thisMonth && annual && (
        <Grid
          size={{
            xs: 12,
            md: 10,
            lg: 10,
          }}
        >
          <WeatherPrecipitation />
        </Grid>
      )}
    </>
  );
};

export default WeatherConditions;
