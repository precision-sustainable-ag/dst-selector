import React, { useEffect, useContext } from "react";
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
// import { Link, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const LocationComponent = () => {
  const classes = useStyles();
  const [state, dispatch] = useContext(Context);

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

  return (
    <div
      className="container-fluid pt-2"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="row boxContainerRow" style={{ minHeight: "480px" }}>
        <div className="col-xl-6 col-lg-12">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <Typography variant="h3">
                  Where is your field located?
                </Typography>
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-12">
                <Typography variant="body1" align="left">
                  Enter your USDA plant hardiness zone, address or zip code to
                  determine your location. Then click
                  <img
                    height="20"
                    width="20"
                    src="/images/icons/pentagon.png"
                  />
                  {/* <span
                    style={{
                      background: `url('/static/media/spritesheet.fd5728f2.svg')`,
                      backgroundPosition: "-77px -2px",
                      width: "26px",
                      height: "26px",
                      display: "inline-block",
                    }}
                  ></span> */}
                  to draw your field boundary on the map.
                </Typography>
                <Typography variant="body1" align="left" className="pt-2">
                  Plant hardiness zone, zip code, or address will return the
                  most general recommendations, whereas drawing your field on
                  the map will return the most site-specific recommendations
                </Typography>
                {/* <p style={{ fontSize: "18px" }}>
                  
                </p> */}
              </div>
            </div>
            <div className="row pt-3 mt-4">
              <div className="col-md-6 col-lg-6 col-sm-12 col-12">
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
                    onChange={(event) => {
                      //   console.log("evvt" + event.target.);
                      if (event.target.value === 3) {
                        dispatch({
                          type: "UPDATE_ZONE_TEXT",
                          data: {
                            zoneText: "Zone 3",
                            zone: parseInt(event.target.value),
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
                            zone: parseInt(event.target.value),
                          },
                        });
                      }
                    }}
                    value={state.zone}
                  >
                    <MenuItem value={0}>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={3} key={3}>
                      Zone 3
                    </MenuItem>
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
                <div className="col-md-12 row">
                  <LiveLocation />
                </div>
              </div>
              <div className="col-md-6 col-sm-12 row">
                <AutoComplete />
                <div className="col-md-12 text-left">
                  <LocationToggleComponent />
                </div>
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
        </div>
      </div>
    </div>
  );
};

export default LocationComponent;
