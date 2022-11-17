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
import centroid from '@turf/centroid';
import DrawControl from './draw-control';
import GeocoderControl from './geocoder-control';
import MarkerControl from './marker-control';
import geocodeReverse from './geocoder-search';

const acreDiv = 4046.8564224;

const MapCanvas = ({
  initViewport,
  apiKey,
  setAddress = () => {},
  setGeometry = () => {},
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
  // eslint-disable-next-line no-unused-vars
  const [viewport, setViewport] = useState({ ...initViewport });
  const [marker, setMarker] = useState({ ...initViewport });
  const [mouseLoc, setMouseLoc] = useState({});
  const [polygonArea, setPolygonArea] = useState(0);
  const [isDrawActive, setIsDrawActive] = useState(false);
  const [geocodeResult, setGeocodeResult] = useState(undefined);
  const mapRef = useRef();
  const drawerRef = useRef();

  // delete all shapes after geocode search
  useEffect(() => {
    if (drawerRef.current) drawerRef.current.deleteAll();
  }, [geocodeResult]);

  // upon marker move, find the address of this new location and set the state
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
    // clear all shapes after geolocating to user's location
    if (drawerRef.current) drawerRef.current.deleteAll();
  };

  const handlePolyCentCalc = (geom) => {
    if (geom) {
      if (geom.features.length > 0) {
        const coords = centroid(geom.features[0]).geometry.coordinates;
        setMarker(
          (prev) => ({
            ...prev,
            longitude: coords[0],
            latitude: coords[1],
          }),
        );
        setViewport(
          (prev) => ({
            ...prev,
            longitude: coords[0],
            latitude: coords[1],
          }),
        );
      }
    }
  };

  const handlePolyAreaCalc = (e) => {
    if (e.features.length > 0) {
      const a = area(e.features[0]) / acreDiv;
      setPolygonArea(a);
      setGeometry(e.features);
      handlePolyCentCalc(e);
    } else {
      setPolygonArea(0);
    }
  };

  const handleDrawCreate = () => {};
  const handleDrawDelete = () => {
    setIsDrawActive(false);
  };
  const handleDrawUpdate = (e) => {
    handlePolyAreaCalc(e);
  };
  const handleDrawSelection = (e) => {
    handlePolyAreaCalc(e);
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
              mapboxAccessToken={apiKey}
              setViewport={setViewport}
              setMarker={setMarker}
              setGeocodeResult={setGeocodeResult}
            />
          )}
          {features.hasDrawing && (
            <DrawControl
              position="top-left"
              drawerRef={drawerRef}
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
              {polygonArea > 0 && `Area ${polygonArea.toFixed(2)} acres | `}
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
