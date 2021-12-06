/*
  Allows drawing a polygon over the map component 
  updateGlobalMarkers handles the snackbar notifying the user their location is saved
  setAddress sets the address in google maps based on lat/long
  onCreated sets up the map
  styled using ../../styles/map.scss
*/

import L from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import React, { useContext, useEffect, useState } from "react";
import {
  FeatureGroup,
  LayersControl,
  Map,
  Marker,
  Polygon,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { Context } from "../../store/Store";
import "../../styles/map.scss";

// work around broken icons when using webpack, see https://github.com/PaulLeCam/react-leaflet/issues/255
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png",
});

const { BaseLayer, Overlay } = LayersControl;

const MapContext = ({ width, height, minzoom, maxzoom, from }) => {
  const [state, dispatch] = useContext(Context);
  const [show, setShow] = useState(true);
  const [mapCenter, setMapCenter] = useState([]);
  const [isPoly, setIsPoly] = useState(false);
  const [showEditControl, setShowEditControl] = useState(true);

  useEffect(() => {
    if (from === "location") {
      setShowEditControl(true);
    } else {
      setShowEditControl(false);
    }
  }, [from]);

  const updateGlobalMarkers = (markersArray, type = "") => {
    // console.log(markersArray);
    if (type === "marker") {
      setIsPoly(false);
    } else {
      setIsPoly(true);
    }
    dispatch({
      type: "UPDATE_MARKER",
      data: {
        markers: markersArray,
      },
    });

    dispatch({
      type: "SNACK",
      data: {
        snackOpen: true,
        snackMessage: "Your location has been saved.",
      },
    });
  };

  useEffect(() => {
    setMapCenter(state.markers[0]);
    if (state.markers.length === 1) {
      // marker
      setIsPoly(false);
    } else {
      // polygon
      setIsPoly(true);
    }
  }, [state.markers]);
  const [editableFG, setEditableFG] = useState(null);
  const onFeatureGroupReady = (reactFGref) => {
    // store the featureGroup ref for future access to content
    setEditableFG(reactFGref);
  };

  const setAddress = (latLng) => {
    // console.log("address");
    let geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      // console.log(results);
      if (status === "OK") {
        let formattedAddressArray = results[0].formatted_address.split(",");
        let formattedAddressLength = formattedAddressArray.length;
        let zipString =
          formattedAddressArray[formattedAddressLength - 2].split(" ");
        let zipArray = zipString.filter((a) => parseInt(a));

        dispatch({
          type: "CHANGE_ADDRESS_VIA_MAP",
          data: {
            address: results[0].formatted_address.split(",")[0],
            fullAddress: results[0].formatted_address,
            zip: parseInt(zipArray[0]),
            addressVerified: true,
          },
        });
      } else {
        console.error("API fetch error", results);
      }
    });
  };
  const onCreated = (e) => {
    const drawnItems = editableFG.leafletElement._layers;

    // if the number of layers is bigger than 1 then delete the first
    // console.log(drawnItems);
    if (Object.keys(drawnItems).length > 1) {
      Object.keys(drawnItems).forEach((layerid, index) => {
        if (index > 0) return;

        const layer = drawnItems[layerid];
        editableFG.leafletElement.removeLayer(layer);
        setShow(false);
      });
      if (e.layerType === "marker") {
        const lat = e.layer._latlng.lat;
        const lng = e.layer._latlng.lng;
        const latLng = { lat: lat, lng: lng };
        // reverse geocode
        // console.log("marker");
        setAddress(latLng);

        updateGlobalMarkers([[lat, lng]], "marker");
      } else if (e.layerType === "polygon") {
        const latlngs = e.layer._latlngs;
        // console.log(e.layer);
        let markers = [];
        const firstLatLng = { lat: latlngs[0][0].lat, lng: latlngs[0][0].lng };
        // reverse geocode
        setAddress(firstLatLng);

        latlngs.map((latlngArr, index) => {
          latlngArr.map((latlng, index) => {
            // console.log(latlng);
            markers.push([latlng.lat, latlng.lng]);
          });
        });
        // console.log(markers);
        updateGlobalMarkers(markers, "poly");
      } else {
      }
    }

    // // setNewDraw(!newDraw);
  };

  return mapCenter.length > 0 ? (
    <div className="row">
      <div className="col-12">
        <Map
          minZoom={minzoom}
          zoom={15}
          maxZoom={maxzoom}
          center={isPoly ? getPolyCenter(state.markers) : mapCenter}
          style={{ width: width, height: height }}
        >
          <TileLayer
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
            attribution={`Map data &copy; <a target="attr" href="http://googlemaps.com">Google</a>`}
            url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
          />
          <FeatureGroup
            ref={(featureGroupRef) => {
              onFeatureGroupReady(featureGroupRef);
            }}
          >
            {showEditControl ? (
              <EditControl
                edit={{ edit: false }}
                position="topleft"
                onEdited={(e) => {
                  //   console.log("edited", e);
                }}
                onCreated={onCreated}
                onDeleted={(e) => {
                  console.log("deleted", e);
                }}
                draw={{
                  rectangle: false,
                  circle: false,
                  circlemarker: false,
                  line: false,
                  polygon: {
                    allowIntersection: false,
                    showArea: true,
                    metric: false,
                  },
                  polyline: false,
                  allowIntersection: false,
                }}
              />
            ) : (
              ""
            )}
            {show ? (
              isPoly ? (
                <Polygon positions={state.markers}>
                  <Tooltip>Your Field</Tooltip>
                </Polygon>
              ) : (
                <Marker position={state.markers[0]}>
                  <Tooltip>Your Field</Tooltip>
                </Marker>
              )
            ) : (
              ""
            )}
          </FeatureGroup>
          {/* <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          /> */}
        </Map>
      </div>
    </div>
  ) : (
    ""
  );
};

export default MapContext;

// Compute and return center of a polygon
// accepts [[number][number]...[number]]
// returns [number, number]
const getPolyCenter = (arr) => {
  var x = arr.map((x) => x[0]);
  var y = arr.map((x) => x[1]);
  var cx = (Math.min(...x) + Math.max(...x)) / 2;
  var cy = (Math.min(...y) + Math.max(...y)) / 2;
  return [cx, cy];
};
