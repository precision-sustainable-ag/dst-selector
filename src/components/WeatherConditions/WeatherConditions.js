/*
  Contains the climate conditions widget
  validateAndBroadcastModalData validates that the day is between 1 and 31
  styled using makeStyles
*/

import {
  Backdrop,
  Button,
  Fade,
  FormControl,
  FormGroup,
  InputLabel,
  Modal,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {
  AcUnit, Info, Opacity, WbSunnyOutlined,
} from '@mui/icons-material';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { LightButton } from '../../shared/constants';
import { Context } from '../../store/Store';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const WeatherConditions = ({ caller }) => {
  const { state, dispatch } = useContext(Context);
  const classes = useStyles();
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
          Climate Conditions?
        </Typography>
      </div>
      <div className="mt-2 col-12 text-left">
        <Typography
          variant="button"
          className={`font-weight-bold text-uppercase text-left ${
            anyValuesChanged ? 'text-danger' : ''
          }`}
          onClick={handleModalOpen}
          style={{ cursor: 'pointer' }}
        >
          &nbsp;Click To Edit
          {anyValuesChanged ? ', values changed' : ''}
        </Typography>
      </div>
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
            {state.weatherData.averagePrecipitation.thisMonth}
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
            {state.weatherData.averagePrecipitation.annual}
            {' '}
            inches
          </Typography>
        </div>
      </div>
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="ransition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={`modalContainer ${classes.paper}`}>
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
                          className={classes.textField}
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
                          className={classes.textField}
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
                          className={classes.textField}
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
                          className={classes.textField}
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
                            if (!Number.NaNisNaN(event.target.value)) {
                              if (event.target.value === '') {
                                setFrostFreeDays(0);
                              } else setFrostFreeDays(parseInt(event.target.value, 10));
                            } else {
                              setFrostFreeDays(0);
                            }
                          }}
                          className={classes.textField}
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
                      <LightButton disabled={false} onClick={validateAndBroadcastModalData}>
                        update
                      </LightButton>
                      <Button onClick={() => setOpen(false)}>cancel</Button>
                    </div>
                  </div>
                </FormGroup>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default WeatherConditions;
