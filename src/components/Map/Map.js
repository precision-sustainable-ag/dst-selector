import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MapProvider, Map, FullscreenControl, NavigationControl } from 'react-map-gl';

import GeolocateControl from './geolocate-control';
import GeocoderControl from './geocoder-control';
import DrawControl from './draw-control';
import MarkerControl from './marker-control';
import { geocodeReverse } from './geocoder-search';
import './styles.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapCanvas({
  initViewport = { width, height, longitude, latitude, minZoom, maxZoom, startZoom },
  apiKey,
  address,
  setAddress = () => {},
  hasSearchBar = true,
  hasMarker = true,
  hasNavigation = true,
  hasCoordBar = true,
  hasDrawing = true,
  hasGeolocate = true,
  hasFullScreen = true,
  doubleClickZoom = false,
}) {
  const [viewport, setViewport] = useState({ ...initViewport });
  const [mouseLoc, setMouseLoc] = useState({});
  const [isDrawActive, setIsDrawActive] = useState(false);
  const mapRef = useRef();

  const onLoad = () => {};

  useEffect(() => {
    geocodeReverse({
      apiKey,
      setterFunc: setAddress,
      longitude: viewport.longitude,
      latitude: viewport.latitude,
    });
    setAddress((addr) => ({
      ...addr,
      longitude: viewport.longitude,
      latitude: viewport.latitude,
    }));
  }, [viewport.longitude, viewport.latitude]);

  return (
    <MapProvider>
      <div
        className="map-container"
        style={{ width: initViewport.width, height: initViewport.height }}
      >
        <Map
          id={'mainMap'}
          initialViewState={{
            latitude: initViewport.latitude,
            longitude: initViewport.longitude,
            zoom: initViewport.startZoom,
          }}
          minZoom={initViewport.minZoom}
          maxZoom={initViewport.maxZoom}
          ref={mapRef}
          mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
          //   mapStyle="mapbox://styles/mapbox/streets-v9"
          //   mapStyle="mapbox://styles/mapbox/satellite-v9"
          mapboxAccessToken={apiKey}
          doubleClickZoom={doubleClickZoom}
          onLoad={onLoad}
          onMoveEnd={(vp) => {
            setViewport((viewport) => ({ ...viewport, ...vp.viewState }));
          }}
          onMouseMove={(e) => {
            setMouseLoc({ longitude: e.lngLat.lng, latitude: e.lngLat.lat });
          }}
        >
          {hasMarker && !isDrawActive && (
            <MarkerControl mapRef={mapRef} setViewport={setViewport} viewport={viewport} />
          )}
          {hasSearchBar && (
            <GeocoderControl
              mapRef={mapRef}
              mapboxAccessToken={apiKey}
              viewport={viewport}
              setViewport={setViewport}
            />
          )}
          {hasDrawing && (
            <DrawControl
              position="top-left"
              onCreate={() => setIsDrawActive(true)}
              // onUpdate={() => setIsDrawActive(true)}
              onDelete={() => setIsDrawActive(false)}
              displayControlsDefault={false}
              controls={{
                polygon: true,
                trash: true,
              }}
            />
          )}
          {hasFullScreen && <FullscreenControl />}
          {hasGeolocate && <GeolocateControl />}
          {hasNavigation && <NavigationControl />}
          {hasCoordBar && mouseLoc.longitude && (
            <div className="infobar">
              Longitude: {mouseLoc.longitude.toFixed(4)} | Latitude: {mouseLoc.latitude.toFixed(4)}
            </div>
          )}
        </Map>
      </div>
    </MapProvider>
  );
}
