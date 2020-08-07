import React, { useState, useEffect, useContext } from "react";
import {
  Circle,
  FeatureGroup,
  LayerGroup,
  LayersControl,
  Map,
  Marker,
  Popup,
  Rectangle,
  Polygon,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

import { Context } from "../../store/Store";
import { CustomStyles } from "../../shared/constants";
const { BaseLayer, Overlay } = LayersControl;

const MapContext = ({ width, height, minzoom, maxzoom, from }) => {
  const [state, dispatch] = useContext(Context);
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

  const clearMarkers = () => {
    // default the markers
  };
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

  return mapCenter.length > 0 ? (
    <div className="row">
      <div className="col-12">
        <Map
          minZoom={minzoom}
          zoom={13}
          maxZoom={maxzoom}
          center={mapCenter}
          style={{ width: width, height: height }}
        >
          <FeatureGroup>
            {showEditControl ? (
              <EditControl
                position="topright"
                onEdited={(e) => {
                  //   console.log("edited", e);
                }}
                onCreated={(e) => {
                  if (e.layerType === "marker") {
                    const lat = e.layer._latlng.lat;
                    const lng = e.layer._latlng.lng;
                    // console.log([lat, lng]);
                    updateGlobalMarkers([[lat, lng]], "marker");
                  } else if (e.layerType === "polygon") {
                    const latlngs = e.layer._latlngs;
                    let markers = [];
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
                }}
                onDeleted={(e) => {
                  console.log("deleted", e);
                }}
                draw={{
                  rectangle: false,
                  circle: false,
                  circlemarker: false,
                  line: false,
                  polygon: true,
                  polyline: false,
                }}
              />
            ) : (
              ""
            )}

            {isPoly ? (
              <Polygon positions={state.markers}>
                <Tooltip>your field</Tooltip>
              </Polygon>
            ) : (
              <Marker position={state.markers[0]}>
                <Tooltip>your field</Tooltip>
              </Marker>
            )}
          </FeatureGroup>
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </Map>
      </div>
    </div>
  ) : (
    ""
  );
};

export default MapContext;
