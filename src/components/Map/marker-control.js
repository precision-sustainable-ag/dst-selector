/*
  Handles drop marker object on the map component
  Styles are created using sass - stored in ../../styles/map.scss
*/

import React, { useEffect, useState, useCallback } from 'react';
import { Marker, Popup } from 'react-map-gl';
import '../../styles/map.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapMarker = ({
  marker,
  setMarker,
  mapRef,
  hasMarkerPopup,
  hasMarkerMovable,
}) => {
  const [popupOpen, setPopupOpen] = useState(true);

  useEffect(() => {
    if (hasMarkerMovable) {
      mapRef.current.on('dblclick', (e) => {
        setMarker((prev) => ({
          ...prev,
          longitude: e.lngLat.lng,
          latitude: e.lngLat.lat,
        }));
      });
    }
    setTimeout(() => setPopupOpen(false), 2000);
  }, []);

  const onMarkerDragEnd = useCallback((event) => {
    setMarker((prev) => ({
      ...prev,
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    }));
    mapRef.current?.flyTo({ center: [event.lngLat.lng, event.lngLat.lat], duration: 100 });
  }, []);

  return (
    <>
      <Marker
        longitude={marker.longitude}
        latitude={marker.latitude}
        anchor="bottom"
        draggable={hasMarkerMovable}
        onDragEnd={onMarkerDragEnd}
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          setPopupOpen(!popupOpen);
        }}
      >
        <img src=" https://img.icons8.com/color/48/000000/marker.png" width="30px" alt="" />
      </Marker>
      {popupOpen && hasMarkerPopup && (
        <Popup
          key="popup-1"
          latitude={marker.latitude}
          longitude={marker.longitude}
          onClose={() => setPopupOpen(false)}
          closeButton
          offset={[0, -20]}
        >
          <span> click and drag </span>
          <br />
          <span>{`${marker.longitude.toFixed(4)}  ${marker.latitude.toFixed(4)}`}</span>
        </Popup>
      )}
    </>
  );
};

export default MapMarker;
