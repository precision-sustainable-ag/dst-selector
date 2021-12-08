/*
  This is the main location widget component
  styled using ../../styles/location.scss
*/

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/Store";
import "../../styles/location.scss";
import GoogleAutocomplete from "./GoogleAutocomplete";
import MapContext from "./MapContext";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const LocationComponent = ({ title, caller }) => {
  const classes = useStyles();
  const [state, dispatch] = useContext(Context);
  const [showRestartPrompt, setShowRestartPrompt] = useState(false);
  const [restartAccept, setRestartAccept] = useState(false);
  const [zoneSelection, setZoneSelection] = useState(7);
  useEffect(() => {
    document.title = title ? title : "Decision Support Tool";
  }, [title]);

  useEffect(() => {
    if (zoneSelection === 3) {
      dispatch({
        type: "UPDATE_ZONE_TEXT",
        data: {
          zoneText: "Zone 7",
          zone: parseInt(7),
        },
      });
    } else if (zoneSelection === 4) {
      dispatch({
        type: "UPDATE_ZONE_TEXT",
        data: {
          zoneText: "Zone 4",
          zone: parseInt(zoneSelection),
        },
      });
    } else if (zoneSelection === 5) {
      dispatch({
        type: "UPDATE_ZONE_TEXT",
        data: {
          zoneText: "Zone 5",
          zone: parseInt(zoneSelection),
        },
      });
    } else if (zoneSelection === 6) {
      dispatch({
        type: "UPDATE_ZONE_TEXT",
        data: {
          zoneText: "Zone 6",
          zone: parseInt(zoneSelection),
        },
      });
    } else {
      dispatch({
        type: "UPDATE_ZONE_TEXT",
        data: {
          zoneText: "Zone 7",
          zone: parseInt(7),
        },
      });
    }
  }, [restartAccept, dispatch, zoneSelection]);

  const handleZoneChange = (event) => {
    if (caller === "greenbar") {
      setShowRestartPrompt(true);
      setZoneSelection(event.target.value);
    } else {
      if (event.target.value === 3) {
        dispatch({
          type: "UPDATE_ZONE_TEXT",
          data: {
            zoneText: "Zone 7",
            zone: parseInt(7),
          },
        });
      } else if (event.target.value === 4) {
        dispatch({
          type: "UPDATE_ZONE_TEXT",
          data: {
            zoneText: "Zone 4",
            zone: parseInt(event.target.value),
          },
        });
      } else if (event.target.value === 5) {
        dispatch({
          type: "UPDATE_ZONE_TEXT",
          data: {
            zoneText: "Zone 5",
            zone: parseInt(event.target.value),
          },
        });
      } else if (event.target.value === 6) {
        dispatch({
          type: "UPDATE_ZONE_TEXT",
          data: {
            zoneText: "Zone 6",
            zone: parseInt(event.target.value),
          },
        });
      } else {
        dispatch({
          type: "UPDATE_ZONE_TEXT",
          data: {
            zoneText: "Zone 7",
            zone: parseInt(7),
          },
        });
      }
    }
  };
  const [selectedToEditSite, setSelectedToEditSite] = useState({});
  useEffect(() => {
    let { latitude, longitude, address, zipCode } = selectedToEditSite;
    if (Object.keys(selectedToEditSite).length === 5) {
      dispatch({
        type: "UPDATE_LOCATION",
        data: {
          address: address,
          latitude: latitude,
          longitude: longitude,
          zip: zipCode,
        },
      });
    }
  }, [selectedToEditSite, dispatch]);
  return (
    <div className="container-fluid mt-5">
      <div className="row boxContainerRow" style={{ minHeight: "520px" }}>
        <div className="col-xl-6 col-lg-12">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <Typography variant="h4">
                  Where is your field located?
                </Typography>
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-12">
                <Typography variant="body1" align="left">
                  Enter your USDA plant hardiness zone, address, or zip code and
                  hit <Search fontSize="inherit" /> to determine your location.
                </Typography>
              </div>
            </div>
            <div className="row pt-3 mt-4">
              <div className="col-md-9 col-lg-8 col-sm-12 row">
                <GoogleAutocomplete
                  selectedToEditSite={selectedToEditSite}
                  setSelectedToEditSite={setSelectedToEditSite}
                />
              </div>
              <div className="col-md-3 col-lg-4 col-sm-12 col-12">
                <FormControl
                  variant="filled"
                  style={{ width: "100%" }}
                  className={classes.formControl}
                >
                  <InputLabel>PLANT HARDINESS ZONE</InputLabel>
                  <Select
                    variant="filled"
                    labelId="plant-hardiness-zone-dropdown-select"
                    id="plant-hardiness-zone-dropdown-select"
                    style={{
                      textAlign: "left",
                    }}
                    onChange={handleZoneChange}
                    value={state.zone}
                  >
                    <MenuItem value={4} key={4}>
                      Zone 4
                    </MenuItem>
                    <MenuItem value={5} key={5}>
                      Zone 5
                    </MenuItem>
                    <MenuItem value={6} keuy={6}>
                      Zone 6
                    </MenuItem>
                    <MenuItem value={7} key={7}>
                      Zone 7
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="row">
              <div
                className="col-md-6 offset-md-6 col-sm-12 row"
                style={{ textAlign: "left" }}
              ></div>
            </div>
            <div className="row">
              <div className="col-md-6 offset-md-6 col-sm-12"></div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-12">
          <MapContext
            width="100%"
            height="400px"
            minzoom={4}
            maxzoom={20}
            from="location"
          />
        </div>
      </div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={showRestartPrompt}
      >
        <DialogContent dividers>
          <Typography variant="body1">
            Restarting will remove all cover crops added to your list. Are you
            sure you want to restart?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              setShowRestartPrompt(false);
              setRestartAccept(false);
            }}
            color="secondary"
          >
            No
          </Button>
          <Button
            onClick={() => {
              setShowRestartPrompt(false);
              setRestartAccept(true);
            }}
            color="secondary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LocationComponent;
