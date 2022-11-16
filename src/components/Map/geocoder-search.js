/*
  Handles reverse geocoding from lat lon to asci address
*/

async function geocodeReverse({
  apiKey,
  setterFunc,
  latitude,
  longitude,
}) {
  await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude}%2C%20${latitude}.json?access_token=${apiKey}`,
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.features && data.features.length > 0) {
        setterFunc((prevVal) => {
          const fullAddress = data.features[0].place_name;
          const splitted = fullAddress.split(', ');
          const streetNum = splitted[0];
          const stateZip = splitted[splitted.length - 2].split(' ');
          const zipCode = stateZip[stateZip.length - 1];
          return {
            ...prevVal, address: streetNum, zipCode, fullAddress,
          };
        });
      }
    });
}

export default geocodeReverse;
