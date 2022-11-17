/*
  Provdides forward geocoder search bar on the map component
    to convert text address to lat lon coordinates
  Styles are created using sass - stored in ../../styles/map.scss
*/

import '../../styles/map.scss';
import { useControl } from 'react-map-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const GeocoderControl = ({
  mapboxAccessToken,
  setViewport,
  setMarker,
  setGeocodeResult,
}) => {
  useControl(() => {
    const ctrl = new MapboxGeocoder({
      placeholder: 'Search Your Address ...',
      marker: false,
      accessToken: mapboxAccessToken,
      flyTo: {
        bearing: 0,
        speed: 5, // Make the flying slow/fast.
        curve: 5, // Change the speed at which it zooms out.
        easing: (t) => t ** 2,
      },
      countries: 'us',
    });
    ctrl.on('result', (e) => {
      if (e && e.result) {
        setGeocodeResult(e.result);
        const fullAddress = e.result.place_name;
        const splitted = fullAddress.split(', ');
        const streetNum = splitted[0];
        const stateZip = splitted[splitted.length - 2].split(' ');
        const zipCode = stateZip[stateZip.length - 1];
        if (fullAddress) {
          setViewport((prev) => ({
            ...prev,
            address: streetNum,
            zipCode,
            fullAddress,
          }));
          setMarker((prev) => ({
            ...prev,
            longitude: e.result.center[0],
            latitude: e.result.center[1],
          }));
        }
      }
    });
    return ctrl;
  });

  return null;
};

export default GeocoderControl;
