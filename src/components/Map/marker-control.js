import { set } from 'lodash';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Marker, Popup, useMap } from 'react-map-gl';

import './styles.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapCanvas({ viewport, setViewport, mapRef }) {
  const [popupOpen, setPopupOpen] = useState(true);
  const [marker, setMarker] = useState({
    latitude: viewport.latitude,
    longitude: viewport.longitude,
  });
  const [events, logEvents] = useState({});
  const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  useEffect(() => {
    setTimeout(() => setPopupOpen(false), 2000);
  }, []);

  useEffect(() => {
    setMarker({
      longitude: viewport.longitude,
      latitude: viewport.latitude,
    });
  }, [viewport.latitude, viewport.longitude]);

  const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));
    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    });
  }, []);

  const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
    setViewport((viewport) => ({
      ...viewport,
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
        draggable
        onDragStart={onMarkerDragStart}
        onDrag={onMarkerDrag}
        onDragEnd={onMarkerDragEnd}
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          setPopupOpen(!popupOpen);
        }}
      >
        <img src=" https://img.icons8.com/color/48/000000/marker.png" width="30px" />
      </Marker>
      {popupOpen && (
        <Popup
          key={'popup-1'}
          latitude={marker.latitude}
          longitude={marker.longitude}
          onClose={() => setPopupOpen(false)}
          closeButton={true}
          offset={[0, -20]}
        >
          <span>{'click and drag'}</span>
          <br/>
          <span>{`${viewport.longitude.toFixed(4)}  ${viewport.latitude.toFixed(4)}`}</span>
        </Popup>
      )}
    </>
  );
}
