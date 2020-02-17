import React, { useEffect, useContext } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Context } from "../../store/Store";
import axios from "axios";
import StateAbbreviations from "./StateAbbreviations";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

const MapComponent = ({ width, height, minzoom, maxzoom }) => {
  const [state, dispatch] = useContext(Context);
  useEffect(() => {
    console.log("---Map.js---");
  });

  const addMarker = e => {
    const { markers } = state;
    markers.pop();
    markers.push(e.latlng);
    // console.log(markers);
    dispatch({
      type: "UPDATE_MARKER",
      data: {
        markers: [[markers[0].lat, markers[0].lng]]
      }
    });
    // this.setState({ markers });
    // console.log(markers[0]);
    let lon = markers[0].lng;
    let lat = markers[0].lat;
    queryGEORevAPI(lat, lon);
  };
  const queryGEORevAPI = async (lat, lon) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

    await axios
      .get(url)
      .then(response => {
        let data = response.data;
        let fullAddress = data.display_name;
        console.log("geoorev", data);
        // set county, state (abbr) and zip to global state
        let county = data.address.county;
        let state = data.address.state;
        let zip = data.address.postcode;
        let stateAbbreviation = new StateAbbreviations();
        let abbr = stateAbbreviation.getAbbreviation(state);
        console.log("Abbreviation: ", abbr);
        // console.log(data.address.postcode);
        // check https://phzmapi.org/[zip].json to map zone with zip probably also restricting the zips?
        setZoneState(data.address.postcode);
        return fullAddress;
      })
      .then(fullAddress => {
        dispatch({
          type: "CHANGE_ADDRESS",
          data: { address: `${fullAddress}`, addressVerified: true }
        });
      })
      .catch(error => {
        console.log("nominatim error code", error.response.code);
      });
  };

  const setZoneState = async zip => {
    // console.log(zip);
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
      })
      .catch(error => {
        console.log("phzmapi.org error code: ", error.response.status);
        if (error.response.status === 404) {
          dispatch({
            type: "SNACK",
            data: {
              snackOpen: true,
              snackMessage: `Zone not found for ZIP: ${zip}`
            }
          });
        }
      });
  };
  return (
    <Map
      style={{ height: height, width: width }}
      center={state.markers[0]}
      zoom={state.zoom}
      minZoom={minzoom}
      maxZoom={maxzoom}
      onClick={addMarker}
      // ref={myMap}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?"
      />
      {state.markers.map((position, idx) => (
        <Marker key={`marker-${idx}`} position={position}>
          <Popup>
            <span>{state.address}</span>
          </Popup>
        </Marker>
      ))}
    </Map>
  );
};

export default MapComponent;
