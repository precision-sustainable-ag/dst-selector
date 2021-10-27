/*
  This is the main location widget component
  styled using ../../styles/location.scss
*/

import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/Store";
import "../../styles/location.scss";

// import { cloudIcon } from "../../shared/constants";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  // TextField,
  // withStyles,
  // Button
} from "@material-ui/core";
// import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import MapComponent from "./Map";
import LiveLocation from "./LiveLocation";
import AutoComplete from "./AutoComplete";
import LocationToggleComponent from "./LocationToggle";
import MapContext from "./MapContext";
import { Search } from "@material-ui/icons";
import { RestartPrompt } from "../../shared/constants";
import GoogleMaps from "./GoogleMaps";
import GoogleAutocomplete from "./GoogleAutocomplete";
// import { Link, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
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

  const handleAddressChangeByText = (event) => {
    console.log(event.target.value);
    dispatch({
      type: "CHANGE_ADDRESS_BY_TYPING",
      data: {
        address: event.target.value,
        showAddressChangeBtn: true,
      },
    });
  };

  const updateAddressOnClick = async () => {
    // update the new text address from state to map with a new marker!

    // get currect address from state
    var q = state.address;
    // https://nominatim.openstreetmap.org/search/?q=1139%20crab%20orchard%20drive&format=json
    await axios
      .get(`https://nominatim.openstreetmap.org/search/?q=${q}&format=json`)
      .then((response) => {
        let data = response.data;
        // console.log(data);
        if (data.length === 1) {
          dispatch({
            action: "UPDATE_ADDRESS_ON_MAP_CLICK",
            data: {
              markers: [[data[0].lat, data[0].lon]],
              zoom: 15,
              addressVerified: true,
              address: data[0].display_name,
              snackOpen: true,
              snackMessage: "Address Updated",
            },
          });
          // th;
          //   this.setState({
          //     markers: [[data[0].lat, data[0].lon]],
          //     zoom: 15,
          //     addressVerified: true,
          //     address: data[0].display_name
          //   });
        } else {
          dispatch({
            action: "UPDATE_ADDRESS_ON_MAP_CLICK",
            data: {
              address: "",
              addressVerified: false,
              snackOpen: true,
              snackMessage: "Please complete the address",
            },
          });
        }

        // let latlng = data.display_name;
        // this.setState({
        //   address: latlng
        // });
        // let latlng = data.results.map((latlng) => {

        // })
      })
      .then(() => {
        dispatch({
          action: "TOGGLE_ADDRESS_CHANGE_BUTTON",
          data: {
            showAddressChangeBtn: false,
          },
        });
      });
  };

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
  }, [restartAccept]);
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
    // console.log("return", selectedToEditSite);
    let { latitude, longitude, county, address, zipCode } = selectedToEditSite;
    // console.log(address);
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
  }, [selectedToEditSite]);
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
                  {/* Then click{" "}
                  <img
                    height="20"
                    width="20"
                    src="/images/icons/pentagon.png"
                  />{" "}
                  to draw your field boundary on the map. */}
                </Typography>
                {/* <Typography variant="body1" align="left" className="pt-2">
                  Plant hardiness zone, address, or zip code will return the
                  most general recommendations, whereas drawing your field on
                  the map will return the most site-specific recommendations.
                </Typography> */}
              </div>
            </div>
            <div className="row pt-3 mt-4">
              <div className="col-md-9 col-lg-8 col-sm-12 row">
                {/* <AutoComplete
                  from={caller === "greenbar" ? "greenbar" : "component"}
                /> */}
                <GoogleAutocomplete
                  selectedToEditSite={selectedToEditSite}
                  setSelectedToEditSite={setSelectedToEditSite}
                />
                {/* <div className="col-md-12 text-left">
                  <LocationToggleComponent />
                </div> */}
              </div>
              <div className="col-md-3 col-lg-4 col-sm-12 col-12">
                <FormControl
                  variant="filled"
                  style={{ width: "100%" }}
                  className={classes.formControl}
                >
                  <InputLabel>PLANT HARDINESS ZONEz</InputLabel>
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
                {/* <div className="col-md-12 row">
                  <LiveLocation />
                </div> */}
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
          {/* <MapComponent width="100%" height="100%" minzoom={4} maxzoom={20} /> */}
          <MapContext
            width="100%"
            height="400px"
            minzoom={4}
            maxzoom={20}
            from="location"
          />
          {/* <GoogleMaps /> */}
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
