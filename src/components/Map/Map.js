/*
  Exports a MAP component based on mapbox
  Styles are created using sass - stored in ../../styles/map.scss
*/

import '../../styles/map.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

import {
  FullscreenControl,
  Map,
  MapProvider,
  NavigationControl,
  GeolocateControl,
} from 'react-map-gl';
import React, { useEffect, useRef, useState } from 'react';
import area from '@turf/area';
import DrawControl from './draw-control';
import GeocoderControl from './geocoder-control';
import MarkerControl from './marker-control';
import geocodeReverse from './geocoder-search';

const MapCanvas = ({
  initViewport,
  apiKey,
  setAddress = () => {},
  features = {
    hasSearchBar: true,
    hasMarker: true,
    hasNavigation: true,
    hasCoordBar: true,
    hasDrawing: true,
    hasGeolocate: true,
    hasFullScreen: true,
    hasMarkerPopup: true,
    hasMarkerMovable: true,
  },
  userInteractions = {
    scrollZoom: true,
    dragRotate: true,
    dragPan: true,
    keyboard: true,
    doubleClickZoom: true,
    touchZoomRotate: true,
  },
}) => {
  const [viewport, setViewport] = useState({ ...initViewport });
  const [marker, setMarker] = useState({ ...initViewport });
  const [mouseLoc, setMouseLoc] = useState({});
  const [polygonArea, setPolygonArea] = useState(0);
  const [isDrawActive, setIsDrawActive] = useState(false);
  const mapRef = useRef();

  useEffect(() => {
    geocodeReverse({
      apiKey,
      setterFunc: setAddress,
      longitude: marker.longitude,
      latitude: marker.latitude,
    });
    setAddress((addr) => ({
      ...addr,
      longitude: marker.longitude,
      latitude: marker.latitude,
    }));
  }, [marker.longitude, marker.latitude]);

  const onLoad = () => {
    const mapHandle = mapRef.current.on('load', () => {});
    if (!userInteractions.scrollZoom) mapHandle.scrollZoom.disable();
    if (!userInteractions.dragRotate) mapHandle.dragRotate.disable();
    if (!userInteractions.dragPan) mapHandle.dragPan.disable();
    if (!userInteractions.keyboard) mapHandle.keyboard.disable();
    if (!userInteractions.doubleClickZoom) mapHandle.doubleClickZoom.disable();
    if (!userInteractions.touchZoomRotate) mapHandle.touchZoomRotate.disable();
  };

  const handleGeolocate = (e) => {
    // wait 2 seconds while flying to user's
    // location before setting the location
    setTimeout(() => {
      setMarker(
        (prev) => ({
          ...prev,
          longitude: e.coords.longitude,
          latitude: e.coords.latitude,
        }),
      );
    }, 2000);
  };

  const handleDrawCreate = () => {
    setIsDrawActive(true);
  };

  const handleDrawDelete = () => {
    setIsDrawActive(false);
  };

  const handleDrawUpdate = (e) => {
    if (e.features.length > 0) {
      const a = area(e.features[0]) / 4046.8564224;
      setPolygonArea(a);
    } else {
      setPolygonArea(0);
    }
  };

  const handleDrawSelection = (e) => {
    if (e.features.length > 0) {
      const a = area(e.features[0]) / 4046.8564224;
      setPolygonArea(a);
    } else {
      setPolygonArea(0);
    }
  };

  return (
    <MapProvider>
      <div
        className="map-container"
        style={{ width: initViewport.width, height: initViewport.height }}
      >
        <Map
          id="mainMap"
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
            setViewport((prev) => ({ ...prev, ...vp.viewState }));
          }}
          onMouseMove={(e) => {
            setMouseLoc({ longitude: e.lngLat.lng, latitude: e.lngLat.lat });
          }}
        >
          {features.hasMarker && !isDrawActive && (
            <MarkerControl
              mapRef={mapRef}
              setMarker={setMarker}
              marker={marker}
              hasMarkerPopup={features.hasMarkerPopup}
              hasMarkerMovable={features.hasMarkerMovable}
            />
          )}
          {features.hasSearchBar && (
            <GeocoderControl
              mapRef={mapRef}
              mapboxAccessToken={apiKey}
              viewport={viewport}
              setViewport={setViewport}
            />
          )}
          {features.hasDrawing && (
            <DrawControl
              position="top-left"
              onCreate={handleDrawCreate}
              onUpdate={handleDrawUpdate}
              onDelete={handleDrawDelete}
              onSelection={handleDrawSelection}
              controlFlags={{
                polygon: true,
                trash: true,
              }}
            />
          )}
          {features.hasGeolocate && <GeolocateControl onGeolocate={handleGeolocate} />}
          {features.hasFullScreen && <FullscreenControl />}
          {features.hasNavigation && <NavigationControl />}
          {features.hasCoordBar && mouseLoc.longitude && (
            <div className="infobar">
              {polygonArea > 0 && `Area ${polygonArea.toFixed(3)} acres | `}
              Longitude:
              {mouseLoc.longitude.toFixed(4)}
              | Latitude:
              {mouseLoc.latitude.toFixed(4)}
            </div>
          )}
        </Map>
      </div>
    </MapProvider>
  );
};

export default MapCanvas;
