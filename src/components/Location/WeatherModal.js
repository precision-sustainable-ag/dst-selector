import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Modal,
  makeStyles,
  Fade,
  Backdrop,
  FormGroup,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select
} from "@material-ui/core";

import moment from "moment";
import { Context } from "../../store/Store";
import { LightButton } from "../../shared/constants";

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

const WeatherModal = props => {
  const classes = useStyles();

  const [state, dispatch] = useContext(Context);
  const [open, setOpen] = useState(props.open);
  const [modalBtnDisabled, setModalBtnDisabled] = useState(false);
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

    setOpen(!open);

    // data incorrect

    // show error on modal
  };
  const handleModalOpen = () => {
    setOpen(!open);
  };

  const handleModalClose = () => {
    setOpen(!open);
  };

  useEffect(() => {
    // get current month in long form
    setCurrentMonthFull(moment().format("MMMM"));
    // render monthsShort on the modal
    setMonths(moment.localeData().monthsShort());
  }, []);

  return (
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
                    <Typography variant="h6">Average Frost Dates</Typography>
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
                          <option value={moment(val, "MMM").format("MMMM")}>
                            {val}
                          </option>
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

                    {/* <TextField
                        label="Last Frost Month"
                        id="margin-none"
                        defaultValue="Oct"
                        className={classes.textField}
                        helperText=""
                      /> */}
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
                    {/* <TextField
                        label="Last Frost Day"
                        id="margin-none"
                        defaultValue="13"
                        className={classes.textField}
                        helperText=""
                      /> */}
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
                                state.weatherData.averagePrecipitation.thisMonth
                              )
                            });
                          }
                        }}
                        className={classes.textField}
                      />
                    </FormControl>
                    {/* <TextField
                        label="November"
                        id="margin-none"
                        defaultValue="3.6 inches"
                        className={classes.textField}
                        helperText=""
                      /> */}
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
                              // setFirstFrostDay("");

                              setAveragePrecipitation({
                                ...averagePrecipitation,
                                annual: parseFloat(
                                  state.weatherData.averagePrecipitation.annual
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
                    {/* <TextField
                        label="Annual"
                        id="margin-none"
                        defaultValue="43 inches"
                        className={classes.textField}
                        helperText=""
                      /> */}
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
                      {/* TODO */}
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
                              // setFirstFrostDay("");

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
                    {/* <TextField
                        label="Frost Free Days"
                        id="margin-none"
                        defaultValue="173"
                        className={classes.textField}
                        helperText=""
                      /> */}
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
  );
};

export default WeatherModal;
