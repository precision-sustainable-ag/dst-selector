import React, { useEffect, useState } from 'react';
import { useControl } from 'react-map-gl';
import { GeolocateControl } from 'mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const GeocoderControl = (props) => {
  const [map, setMap] = useState(null);
  const geoLocate = useControl(
    () => {
      const ctrl = new GeolocateControl();
      return ctrl;
    },
    ({ map }) => {
      map.on('geolocate', (e) => {
        console.log('####', e);
        map.flyTo({
          center: [e.coords.longitude, e.coords.latitude],
          zoom: 16, //set zoom
        });
      });
    },
  );

  return null;
};

export default GeocoderControl;
