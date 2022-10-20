/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/*
  Allows drawing a polygon over the map component
  updateGlobalMarkers handles the snackbar notifying the user their location is saved
  setAddress sets the address in google maps based on lat/long
  onCreated sets up the map
  styled using ../../styles/map.scss
*/

import L from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';
import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useRef,
} from 'react';
import {
  FeatureGroup, MapContainer, Marker, Polygon, TileLayer, Tooltip, useMap,
} from 'react-leaflet';
import { DraftControl } from 'react-leaflet-draft';
import { Context } from '../../../store/Store';
import '../../../styles/map.scss';

// work around broken icons when using webpack, see https://github.com/PaulLeCam/react-leaflet/issues/255
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

const MapContext = ({
  width, height, minzoom, maxzoom, from,
}) => {
  const { state, dispatch } = useContext(Context);
  const markerRef = useRef(null);
  const [position, setPosition] = useState(state.markers[0]);
  const [show, setShow] = useState(true);
  const [isPoly, setIsPoly] = useState(false);
  const [showEditControl, setShowEditControl] = useState(true);

  useEffect(() => {
    if (from === 'location') {
      setShowEditControl(true);
    } else {
      setShowEditControl(false);
    }
  }, [from]);

  const updateGlobalMarkers = (markersArray, type = '') => {
    if (type === 'marker') {
      setIsPoly(false);
    } else {
      setIsPoly(true);
    }
    dispatch({
      type: 'UPDATE_MARKER',
      data: {
        markers: markersArray,
      },
    });

    dispatch({
      type: 'SNACK',
      data: {
        snackOpen: true,
        snackMessage: 'Your location has been saved.',
      },
    });
  };

  useEffect(() => {
    setPosition(state.markers[0]);
    if (state.markers.length === 1) {
      // marker
      setIsPoly(false);
    } else {
      // polygon
      setIsPoly(true);
    }
  }, [state.markers]);

  const getPolyCenter = (arr) => {
    const x = arr.map((xa) => xa[0]);
    const y = arr.map((ya) => ya[1]);
    const cx = (Math.min(...x) + Math.max(...x)) / 2;
    const cy = (Math.min(...y) + Math.max(...y)) / 2;
    return [cx, cy];
  };

  const ChangeMapView = ({ coords }) => {
    const map = useMap();
    map.setView(coords, map.getZoom());
    return null;
  };

  const setAddress = (latLng) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK') {
        let zipCode = 0;

        results.forEach((r) => {
          const z = r.address_components.filter((e) => e.types[0] === 'postal_code');
          if (z.length) {
            zipCode = +z[0].long_name;
          }
        });
        dispatch({
          type: 'CHANGE_ADDRESS_VIA_MAP',
          data: {
            address: results[0].formatted_address.split(',')[0],
            fullAddress: results[0].formatted_address,
            zip: zipCode,
            addressVerified: true,
          },
        });
      } else {
        // eslint-disable-next-line no-console
        console.error('API fetch error', results);
      }
    });
  };

  const onChanged = (e) => {
    if (e.layerType === 'marker') {
      setShow(true);
      const { lat, lng } = e.layer._latlng;
      const latLng = { lat, lng };
      // reverse geocode
      setAddress(latLng);

      updateGlobalMarkers([[lat, lng]], 'marker');
    } else if (e.layerType === 'polygon') {
      setShow(false);
      const latlngs = e.layer._latlngs;
      const markers = [];
      const firstLatLng = { lat: latlngs[0][0].lat, lng: latlngs[0][0].lng };
      // reverse geocode
      setAddress(firstLatLng);

      latlngs.forEach((latlngArr) => {
        latlngArr.forEach((latlng) => {
          markers.push([latlng.lat, latlng.lng]);
        });
      });
      updateGlobalMarkers(markers, 'poly');
    }
  };

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;

        if (marker != null) {
          setShow(true);
          const { lat, lng } = marker.getLatLng();
          const latLng = { lat, lng };
          setAddress(latLng);
          updateGlobalMarkers([[lat, lng]], 'marker');
          setPosition([lat, lng]);
        }
      },
    }),
    [],
  );

  return (
    position.length > 0 && (
      <div className="row">
        <div className="col-12">
          <MapContainer
            minZoom={minzoom}
            zoom={15}
            maxZoom={maxzoom}
            center={isPoly ? getPolyCenter(state.markers) : position}
            style={{ width, height }}
          >
            <TileLayer
              subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
              attribution={'Map data &copy; <a target="attr" href="http://googlemaps.com">Google</a>'}
              url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
            />
            <FeatureGroup>
              {showEditControl && (
                <DraftControl
                  edit={{ edit: false }}
                  position="topleft"
                  // onEdited={(e) => {}}
                  onCreated={(e) => onChanged(e)}
                  onEdited={(e) => onChanged(e)}
                  // onDeleted={(e) => {}}
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
                    // marker: true,
                  }}
                />
              )}
              {show && (
                isPoly ? (
                  <Polygon positions={state.markers}>
                    <Tooltip>Your Field</Tooltip>
                  </Polygon>
                ) : (
                  <Marker position={position} draggable eventHandlers={eventHandlers} ref={markerRef}>
                    <Tooltip>Your Field</Tooltip>
                  </Marker>
                )
              )}
              <ChangeMapView coords={position} />
            </FeatureGroup>
            {/* <TileLayer
              attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            /> */}
          </MapContainer>
        </div>
      </div>
    )
  );
};

export default MapContext;
