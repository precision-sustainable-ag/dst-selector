import React, { useContext, useState, useEffect } from "react";
import { LightButton } from "../../shared/constants";
// import Slider from "@material-ui/core/Slider";
import { Cloud, Info } from "@material-ui/icons";
import {
  Button,
  Modal,
  makeStyles,
  Fade,
  Backdrop,
  FormGroup,
  TextField,
  //   FormControlLabel,
  Typography,
  FormControl,
  InputLabel,
  Select,
  CircularProgress
} from "@material-ui/core";

import { Context } from "../../store/Store";
import moment from "moment";
import WeatherModal from "./WeatherModal";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

const WeatherConditions = () => {
  const [state, dispatch] = useContext(Context);
  const classes = useStyles();
  const [months, setMonths] = useState([]);
  const [currentMonthFull, setCurrentMonthFull] = useState("NOVEMBER");
  const [firstFrostMonth, setFirstFrostMonth] = useState(
    state.weatherData.averageFrost.firstFrostDate.month
  );
  const [firstFrostDay, setFirstFrostDay] = useState(
    state.weatherData.averageFrost.firstFrostDate.day
  );
  const [lastFrostMonth, setLastFrostMonth] = useState(
    state.weatherData.averageFrost.lastFrostDate.month
  );
  const [lastFrostDay, setLastFrostDay] = useState(
    state.weatherData.averageFrost.lastFrostDate.day
  );

  const [averagePrecipitation, setAveragePrecipitation] = useState({
    thisMonth: state.weatherData.averagePrecipitation.thisMonth,
    annual: state.weatherData.averagePrecipitation.annual
  });

  const [frostFreeDays, setFrostFreeDays] = useState(
    state.weatherData.frostFreeDays
  );

  const validateAndBroadcastModalData = () => {
    // validate existing data

    // TODO: Validate Modal Data

    // data correct

    let broadcastObject = {
      averageFrost: {
        firstFrostDate: {
          month: firstFrostMonth,
          day: firstFrostDay
        },
        lastFrostDate: {
          month: lastFrostMonth,
          day: lastFrostDay
        }
      },
      averagePrecipitation: {
        thisMonth: averagePrecipitation.thisMonth, //inches
        annual: averagePrecipitation.annual //inches
      },
      frostFreeDays: frostFreeDays
    };

    // boardcast and close modal

    dispatch({
      type: "UPDATE_WEATHER_CONDITIONS",
      data: { weatherData: broadcastObject }
    });

    setOpen(false);

    // data incorrect

    // show error on modal
  };

  useEffect(() => {
    // get current month in long form
    setCurrentMonthFull(moment().format("MMMM"));
    // render monthsShort on the modal
    setMonths(moment.localeData().monthsShort());
  }, []);
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const getPickerValue = value => {
    console.log(value);
  };

  const [modalBtnDisabled, setModalBtnDisabled] = useState(false);

  return state.ajaxInProgress ? (
    <CircularProgress />
  ) : (
    <div className="row">
      <div className="col-lg-12">
        <h1>Weather Conditions?</h1>
      </div>
      <div className="col-lg-9 mt-2">
        <h6 className="font-weight-bold text-uppercase">
          <Cloud /> HISTORICAL WEATHER
        </h6>
        <div className="offset-lg-1 col-lg-11">
          Average Frost Dates
          <div className="offset-lg-1">
            First Frost Date:{" "}
            <b>{`${state.weatherData.averageFrost.firstFrostDate.month} ${state.weatherData.averageFrost.firstFrostDate.day}`}</b>
          </div>
          <div className="offset-lg-1">
            {" "}
            Last Frost Date:{" "}
            <b>{`${state.weatherData.averageFrost.lastFrostDate.month} ${state.weatherData.averageFrost.lastFrostDate.day}`}</b>
          </div>
          <div className="text-right font-size-small">
            (source: NOAA <Info className="font-size-small" /> )
          </div>
        </div>
        <div className="offset-lg-1 col-lg-11">
          Average Precipitation
          <div className="offset-lg-1">
            {currentMonthFull}:{" "}
            <b>{state.weatherData.averagePrecipitation.thisMonth} inches</b>
          </div>
          <div className="offset-lg-1">
            Annual:{" "}
            <b>{state.weatherData.averagePrecipitation.annual} inches</b>
          </div>
          <div className="text-right font-size-small">
            (source: NOAA <Info className="font-size-small" /> )
          </div>
        </div>
        <div className="offset-lg-1 col-lg-11">
          Frost Free Days: <b>{state.weatherData.frostFreeDays}</b>
          <div className="text-right font-size-small">
            (source: SSURGO <Info className="font-size-small" /> )
          </div>
        </div>
      </div>
      <div className="col-lg-3 mt-2">
        <Button onClick={handleModalOpen}>CLICK TO EDIT</Button>
        {/* <Button onClick={renderModalWidget}>CLICK TO EDIT</Button> */}
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
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={`modalContainer ${classes.paper}`}>
            <h2 id="transition-modal-title">Edit Weather Data</h2>
            <div id="transition-modal-description">
              <div className="container-fluid">
                <FormGroup>
                  <div className="row mt-4">
                    <div className="col-12">
                      <Typography variant="h6">First Frost Data</Typography>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-6">
                      <FormControl style={{ width: "100%" }}>
                        <InputLabel htmlFor="age-native-simple">
                          First Frost Month
                        </InputLabel>
                        <Select
                          label="First Frost Month"
                          native
                          value={firstFrostMonth}
                          onChange={event => {
                            setFirstFrostMonth(event.target.value);
                          }}
                          inputProps={{
                            name: "age",
                            id: "age-native-simple"
                          }}
                        >
                          {months.map((val, key) => (
                            <option value={val}>{val}</option>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-6">
                      <FormControl>
                        <TextField
                          label="First Frost Day"
                          type="number"
                          max="31"
                          min="1"
                          multiLine={true}
                          maxLength={2}
                          id="margin-none"
                          value={firstFrostDay}
                          onChange={event => {
                            if (!isNaN(event.target.value)) {
                              if (event.target.value === "") {
                                setFirstFrostDay("");
                              } else
                                setFirstFrostDay(parseInt(event.target.value));
                            } else {
                              setFirstFrostDay(1);
                            }
                          }}
                          className={classes.textField}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-6">
                      <FormControl style={{ width: "100%" }}>
                        <InputLabel htmlFor="last-frost-month">
                          Last Frost Month
                        </InputLabel>
                        <Select
                          label="Last Frost Month"
                          native
                          value={lastFrostMonth}
                          onChange={event => {
                            setLastFrostMonth(event.target.value);
                          }}
                          inputProps={{
                            name: "last-frost-month",
                            id: "last-frost-month"
                          }}
                        >
                          {months.map((val, key) => (
                            <option value={val}>{val}</option>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-6">
                      <FormControl>
                        <TextField
                          label="Last Frost Day"
                          type="number"
                          max="31"
                          min="1"
                          multiLine={true}
                          maxLength={2}
                          value={lastFrostDay}
                          onChange={event => {
                            if (!isNaN(event.target.value)) {
                              if (event.target.value === "") {
                                setLastFrostDay("");
                              } else
                                setLastFrostDay(parseInt(event.target.value));
                            } else {
                              setLastFrostDay(1);
                            }
                          }}
                          className={classes.textField}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-12">
                      <Typography variant="h6">
                        Average Precipitation
                      </Typography>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-6">
                      <FormControl>
                        <TextField
                          label={currentMonthFull}
                          type="number"
                          step="0.01"
                          multiLine={true}
                          maxLength={4}
                          helperText="Inches"
                          value={averagePrecipitation.thisMonth}
                          onChange={event => {
                            if (!isNaN(event.target.value)) {
                              if (event.target.value === "") {
                                // setFirstFrostDay("");

                                setAveragePrecipitation({
                                  ...averagePrecipitation,
                                  thisMonth: parseFloat(
                                    state.weatherData.averagePrecipitation
                                      .thisMonth
                                  )
                                });
                              } else
                                setAveragePrecipitation({
                                  ...averagePrecipitation,
                                  thisMonth: parseFloat(event.target.value)
                                });
                            } else {
                              setAveragePrecipitation(...averagePrecipitation, {
                                thisMonth: parseFloat(
                                  state.weatherData.averagePrecipitation
                                    .thisMonth
                                )
                              });
                            }
                          }}
                          className={classes.textField}
                        />
                      </FormControl>
                    </div>
                    <div className="col-6">
                      <FormControl>
                        <TextField
                          label={"Annual"}
                          type="number"
                          step="0.01"
                          multiLine={true}
                          maxLength={4}
                          helperText="Inches"
                          value={averagePrecipitation.annual}
                          onChange={event => {
                            if (!isNaN(event.target.value)) {
                              if (event.target.value === "") {
                                setAveragePrecipitation({
                                  ...averagePrecipitation,
                                  annual: parseFloat(
                                    state.weatherData.averagePrecipitation
                                      .annual
                                  )
                                });
                              } else
                                setAveragePrecipitation({
                                  ...averagePrecipitation,
                                  annual: parseFloat(event.target.value)
                                });
                            } else {
                              setAveragePrecipitation(...averagePrecipitation, {
                                annual: parseFloat(
                                  state.weatherData.averagePrecipitation.annual
                                )
                              });
                            }
                          }}
                          className={classes.textField}
                        />
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
                          label={"Frost Free Days"}
                          type="number"
                          step="0.01"
                          multiLine={true}
                          maxLength={4}
                          value={frostFreeDays}
                          onChange={event => {
                            if (!isNaN(event.target.value)) {
                              if (event.target.value === "") {
                                setFrostFreeDays(0);
                              } else
                                setFrostFreeDays(parseInt(event.target.value));
                            } else {
                              setFrostFreeDays(0);
                            }
                          }}
                          className={classes.textField}
                        />
                      </FormControl>
                    </div>
                    <div className="col-6"></div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-6">
                      <LightButton
                        disabled={modalBtnDisabled}
                        onClick={validateAndBroadcastModalData}
                      >
                        update
                      </LightButton>
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
