/*
  This file contains the UpdateLatLong, SetZoneState, changeProgress components
  The UpdateLatLong allows the user to change their latitude and longitude
  The SetZoneState allows the user change their zone
  The changeProgress allows the user to change the progress they are at in the goal selection process
*/

import axios from "axios";
import { useContext } from "react";
import { Context } from "../store/Store";

export const UpdateLatLong = async (lat, lon) => {
  const [state, dispatch] = useContext(Context);
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
  await axios
    .get(url)
    .then((response) => {
      let data = response.data;
      let fullAddress = data.display_name;
      console.log(data);

      // check https://phzmapi.org/[zip].json to map zone with zip probably also restricting the zips?
      SetZoneState(data.address.postcode);
      return fullAddress;
    })
    .then((fullAddress) => {
      dispatch({
        type: "CHANGE_ADDRESS",
        data: { address: `${fullAddress}`, addressVerified: true },
      });
    });
};
const SetZoneState = async (zip) => {
  const [state, dispatch] = useContext(Context);
  await axios
    .get(`https://phzmapi.org/${zip}.json`)
    .then((response) => {
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
    .then((zone) => {
      // check if zone is in the NECCC range else set a default
      if (zone <= 7 && zone > 1) {
        if (zone === 2 || zone === 3) {
          dispatch({
            type: "UPDATE_ZONE_TEXT",
            data: {
              zoneText: "Zone 2 & 3",
              zone: 2,
            },
          });
        } else {
          dispatch({
            type: "UPDATE_ZONE_TEXT",
            data: {
              zoneText: `Zone ${zone}`,
              zone: parseInt(zone),
            },
          });
        }
      } else {
        dispatch({
          type: "UPDATE_ZONE_TEXT",
          data: {
            zoneText: "Zone 7",
            zone: 7,
          },
        });
      }
    });
};

export const changeProgress = (type) => {
  const [state, dispatch] = useContext(Context);
  if (type === "increment") {
    // if progress = 1 (location stage), check if textfield has a value? then set state address to that value
    // if(state.progress === 1) {
    //   if(document.getElementById('google-map-autocompletebar').)
    // }
    dispatch({
      type: "UPDATE_PROGRESS",
      data: {
        type: "INCREMENT",
      },
    });
  }

  if (type === "decrement") {
    dispatch({
      type: "UPDATE_PROGRESS",
      data: {
        type: "DECREMENT",
      },
    });
  }
};
