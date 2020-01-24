import React, { useContext, useState } from "react";
import {
  TextField
  // Paper,
  // makeStyles,
  // InputBase,
  // IconButton,
  // Menu,
  // MenuItem,
  // Fade
} from "@material-ui/core";
import { Context } from "../../store/Store";
import axios from "axios";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import SearchIcon from "@material-ui/icons/Search";

const AutoCompleteComponent = () => {
  const [state, dispatch] = useContext(Context);
  //   const [menuOpen, setMenuOpen] = React.useState(false);
  //   const [addressSuggest, setAddressSuggest] = React.useState([]);
  //   const [anchorEl, setAnchorEl] = React.useState(null);
  //   const open = Boolean(anchorEl);

  const [autoCompleteState, setState] = useState({
    addr: "",
    suggestions: [],
    suggestionText: "Enter atlease 4 characters"
  });

  const handleChange = e => {
    // console.log(e.target.value);
    let q = e.target.value;
    const endpoint = `https://nominatim.openstreetmap.org/search/?q=${q}&format=json`;
    setState({
      addr: e.target.value
    });
    // // console.log(`addr length: ${autoCompleteState.addr.length}`);
    let addressLength = autoCompleteState.addr.length + 1;
    if (addressLength >= 6) {
      //   //   console.log(dat);
      //   setMenuOpen(false);
      //   setAnchorEl(e.currentTarget);
      axios
        .get(endpoint)
        .then(resp => {
          let results = resp.data;
          let markers = [];
          console.log(results.data);
          if (results.length === 1) {
            //         setMenuOpen(true);
            // exactly 1 result
            markers[0] = results[0].lat;
            markers[1] = results[0].lon;
            dispatch({
              type: "CHANGE_ADDRESS_BY_TYPING",
              data: {
                address: results[0].display_name,
                showAddressChangeBtn: false,
                markers: [markers]
              }
            });
            setState({
              addr: results[0].display_name
            });
            return results;
          } else {
            return "many";
          }
        })
        .then(results => {
          if (results !== "many") {
            let result = results[0];
            console.log(result);
            let lat = result.lat;
            let lon = result.lon;
            let reverseEndpoint = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
            axios.get(reverseEndpoint).then(resp => {
              console.log(resp);
              let res = resp.data;
              let zip = res.address.postcode;
              dispatch({
                type: "CHANGE_ADDRESS",
                data: {
                  address: autoCompleteState.addr,
                  addressVerified: true
                }
              });
              axios
                .get(`https://phzmapi.org/${zip}.json`)
                .then(res => {
                  //   console.log(data);
                  let zone = 0;
                  let data = res.data;
                  if (data !== null && data !== undefined) {
                    if (data.zone.length > 1) {
                      //  strip everything except the first char and covert it to int
                      zone = data.zone.charAt(0);
                    } else zone = data.zone;
                    return (zone = parseInt(zone));
                  } else {
                    return 7;
                  }
                })
                .then(zone => {
                  // check if zone is in the NECCC range else set a default
                  if (zone <= 7 && zone > 1) {
                    if (zone === 2 || zone === 3) {
                      dispatch({
                        type: "UPDATE_ZONE_TEXT",
                        data: {
                          zoneText: "Zone 2 & 3",
                          zone: parseInt(2)
                        }
                      });
                    } else {
                      dispatch({
                        type: "UPDATE_ZONE_TEXT",
                        data: {
                          zoneText: `Zone ${zone}`,
                          zone: parseInt(zone)
                        }
                      });
                    }
                  } else {
                    dispatch({
                      type: "UPDATE_ZONE_TEXT",
                      data: {
                        zoneText: `Zone 7`,
                        zone: parseInt(7)
                      }
                    });
                  }
                });
            });
          }
        });
    }
  };

  const handleMenuClose = () => {
    // setAnchorEl(null);
  };

  return (
    <div>
      <TextField
        // value={state.address === "" ? "" : state.address}
        value={state.address === "" ? autoCompleteState.addr : state.address}
        id="fieldAddress"
        style={{ width: "100%" }}
        autoComplete="new-password"
        placeholder="Enter Address"
        label="Location"
        variant="outlined"
        onChange={handleChange}
      />
    </div>
  );
};

export default AutoCompleteComponent;
