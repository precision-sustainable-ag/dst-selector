import React, { useState } from 'react';
import { useControl, Marker, MarkerProps, ControlPosition } from 'react-map-gl';
import MapboxGeocoder, { GeocoderOptions } from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const GeocoderControl = ({ mapboxAccessToken, setAddress, position }) => {

  const geocoder = useControl(
    () => {
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
        countries: 'us , ca',
      });
      ctrl.on('result', (e) => {
        if (e && e.result) {
          let res = e.result;
          // res.center &&
          //   setLocation((loc) => ({ ...loc, longitude: res.center[0], latitude: res.center[1] }));
          res.address &&
            setAddress((addr) => ({
              ...addr,
              zipCode: res.address,
              shortAddress: res.text,
              fullAddress: res.place_name,
            }));
        }
      });
      return ctrl;
    },
    {
      position: position,
    },
  );

  return null;
};

export default GeocoderControl;
