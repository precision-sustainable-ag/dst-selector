import { set } from 'lodash';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  MapProvider,
  Map,
  useMap,
  Marker,
  Popup,
  FullscreenControl,
  NavigationControl,
} from 'react-map-gl';

import GeolocateControl from './geolocate-control';
import GeocoderControl from './geocoder-control';
import DrawControl from './draw-control';
import MarkerControl from './marker-control';
import { getAddressFromLoc } from './geocoder-search';
import './styles.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapCanvas({
  initViewport = { width, height, longitude, latitude, minZoom, maxZoom, startZoom },
  apiKey,
}) {
  const [viewport, setViewport] = useState({ ...initViewport });
  const [address, setAddress] = useState({});
  const [mouseLoc, setMouseLoc] = useState({});
  const mapRef = useRef();

  const onLoad = () => {};

  //   useEffect(() => {
  //     console.log('address changed: ');
  //     console.log(address);
  //   }, [address]);

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
          onLoad={onLoad}
          onMoveEnd={(vp) => {
            setViewport((viewport) => ({ ...viewport, ...vp.viewState }));
          }}
          onMouseMove={(e) => {
            setMouseLoc({ longitude: e.lngLat.lng, latitude: e.lngLat.lat });
          }}
        >
          <MarkerControl setViewport={setViewport} mapRef={mapRef} viewport={viewport} />
          <GeocoderControl
            mapboxAccessToken={apiKey}
            mapRef={mapRef}
            onResults={() => setViewport({ ...viewport })}
            setLocation={setViewport}
            setAddress={setAddress}
          />
          <DrawControl
            position="top-left"
            displayControlsDefault={false}
            controls={{
              polygon: true,
              trash: true,
            }}
          />
          <FullscreenControl />
          <GeolocateControl />
          <NavigationControl />
          {mouseLoc.longitude && (
            <div className="infobar">
              Longitude: {mouseLoc.longitude.toFixed(4)} | Latitude: {mouseLoc.latitude.toFixed(4)}
            </div>
          )}
        </Map>
      </div>
    </MapProvider>
  );
}
