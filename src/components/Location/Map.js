/*
  The actual map component and tools to draw polygon
  drawPluginOptions sets the variables for the polygon tool
  setZoneState updates the map to the zip code entered by the user
*/

import React, { useEffect, useContext, useState, Fragment } from "react";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  FeatureGroup,
  Circle,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
// import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Context } from "../../store/Store";
import axios from "axios";
import StateAbbreviations from "./StateAbbreviations";
import { EditControl } from "react-leaflet-draw";
import { Button } from "@material-ui/core";

import "../../styles/map.scss";
import { CustomStyles } from "../../shared/constants";

// work around broken icons when using webpack, see https://github.com/PaulLeCam/react-leaflet/issues/255

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const editableLayers = new L.FeatureGroup();
const drawPluginOptions = {
  position: "topright",
  draw: {
    polygon: {
      allowIntersection: false, // Restricts shapes to simple polygons
      drawError: {
        color: "#e1e100", // Color the shape will turn when intersects
        message: "<strong>Oh snap!<strong> you can't draw that!", // Message that will show when intersect
      },
      shapeOptions: {
        color: "#97009c",
      },
    },
    // disable toolbar item by setting it to false
    polyline: false,
    circle: false, // Turns off this drawing tool
    rectangle: false,
    marker: true,
    circlemarker: false,
  },
  edit: {
    featureGroup: editableLayers, //REQUIRED!!
    remove: true,
  },
};
let drawControl = new L.Control.Draw(drawPluginOptions);

