import React, { useEffect, useContext } from "react";
import { FormGroup, FormControlLabel, Switch } from "@material-ui/core";
import { Context } from "../../store/Store";
import axios from "axios";
import MapComponent from "./Map";
import { UpdateLatLong } from "../../shared/Functions";

const LiveLocationComponent = () => {
  const [state, dispatch] = useContext(Context);
  const [lstate, setState] = React.useState({
    checkedL: false
  });

  const handleLocationToggle = name => event => {
    if (event.target.checked) {
      let options = {
        enableHighAccuracy: true,
        maximumAge: 60000,
        timeout: 45000
      };
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            if (isUndefined(lat) || isUndefined(long)) return false;
            else {
              const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`;
              axios
                .get(url)
                .then(response => {
                  let data = response.data;
                  let fullAddress = data.display_name;
                  // console.log(data);
                  // const { markers } = state;
                  // markers.pop();
                  let mrkrArr = [];
                  mrkrArr[0] = lat;
                  mrkrArr[1] = long;
                  // alert(mrkrArr);
                  // console.log("mrkrArr: " + mrkrArr.lat);
                  // markers.push(mrkrArr);
                  // console.log(e.latlng);
                  dispatch({
                    type: "UPDATE_MARKER",
                    data: {
                      markers: [mrkrArr]
                    }
                  });
                  // check https://phzmapi.org/[zip].json to map zone with zip probably also restricting the zips?
                  SetZoneState(data.address.postcode);
                  return fullAddress;
                })
                .then(fullAddress => {
                  dispatch({
                    type: "CHANGE_ADDRESS",
                    data: { address: `${fullAddress}`, addressVerified: true }
                  });

                  // markers.push(mrkrArr);
                  // console.log(e.latlng);
                  // dispatch({
                  //   type: "UPDATE_MARKER",
                  //   data: {
                  //     markers: markers
                  //   }
                  // });
                })
                .then(() => {});
            }
          },
          function() {
            alert("Oops! An error occurred.");
          },
          options
        );
      }
    }

    setState({ [name]: event.target.checked });
  };

  const SetZoneState = async zip => {
    await axios
      .get(`https://phzmapi.org/${zip}.json`)
      .then(response => {
        let data = response.data;
        let zone = 0;
        if (data !== null && data !== undefined) {
          if (data.zone.length > 1) {
            //  strip everything except the first char and covert it to int
            zone = data.zone.charAt(0);
            // alert(zone);
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
                zone: 2
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
              zoneText: "Zone 7",
              zone: 7
            }
          });
        }
      });
  };

  const isUndefined = val => {
    if (val === undefined || val === "" || val === null) return true;
    else return false;
  };

  return (
    <div>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={state.checkedL}
              onChange={handleLocationToggle("checkedL")}
              value="checkedL"
            />
          }
          label={lstate.checkedL ? "Yes" : "No"}
        />
      </FormGroup>
      <small>Use Current Location</small>
    </div>
  );
};

export default LiveLocationComponent;
