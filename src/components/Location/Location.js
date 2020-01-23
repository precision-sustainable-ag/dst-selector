import React, { useEffect, useContext } from "react";
import { Context } from "../../store/Store";
import "../../styles/location.scss";

// import { cloudIcon } from "../../shared/constants";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  withStyles,
  Button
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import MapComponent from "./Map";
import LiveLocation from "./LiveLocation";
import AutoComplete from "./AutoComplete";
// import { Link, Button } from "@material-ui/core";

const LocationComponent = () => {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    console.log("---Location.js started---");
  });

  const handleAddressChangeByText = event => {
    console.log(event.target.value);
    dispatch({
      type: "CHANGE_ADDRESS_BY_TYPING",
      data: {
        address: event.target.value,
        showAddressChangeBtn: true
      }
    });
  };

  const updateAddressOnClick = async () => {
    // update the new text address from state to map with a new marker!

    // get currect address from state
    var q = state.address;
    // https://nominatim.openstreetmap.org/search/?q=1139%20crab%20orchard%20drive&format=json
    await axios
      .get(`https://nominatim.openstreetmap.org/search/?q=${q}&format=json`)
      .then(response => {
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
              snackMessage: "Address Updated"
            }
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
              snackMessage: "Please complete the address"
            }
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
            showAddressChangeBtn: false
          }
        });
      });
  };

  return (
    <div
      className="container-fluid mt-5"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div className="row boxContainerRow" style={{}}>
        <div className="col-lg-6 col-sm-12">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h1>Where is your field located?</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <p style={{ fontSize: "18px" }}>
                  Select plant hardiness zone for least site specific results.
                  Enter address or zip code for county-level specificity. For
                  more specific results, mark out your field boundary in the
                  map.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <FormControl variant="filled" style={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Plant Hardiness Zone
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    style={{
                      textAlign: "left"
                    }}
                    onChange={event => {
                      //   console.log("evvt" + event.target.);
                      if (event.target.value === 2) {
                        dispatch({
                          type: "UPDATE_ZONE_TEXT",
                          data: {
                            zoneText: "Zone 2 & 3",
                            zone: parseInt(event.target.value)
                          }
                        });
                      } else if (event.target.value === 4) {
                        dispatch({
                          type: "UPDATE_ZONE_TEXT",
                          data: {
                            zoneText: "Zone 4",
                            zone: parseInt(event.target.value)
                          }
                        });
                      } else if (event.target.value === 5) {
                        dispatch({
                          type: "UPDATE_ZONE_TEXT",
                          data: {
                            zoneText: "Zone 5",
                            zone: parseInt(event.target.value)
                          }
                        });
                      } else if (event.target.value === 6) {
                        dispatch({
                          type: "UPDATE_ZONE_TEXT",
                          data: {
                            zoneText: "Zone 6",
                            zone: parseInt(event.target.value)
                          }
                        });
                      } else {
                        dispatch({
                          type: "UPDATE_ZONE_TEXT",
                          data: {
                            zoneText: "Zone 7",
                            zone: parseInt(event.target.value)
                          }
                        });
                      }
                    }}
                    value={state.zone}
                  >
                    <MenuItem value={0}>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={2} key={2}>
                      Zone 2 and 3
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
              </div>
              <div className="col-md-6 col-sm-12">
                <AutoComplete />
                {/* <TextField
                  value={state.address}
                  id="locationAddress"
                  label="Location"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={handleAddressChangeByText}
                />
                {state.showAddressChangeBtn ? (
                  <LightButton
                    style={{ marginLeft: "15px", marginTop: "5px" }}
                    onClick={() => updateAddressOnClick}
                  >
                    Update
                  </LightButton>
                ) : (
                  ""
                )} */}
              </div>
            </div>
            <div className="row">
              <div
                className="col-md-6 offset-md-6 col-sm-12"
                style={{ textAlign: "left" }}
              >
                <LiveLocation />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 offset-md-6 col-sm-12"></div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-sm-12">
          <MapComponent width="100%" height="100%" minzoom={4} maxzoom={20} />
        </div>
      </div>
    </div>
  );
};

export default LocationComponent;
