/*
  Contains the climate conditions widget
  validateAndBroadcastModalData validates that the day is between 1 and 31
*/

import {
  Button,
  FormControl,
  FormGroup,
  InputLabel,
  Modal,
  Select,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { LightButton } from '../../shared/constants';
import { Context } from '../../store/Store';
import WeatherPrecipitation from './WeatherPrecipitation/WeatherPrecipitation';
import WeatherFrostDates from './WeatherFrostDates/WeatherFrostDates';
import WeatherFrostFreeDays from './WeatherFrostFreeDays/WeatherFrostFreeDays';

const WeatherConditions = ({ caller }) => {
  const { state, dispatch } = useContext(Context);
  const [months, setMonths] = useState([]);
  const [currentMonthFull, setCurrentMonthFull] = useState('NOVEMBER');
  const [anyValuesChanged, setAnyValuesChanged] = useState(false);

  const [weatherDataShadow, setWeatherDataShadow] = useState(state.weatherData);

  const [lastFrostDayHelper, setLastFrostDayHelper] = useState('');
  const [firstFrostDayHelper, setFirstFrostDayHelper] = useState('');
  const [firstFrostDayError, setFirstFrostDayError] = useState(false);
  const [lastFrostDayError, setLastFrostDayError] = useState(false);

  useEffect(() => {
    if (!state.ajaxInProgress) {
      setWeatherDataShadow(state.weatherData);
    }
  }, [state.ajaxInProgress, state.weatherData]);

  const [firstFrostMonth, setFirstFrostMonth] = useState(
    state.weatherData.averageFrost.firstFrostDate.month,
  );
  const [firstFrostDay, setFirstFrostDay] = useState(
    state.weatherData.averageFrost.firstFrostDate.day,
  );
  const [lastFrostMonth, setLastFrostMonth] = useState(
    state.weatherData.averageFrost.lastFrostDate.month,
  );
  const [lastFrostDay, setLastFrostDay] = useState(
    state.weatherData.averageFrost.lastFrostDate.day,
  );

  const [averagePrecipitation, setAveragePrecipitation] = useState({
    thisMonth: state.weatherData.averagePrecipitation.thisMonth,
    annual: state.weatherData.averagePrecipitation.annual,
  });

  const [frostFreeDays, setFrostFreeDays] = useState(state.weatherData.frostFreeDays);
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
        thisMonth: averagePrecipitation.thisMonth, // inches
        annual: averagePrecipitation.annual, // inches
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
      dispatch({
        type: 'UPDATE_WEATHER_CONDITIONS',
        data: { weatherData: broadcastObject },
      });
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

    setFirstFrostMonth(state.weatherData.averageFrost.firstFrostDate.month);
    setFirstFrostDay(state.weatherData.averageFrost.firstFrostDate.day);
    setLastFrostDay(state.weatherData.averageFrost.lastFrostDate.day);
    setLastFrostMonth(state.weatherData.averageFrost.lastFrostDate.month);

    setAveragePrecipitation({
      thisMonth: state.weatherData.averagePrecipitation.thisMonth,
      annual: state.weatherData.averagePrecipitation.annual,
    });

    setFrostFreeDays(state.weatherData.frostFreeDays);
  }, [state.weatherData, caller]);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const checkIfAnythingChanged = () => {
      if (
        firstFrostMonth === weatherDataShadow.averageFrost.firstFrostDate.month
        && parseInt(firstFrostDay, 10) === parseInt(weatherDataShadow.averageFrost.firstFrostDate.day, 10)
        && lastFrostMonth === weatherDataShadow.averageFrost.lastFrostDate.month
        && lastFrostDay === weatherDataShadow.averageFrost.lastFrostDate.day
        && parseFloat(averagePrecipitation.thisMonth)
          === parseFloat(weatherDataShadow.averagePrecipitation.thisMonth)
        && parseFloat(averagePrecipitation.annual)
          === parseFloat(weatherDataShadow.averagePrecipitation.annual)
        && parseInt(frostFreeDays, 10) === parseInt(weatherDataShadow.frostFreeDays, 10)
      ) {
        // return false;
        setAnyValuesChanged(false);
      } else {
        // return true;
        setAnyValuesChanged(true);
      }
    };

    if (!state.ajaxInProgress) {
      checkIfAnythingChanged();
    }
  }, [
    weatherDataShadow,
    state.ajaxInProgress,
    firstFrostDay,
    firstFrostMonth,
    lastFrostDay,
    lastFrostMonth,
    averagePrecipitation,
    frostFreeDays,
  ]);
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

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="ransition-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
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
                    <FormControl style={{ width: '100%' }}>
                      <InputLabel htmlFor="age-native-simple">First Frost Month</InputLabel>
                      <Select
                        label="First Frost Month"
                        native
                        value={firstFrostMonth}
                        onChange={(event) => {
                          setFirstFrostMonth(event.target.value);
                        }}
                        inputProps={{
                          name: 'age',
                          id: 'age-native-simple',
                        }}
                      >
                        {months.map((val, key) => (
                          <option value={moment(val, 'MMM').format('MMMM')} key={key}>
                            {val}
                          </option>
                        ))}
                      </Select>
                      {firstFrostMonth !== weatherDataShadow.averageFrost.firstFrostDate.month ? (
                        <Button
                          className="text-danger"
                          size="small"
                          onClick={() => setFirstFrostMonth(
                            weatherDataShadow.averageFrost.firstFrostDate.month,
                          )}
                        >
                          Values changed, Reset?
                        </Button>
                      ) : (
                        <Typography variant="body2">5 Year Average</Typography>
                      )}
                    </FormControl>
                  </div>
                  <div className="col-6">
                    <FormControl>
                      <TextField
                        label="First Frost Day"
                        type="number"
                        max="31"
                        min="1"
                        multiline
                        helperText={firstFrostDayHelper}
                        error={firstFrostDayError}
                        maxLength={2}
                        id="margin-none"
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
                        sx={{
                          marginLeft: 1,
                          marginRight: 1,
                          width: 200,
                        }}
                      />
                      {parseInt(firstFrostDay, 10)
                        !== parseInt(weatherDataShadow.averageFrost.firstFrostDate.day, 10) ? (
                          <Button
                            className="text-danger"
                            size="small"
                            onClick={() => setFirstFrostDay(
                              parseInt(weatherDataShadow.averageFrost.firstFrostDate.day, 10),
                            )}
                          >
                            Values changed, Reset?
                          </Button>
                        ) : (
                          <Typography variant="body2" style={{ marginLeft: '8px' }}>
                            5 Year Average
                          </Typography>
                        )}
                    </FormControl>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-6">
                    <FormControl style={{ width: '100%' }}>
                      <InputLabel htmlFor="last-frost-month">Last Frost Month</InputLabel>
                      <Select
                        label="Last Frost Month"
                        native
                        value={lastFrostMonth}
                        onChange={(event) => {
                          setLastFrostMonth(event.target.value);
                        }}
                        inputProps={{
                          name: 'last-frost-month',
                          id: 'last-frost-month',
                        }}
                      >
                        {months.map((val, key) => (
                          <option value={moment(val, 'MMM').format('MMMM')} key={key}>
                            {val}
                          </option>
                        ))}
                      </Select>
                      {lastFrostMonth !== weatherDataShadow.averageFrost.lastFrostDate.month ? (
                        <Button
                          className="text-danger"
                          size="small"
                          onClick={() => setLastFrostMonth(weatherDataShadow.averageFrost.lastFrostDate.month)}
                        >
                          Values changed, Reset?
                        </Button>
                      ) : (
                        <Typography variant="body2">5 Year Average</Typography>
                      )}
                    </FormControl>
                  </div>
                  <div className="col-6">
                    <FormControl>
                      <TextField
                        label="Last Frost Day"
                        type="number"
                        max="31"
                        min="1"
                        helperText={lastFrostDayHelper}
                        error={lastFrostDayError}
                        multiline
                        maxLength={2}
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
                        sx={{
                          marginLeft: 1,
                          marginRight: 1,
                          width: 200,
                        }}
                      />
                      {parseInt(lastFrostDay, 10)
                        !== parseInt(weatherDataShadow.averageFrost.lastFrostDate.day, 10) ? (
                          <Button
                            className="text-danger"
                            size="small"
                            onClick={() => setLastFrostDay(
                              parseInt(weatherDataShadow.averageFrost.lastFrostDate.day, 10),
                            )}
                          >
                            Values changed, Reset?
                          </Button>
                        ) : (
                          <Typography variant="body2" style={{ marginLeft: '8px' }}>
                            5 Year Average
                          </Typography>
                        )}
                    </FormControl>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-12">
                    <Typography variant="h6">Average Precipitation</Typography>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-6">
                    <FormControl>
                      <TextField
                        label={currentMonthFull}
                        type="number"
                        inputProps={{ min: '1', max: '100', step: '0.01' }}
                        maxLength={4}
                        helperText="Inches"
                        value={averagePrecipitation.thisMonth}
                        onChange={(event) => {
                          setAveragePrecipitation({
                            ...averagePrecipitation,
                            thisMonth: event.target.value === '' ? 0 : event.target.value,
                          });
                        }}
                        sx={{
                          marginLeft: 1,
                          marginRight: 1,
                          width: 200,
                        }}
                      />
                      {parseFloat(averagePrecipitation.thisMonth)
                        !== parseFloat(weatherDataShadow.averagePrecipitation.thisMonth) ? (
                          <Button
                            className="text-danger"
                            size="small"
                            onClick={() => setAveragePrecipitation({
                              thisMonth: parseFloat(
                                weatherDataShadow.averagePrecipitation.thisMonth,
                              ),
                              annual: parseFloat(averagePrecipitation.annual),
                            })}
                          >
                            Values changed, Reset?
                          </Button>
                        ) : (
                          <Typography variant="body2" style={{ marginLeft: '8px' }}>
                            5 Year Average
                          </Typography>
                        )}
                    </FormControl>
                  </div>
                  <div className="col-6">
                    <FormControl>
                      <TextField
                        label="Annual"
                        type="number"
                        inputProps={{ min: '1', max: '100', step: '0.01' }}
                        maxLength={4}
                        helperText="Inches"
                        value={averagePrecipitation.annual}
                        onChange={(event) => {
                          setAveragePrecipitation({
                            ...averagePrecipitation,
                            annual:
                                event.target.value === '' ? 0 : parseFloat(event.target.value),
                          });
                        }}
                        sx={{
                          marginLeft: 1,
                          marginRight: 1,
                          width: 200,
                        }}
                      />
                      {parseFloat(averagePrecipitation.annual)
                        !== parseFloat(weatherDataShadow.averagePrecipitation.annual) ? (
                          <Button
                            className="text-danger"
                            size="small"
                            onClick={() => setAveragePrecipitation({
                              thisMonth: parseFloat(averagePrecipitation.thisMonth),
                              annual: parseFloat(weatherDataShadow.averagePrecipitation.annual),
                            })}
                          >
                            Values changed, Reset?
                          </Button>
                        ) : (
                          <Typography variant="body2" style={{ marginLeft: '8px' }}>
                            5 Year Average
                          </Typography>
                        )}
                    </FormControl>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-12">
                    <Typography variant="h6">Frost Free Days</Typography>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-6">
                    <FormControl>
                      <TextField
                        label="Frost Free Days"
                        type="number"
                        step="0.01"
                        multiline
                        maxLength={4}
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
                        sx={{
                          marginLeft: 1,
                          marginRight: 1,
                          width: 200,
                        }}
                      />
                      {parseInt(frostFreeDays, 10) !== parseInt(weatherDataShadow.frostFreeDays, 10) ? (
                        <Button
                          className="text-danger"
                          size="small"
                          onClick={() => setFrostFreeDays(parseInt(weatherDataShadow.frostFreeDays, 10))}
                        >
                          Values changed, Reset?
                        </Button>
                      ) : (
                        <Typography variant="body2" style={{ marginLeft: '8px' }}>
                          5 Year Average
                        </Typography>
                      )}
                    </FormControl>
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
      </Modal>
    </div>
  );
};

export default WeatherConditions;