const MapComponent = ({ width, height, minzoom, maxzoom }) => {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    console.log("---Map.js---");
    var container = L.DomUtil.get("map");
    if (container != null) {
      container._leaflet_id = null;
    }
    // get default marker

    let center = state.markers[0];
    // console.log(center)
    let map;
    let polygon = null;
    let myMarker = null;
    // Create the map
    if (state.progress === 2) {
      map = L.map("map", { zoomControl: false }).setView(center, maxzoom - 4);
    } else {
      map = L.map("map").setView(center, maxzoom - 4);
    }
    // Initialise the FeatureGroup to store editable layers
    // map.eachLayer((layer) => {
    //   map.removeLayer(layer);
    //   // console.log(layer);
    // });
    // Set up the ESRI layer

    // L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
    //   maxZoom: 20,
    //   subdomains: ["mt0", "mt1", "mt2", "mt3"],
    //   attribution: "Google",
    // }).addTo(map);

    var mapLink = '<a href="http://www.esri.com/">Esri</a>';
    var wholink =
      "i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community";

    L.tileLayer(
      "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "&copy; " + mapLink + ", " + wholink,
        maxZoom: 18,
      }
    ).addTo(map);

    // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //   attribution:
    //     'Data © <a href="http://osm.org/copyright">OpenStreetMap</a>',
    //   maxZoom: 18,
    // }).addTo(map);

    // add a default marker in the given location
    // let marker = L.marker(center).addTo(map);

    L.EditToolbar.Delete.include({
      enable: function () {
        this.options.featureGroup.clearLayers();
      },
    });
    // click

    // .addLayer(editableLayers);
    map.addLayer(editableLayers);

    if (state.markers.length > 1) {
      // window.polygon.remove()
      // L.polygon().remove();
      if (polygon === null) {
        polygon = L.polygon(state.markers, {
          color: CustomStyles().lighterGreen,
        }).addTo(map);
        polygon.bindPopup("Your Field");
      } else {
        map.removeLayer(polygon);
      }
      // zoom the map to the polygon
      map.fitBounds(polygon.getBounds());
    }

    if (state.markers.length === 1) {
      // show marker
      if (myMarker === null) {
        myMarker = L.marker(state.markers[0], {
          title: state.address,
          draggable: true,
          riseOnHover: true,
        })
          .addTo(map)
          .on("dragend ", function (e) {
            console.log(e);
            var coord = String(myMarker.getLatLng()).split(",");
            console.log("Got new coords via Map.js drag event");
            var lat = coord[0].split("(");
            // console.log("Latitude", lat[1]);
            var lng = coord[1].split(")");
            // console.log("Longitude", lng[0]);
            myMarker.bindPopup("Moved to: " + lat[1] + ", " + lng[0] + ".");
            dispatch({
              type: "UPDATE_MARKER",
              data: {
                markers: [[parseFloat(lat[1]), parseFloat(lng[0])]],
              },
            });
            dispatch({
              type: "SNACK",
              data: {
                snackOpen: true,
                snackMessage: "Marker Saved",
              },
            });
          });
      } else {
        map.removeLayer(myMarker);
      }
    }
    // else {
    //   // show polygon with selected area
    // }

    // Initialise the draw control and pass it the FeatureGroup of editable layers

    if (state.progress !== 2) {
      map.addControl(drawControl);
      // var editableLayers = new L.FeatureGroup();
      // map.addLayer(editableLayers);
      map.on("draw:created", function (e) {
        var type = e.layerType,
          layer = e.layer;

        if (type === "marker") {
          layer.bindPopup("A popup!");
        }

        // console.log(layer._latlngs);
        let markers = [];
        if (layer._latlng) {
          // single marker
          queryGEORevAPI(layer._latlng.lat, layer._latlng.lng);
          L.marker([layer._latlng.lat, layer._latlng.lng]).addTo(
            editableLayers
          );
          dispatch({
            type: "UPDATE_MARKER",
            data: {
              markers: [[layer._latlng.lat, layer._latlng.lng]],
            },
          });
          dispatch({
            type: "SNACK",
            data: {
              snackOpen: true,
              snackMessage: "Your point has been saved.",
            },
          });
        } else {
          // editableLayers.remove().addLayer(layer);
          // editableLayers.layer
          editableLayers.addLayer(layer);
          layer._latlngs.map((latlngArr, index) => {
            latlngArr.map((latlng, index) => {
              // console.log(latlng);
              markers.push([latlng.lat, latlng.lng]);
            });
          });
          queryGEORevAPI(markers[0][0], markers[0][1]);
          dispatch({
            type: "UPDATE_MARKER",
            data: {
              markers: markers,
            },
          });
          dispatch({
            type: "SNACK",
            data: {
              snackOpen: true,
              snackMessage: "Your field has been saved.",
            },
          });
        }
        // console.log(polygon.getBounds().getCenter());
      });
    }
  }, [state.markers]);

  const addMarker = (e) => {
    const { markers } = state;

    markers.pop();
    markers.push(e.latlng);

    // console.log(markers);
    dispatch({
      type: "UPDATE_MARKER",
      data: {
        markers: [[markers[0].lat, markers[0].lng]],
      },
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
      .then((response) => {
        let data = response.data;
        let fullAddress = data.display_name;
        console.log("geoorev", data);
        // set county, state (abbr) and zip to global state
        let county = data.address.county;
        let state = data.address.state;
        let zip = data.address.postcode;
        let stateAbbreviation = new StateAbbreviations();
        let abbr = stateAbbreviation.getAbbreviation(state);
        // console.log("Abbreviation: ", abbr);
        // console.log(data.address.postcode);
        // check https://phzmapi.org/[zip].json to map zone with zip probably also restricting the zips?
        setZoneState(data.address.postcode);
        return fullAddress;
      })
      .then((fullAddress) => {
        dispatch({
          type: "CHANGE_ADDRESS",
          data: { address: `${fullAddress}`, addressVerified: true },
        });
      })
      .catch((error) => {
        console.error("nominatim error code", error.response.code);
      });
  };

  const setZoneState = async (zip) => {
    // console.log(zip);
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
      })
      .catch((error) => {
        console.error("phzmapi.org error: ", error);

        // TODO:: Try anyther zip ?
        // recursive zip trials
        // if (error.response.status === 404) {
        //   dispatch({
        //     type: "SNACK",
        //     data: {
        //       snackOpen: true,
        //       snackMessage: `Zone not found for ZIP: ${zip}`
        //     }
        //   });
        // }
      });
  };
  return <div id="map" style={{ height: height, width: width }}></div>;
};

export default MapComponent;