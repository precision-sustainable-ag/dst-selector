/*
  Contains the climate conditions widget
  validateAndBroadcastModalData validates that the day is between 1 and 31
*/

import {
  Button,
  FormControl,
  FormGroup,
  InputLabel,
  Select,
  TextField,
  Typography,
  Box,
  Dialog,
} from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LightButton } from '../../shared/constants';
import WeatherPrecipitation from './WeatherPrecipitation/WeatherPrecipitation';
import WeatherFrostDates from './WeatherFrostDates/WeatherFrostDates';
import WeatherFrostFreeDays from './WeatherFrostFreeDays/WeatherFrostFreeDays';
import { updateWeatherConditions } from '../../reduxStore/weatherSlice';

const WeatherConditions = () => {
  const dispatchRedux = useDispatch();

  // redux vars
  const weatherDataRedux = useSelector((stateRedux) => stateRedux.weatherData.weatherData);
  const ajaxInProgressRedux = useSelector((stateRedux) => stateRedux.sharedData.ajaxInProgress);

  // useState vars
  const [months, setMonths] = useState([]);
  const [currentMonthFull, setCurrentMonthFull] = useState('NOVEMBER');
  const [anyValuesChanged, setAnyValuesChanged] = useState(false);
  const [weatherDataShadow, setWeatherDataShadow] = useState(weatherDataRedux);
  const [lastFrostDayHelper, setLastFrostDayHelper] = useState('');
  const [firstFrostDayHelper, setFirstFrostDayHelper] = useState('');
  const [firstFrostDayError, setFirstFrostDayError] = useState(false);
  const [lastFrostDayError, setLastFrostDayError] = useState(false);

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
  const [open, setOpen] = useState(false);

  const validateAndBroadcastModalData = () => {
    // validate existing data

    // TODO: Validate Modal Data

    // data correct
    setFirstFrostDayError(false);
    setLastFrostDayError(false);
    setFirstFrostDayHelper('');
    setLastFrostDayHelper('');

    const broadcastObject = {
      averageFrost: {
        firstFrostDate: {
          month: firstFrostMonth,
          day: firstFrostDay,
        },
        lastFrostDate: {
          month: lastFrostMonth,
          day: lastFrostDay,
        },
      },
      averagePrecipitation: {
        thisMonth: averagePrecipitation?.thisMonth, // inches
        annual: averagePrecipitation?.annual, // inches
      },
      frostFreeDays,
    };

    if (firstFrostDay > 31 || firstFrostDay <= 0) {
      setFirstFrostDayError(true);
      setFirstFrostDayHelper('Invalid Day');
    } else if (lastFrostDay > 31 || lastFrostDay <= 0) {
      setLastFrostDayError(true);
      setLastFrostDayHelper('Invalid Day');
    } else {
      dispatchRedux(updateWeatherConditions(broadcastObject));
      setOpen(false);
    }

    // data incorrect
    // show error on modal
  };

  useEffect(() => {
    // get current month in long form
    setCurrentMonthFull(moment().format('MMMM'));
    // render monthsShort on the modal
    setMonths(moment.localeData().monthsShort());

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

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const checkIfAnythingChanged = () => {
      if (
        firstFrostMonth === weatherDataShadow?.averageFrost?.firstFrostDate?.month
        && parseInt(firstFrostDay, 10) === parseInt(weatherDataShadow?.averageFrost?.firstFrostDate?.day, 10)
        && lastFrostMonth === weatherDataShadow?.averageFrost?.lastFrostDate?.month
        && lastFrostDay === weatherDataShadow?.averageFrost?.lastFrostDate?.day
        && parseFloat(averagePrecipitation?.thisMonth)
          === parseFloat(weatherDataShadow?.averagePrecipitation?.thisMonth)
        && parseFloat(averagePrecipitation?.annual)
          === parseFloat(weatherDataShadow?.averagePrecipitation?.annual)
        && parseInt(frostFreeDays, 10) === parseInt(weatherDataShadow?.frostFreeDays, 10)
      ) {
        // return false;
        setAnyValuesChanged(false);
      } else {
        // return true;
        setAnyValuesChanged(true);
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
    <div className="row">
      <div className="col-12">
        <Typography variant="h4" align="left">
          Climate Conditions
        </Typography>
      </div>
      <div className="mt-2 col-12 text-left">
        <Typography
          variant="button"
          className={`font-weight-bold text-uppercase text-left ${
            anyValuesChanged ? 'text-danger' : ''
          }`}
          onClick={handleModalOpen}
          style={{
            cursor: 'pointer',
            color: 'blue',
          }}
        >
          <u>Click To Edit </u>
          {anyValuesChanged ? ', values changed' : ''}
        </Typography>
      </div>

      <WeatherFrostDates />

      <WeatherPrecipitation currentMonthFull={currentMonthFull} />

      <WeatherFrostFreeDays />

      <Dialog
        aria-labelledby="transition-modal-title"
        aria-describedby="ransition-modal-description"
        open={open}
        onClose={handleModalClose}
        closeAfterTransition
      >
        <Box
          className="modalContainer"
          sx={{
            backgroundColor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 5,
            padding: (theme) => theme.spacing(2, 4, 3),
          }}
        >
          <h2 id="transition-modal-title">Edit Climate Data</h2>
          <div id="transition-modal-description">
            <div className="container-fluid">
              <FormGroup>
                <div className="row mt-4">
                  <div className="col-12">
                    <Typography variant="h6">Average Frost Dates</Typography>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-6">
                    <MonthSelect
                      label="First Frost Month"
                      value={firstFrostMonth}
                      setValue={setFirstFrostMonth}
                      months={months}
                      compare={firstFrostMonth !== weatherDataShadow?.averageFrost?.firstFrostDate?.month}
                      reset={() => setFirstFrostMonth(weatherDataShadow?.averageFrost?.firstFrostDate?.month)}
                    />
                  </div>
                  <div className="col-6">
                    <InputField
                      label="First Frost Day"
                      inputProps={{ min: 1, max: 31 }}
                      helperText={firstFrostDayHelper}
                      error={firstFrostDayError}
                      value={firstFrostDay}
                      onChange={(event) => {
                        if (!Number.isNaN(event.target.value)) {
                          if (event.target.value === '') {
                            setFirstFrostDay('');
                          } else setFirstFrostDay(parseInt(event.target.value, 10));
                        } else {
                          setFirstFrostDay(1);
                        }
                      }}
                      compare={parseInt(firstFrostDay, 10)
                        !== parseInt(weatherDataShadow?.averageFrost?.firstFrostDate?.day, 10)}
                      reset={() => setFirstFrostDay(
                        parseInt(weatherDataShadow?.averageFrost?.firstFrostDate?.day, 10),
                      )}
                    />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-6">
                    <MonthSelect
                      label="Last Frost Month"
                      value={lastFrostMonth}
                      setValue={setLastFrostMonth}
                      months={months}
                      compare={lastFrostMonth !== weatherDataShadow?.averageFrost?.lastFrostDate?.month}
                      reset={() => setLastFrostMonth(weatherDataShadow?.averageFrost?.lastFrostDate?.month)}
                    />
                  </div>
                  <div className="col-6">
                    <InputField
                      label="Last Frost Day"
                      inputProps={{ min: 1, max: 31 }}
                      helperText={lastFrostDayHelper}
                      error={lastFrostDayError}
                      value={lastFrostDay}
                      onChange={(event) => {
                        if (!Number.isNaN(event.target.value)) {
                          if (event.target.value === '') {
                            setLastFrostDay('');
                          } else setLastFrostDay(parseInt(event.target.value, 10));
                        } else {
                          setLastFrostDay(1);
                        }
                      }}
                      compare={parseInt(lastFrostDay, 10)
                        !== parseInt(weatherDataShadow?.averageFrost?.lastFrostDate?.day, 10)}
                      reset={() => setLastFrostDay(
                        parseInt(weatherDataShadow?.averageFrost?.lastFrostDate?.day, 10),
                      )}
                    />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-12">
                    <Typography variant="h6">Average Precipitation</Typography>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-6">
                    <InputField
                      label={currentMonthFull}
                      inputProps={{ min: 1, max: 100, step: 0.01 }}
                      helperText="Inches"
                      value={averagePrecipitation?.thisMonth}
                      onChange={(event) => {
                        setAveragePrecipitation({
                          ...averagePrecipitation,
                          thisMonth: event.target.value === '' ? 0 : event.target.value,
                        });
                      }}
                      compare={parseFloat(averagePrecipitation?.thisMonth)
                        !== parseFloat(weatherDataShadow?.averagePrecipitation?.thisMonth)}
                      reset={() => setAveragePrecipitation({
                        thisMonth: parseFloat(
                          weatherDataShadow?.averagePrecipitation?.thisMonth,
                        ),
                        annual: parseFloat(averagePrecipitation?.annual),
                      })}
                    />
                  </div>
                  <div className="col-6">
                    <InputField
                      label="Annual"
                      inputProps={{ min: 1, max: 100, step: 0.01 }}
                      helperText="Inches"
                      value={averagePrecipitation?.annual}
                      onChange={(event) => {
                        setAveragePrecipitation({
                          ...averagePrecipitation,
                          annual:
                                event.target.value === '' ? 0 : event.target.value,
                        });
                      }}
                      compare={parseFloat(averagePrecipitation?.annual)
                        !== parseFloat(weatherDataShadow?.averagePrecipitation?.annual)}
                      reset={() => setAveragePrecipitation({
                        thisMonth: parseFloat(averagePrecipitation?.thisMonth),
                        annual: parseFloat(weatherDataShadow?.averagePrecipitation?.annual),
                      })}
                    />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-12">
                    <Typography variant="h6">Frost Free Days</Typography>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-6">
                    <InputField
                      label="Frost Free Days"
                      inputProps={{ min: 1, max: 365 }}
                      value={frostFreeDays}
                      onChange={(event) => {
                        if (!Number.isNaN(event.target.value)) {
                          if (event.target.value === '') {
                            setFrostFreeDays(0);
                          } else setFrostFreeDays(parseInt(event.target.value, 10));
                        } else {
                          setFrostFreeDays(0);
                        }
                      }}
                      compare={parseInt(frostFreeDays, 10) !== parseInt(weatherDataShadow?.frostFreeDays, 10)}
                      reset={() => setFrostFreeDays(parseInt(weatherDataShadow?.frostFreeDays, 10))}
                    />
                  </div>
                  <div className="col-6" />
                </div>
                <div className="row mt-4">
                  <div className="col-6">
                    <LightButton onClick={validateAndBroadcastModalData}>
                      update
                    </LightButton>
                    <Button onClick={() => setOpen(false)}>cancel</Button>
                  </div>
                </div>
              </FormGroup>
            </div>
          </div>
        </Box>
      </Dialog>
    </div>
  );
};

export default WeatherConditions;

const MonthSelect = ({
  label, value, setValue, months, compare, reset,
}) => {
  const id = label.toLowerCase().replace(' ', '-');
  return (
    <FormControl style={{ width: '100%' }}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        label={label}
        native
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        inputProps={{
          name: { id },
          id: { id },
        }}
      >
        {months.map((val, key) => (
          <option value={moment(val, 'MMM').format('MMMM')} key={key}>
            {val}
          </option>
        ))}
      </Select>
      {compare
        ? (
          <Button
            className="text-danger"
            size="small"
            onClick={reset}
          >
            Values changed, Reset?
          </Button>
        )
        : <Typography variant="body2">5 Year Average</Typography>}
    </FormControl>
  );
};

const InputField = ({
  label, inputProps, helperText, error, value, onChange, compare, reset,
}) => (
  <FormControl>
    <TextField
      label={label}
      type="number"
      inputProps={inputProps}
      helperText={helperText}
      error={error}
      value={value}
      onChange={onChange}
      sx={{
        marginLeft: 1,
        marginRight: 1,
        width: 200,
      }}
    />
    {compare
      ? (
        <Button
          className="text-danger"
          size="small"
          onClick={reset}
        >
          Values changed, Reset?
        </Button>
      )
      : <Typography variant="body2" style={{ marginLeft: '8px' }}>5 Year Average</Typography>}
  </FormControl>
);
