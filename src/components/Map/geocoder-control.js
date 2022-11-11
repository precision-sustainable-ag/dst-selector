import React, { useState } from 'react';
import { useControl, Marker, MarkerProps, ControlPosition } from 'react-map-gl';
import MapboxGeocoder, { GeocoderOptions } from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const GeocoderControl = ({ mapboxAccessToken, setViewport }) => {
  const geocoder = useControl(() => {
    const ctrl = new MapboxGeocoder({
      placeholder: 'Search Your Address ...',
      marker: false,
      accessToken: mapboxAccessToken,
      flyTo: {
        bearing: 0,
        speed: 5, // Make the flying slow/fast.
        curve: 5, // Change the speed at which it zooms out.
        easing: function (t) {
          return t ** 2;
        },
      },
      countries: 'us',
    });
    ctrl.on('result', (e) => {
      if (e && e.result) {
        let fullAddress = e.result.place_name;
        let splitted = fullAddress.split(', ');
        let streetNum = splitted[0];
        let state_zip = splitted[splitted.length - 2].split(' ');
        let zipCode = state_zip[state_zip.length - 1];
        fullAddress &&
          setViewport((vp) => ({
            ...vp,
            address: streetNum,
            zipCode: zipCode,
            fullAddress: fullAddress,
          }));
      }
    });
    return ctrl;
  });

  return null;
};

export default GeocoderControl;
