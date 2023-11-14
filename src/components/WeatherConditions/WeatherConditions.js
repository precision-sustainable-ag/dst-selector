/*
  Contains the climate conditions widget
  validateAndBroadcastModalData validates that the day is between 1 and 31
*/

import { Grid } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import WeatherPrecipitation from './WeatherPrecipitation/WeatherPrecipitation';
import WeatherFrostDates from './WeatherFrostDates/WeatherFrostDates';
import SoilComposition from '../../pages/Location/SoilCondition/SoilComposition/SoilComposition';

const WeatherConditions = () => {
  // redux vars
  const weatherDataRedux = useSelector((stateRedux) => stateRedux.weatherData.weatherData);
  const ajaxInProgressRedux = useSelector((stateRedux) => stateRedux.sharedData.ajaxInProgress);

  // useState vars
  const [currentMonthFull, setCurrentMonthFull] = useState('NOVEMBER');
  const [weatherDataShadow, setWeatherDataShadow] = useState(weatherDataRedux);

  const [firstFrostMonth, setFirstFrostMonth] = useState(
    weatherDataRedux?.averageFrost?.firstFrostDate?.month,
  );
  const [firstFrostDay, setFirstFrostDay] = useState(
    weatherDataRedux?.averageFrost?.firstFrostDate?.day,
  );
  const [lastFrostMonth, setLastFrostMonth] = useState(
    weatherDataRedux?.averageFrost?.lastFrostDate?.month,
  );
  const [lastFrostDay, setLastFrostDay] = useState(
    weatherDataRedux?.averageFrost?.lastFrostDate?.day,
  );

  const [averagePrecipitation, setAveragePrecipitation] = useState({
    thisMonth: weatherDataRedux?.averagePrecipitation?.thisMonth,
    annual: weatherDataRedux?.averagePrecipitation?.annual,
  });

  const [frostFreeDays, setFrostFreeDays] = useState(weatherDataRedux?.frostFreeDays);

  useEffect(() => {
    // get current month in long form
    setCurrentMonthFull(moment().format('MMMM'));

    setFirstFrostMonth(weatherDataRedux?.averageFrost?.firstFrostDate?.month);
    setFirstFrostDay(weatherDataRedux?.averageFrost?.firstFrostDate?.day);
    setLastFrostDay(weatherDataRedux?.averageFrost?.lastFrostDate?.day);
    setLastFrostMonth(weatherDataRedux?.averageFrost?.lastFrostDate?.month);

    setAveragePrecipitation({
      thisMonth: weatherDataRedux?.averagePrecipitation?.thisMonth,
      annual: weatherDataRedux?.averagePrecipitation?.annual,
    });

    setFrostFreeDays(weatherDataRedux?.frostFreeDays);
  }, [weatherDataRedux]);

  useEffect(() => {
    const checkIfAnythingChanged = () => {
      if (
        firstFrostMonth === weatherDataShadow?.averageFrost?.firstFrostDate?.month
        && parseInt(firstFrostDay, 10)
          === parseInt(weatherDataShadow?.averageFrost?.firstFrostDate?.day, 10)
        && lastFrostMonth === weatherDataShadow?.averageFrost?.lastFrostDate?.month
        && lastFrostDay === weatherDataShadow?.averageFrost?.lastFrostDate?.day
        && parseFloat(averagePrecipitation?.thisMonth)
          === parseFloat(weatherDataShadow?.averagePrecipitation?.thisMonth)
        && parseFloat(averagePrecipitation?.annual)
          === parseFloat(weatherDataShadow?.averagePrecipitation?.annual)
        && parseInt(frostFreeDays, 10) === parseInt(weatherDataShadow?.frostFreeDays, 10)
      ) {
        // return false;
      } else {
        // return true;
      }
    };

    if (!ajaxInProgressRedux) {
      checkIfAnythingChanged();
    }
  }, [
    weatherDataShadow,
    ajaxInProgressRedux,
    firstFrostDay,
    firstFrostMonth,
    lastFrostDay,
    lastFrostMonth,
    averagePrecipitation,
    frostFreeDays,
  ]);

  useEffect(() => {
    if (!ajaxInProgressRedux) {
      setWeatherDataShadow(weatherDataRedux);
    }
  }, [ajaxInProgressRedux, weatherDataRedux]);

  return (
    <>
      <Grid item xs={12} md={10} lg={10}>
        <SoilComposition />
      </Grid>
      <Grid item xs={12} md={10} lg={10}>
        <WeatherFrostDates />
      </Grid>
      <Grid item xs={12} md={10} lg={10}>
        <WeatherPrecipitation currentMonthFull={currentMonthFull} />
      </Grid>
    </>
  );
};

export default WeatherConditions;
