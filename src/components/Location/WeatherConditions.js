import React, { useContext, useState } from "react";
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
  Typography
} from "@material-ui/core";

import { Context } from "../../store/Store";

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
  //   const [state, dispatch] = useContext(Context);
  const classes = useStyles();
  //   const [selectedDate, setSelectedDate] = useState(
  //     new Date("2014-08-18T21:11:54")
  //   );
  const [open, setOpen] = React.useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const getPickerValue = value => {
    console.log(value);
  };
  //   const renderModalEditContent = () => {
  //     return (

  //     );
  //   };
  return (
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
            First Frost Date: <b>Oct 13</b>
          </div>
          <div className="offset-lg-1">
            {" "}
            Last Frost Date: <b>May 2</b>
          </div>
          <div className="text-right font-size-small">
            (source: NOAA <Info className="font-size-small" /> )
          </div>
        </div>
        <div className="offset-lg-1 col-lg-11">
          Average Precipitation
          <div className="offset-lg-1">
            NOVEMBER: <b>3.6 inches</b>
          </div>
          <div className="offset-lg-1">
            Annual: <b>43 inches</b>
          </div>
          <div className="text-right font-size-small">
            (source: NOAA <Info className="font-size-small" /> )
          </div>
        </div>
        <div className="offset-lg-1 col-lg-11">
          Frost Free Days: <b>173</b>
          <div className="text-right font-size-small">
            (source: SSURGO <Info className="font-size-small" /> )
          </div>
        </div>
      </div>
      <div className="col-lg-3 mt-2">
        <Button onClick={handleModalOpen}>CLICK TO EDIT</Button>
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
                      <TextField
                        label="First Frost Month"
                        id="margin-none"
                        defaultValue="Oct"
                        className={classes.textField}
                        helperText=""
                      />
                    </div>
                    <div className="col-6">
                      <TextField
                        label="First Frost Day"
                        id="margin-none"
                        defaultValue="13"
                        className={classes.textField}
                        helperText=""
                      />
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
                      <TextField
                        label="November"
                        id="margin-none"
                        defaultValue="3.6 inches"
                        className={classes.textField}
                        helperText=""
                      />
                    </div>
                    <div className="col-6">
                      <TextField
                        label="Annual"
                        id="margin-none"
                        defaultValue="43 inches"
                        className={classes.textField}
                        helperText=""
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
                      <TextField
                        label="Frost Free Days"
                        id="margin-none"
                        defaultValue="173"
                        className={classes.textField}
                        helperText=""
                      />
                    </div>
                    <div className="col-6"></div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-6">
                      <LightButton>update</LightButton>
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
