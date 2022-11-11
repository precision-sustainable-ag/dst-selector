async function geocodeReverse({ apiKey, setterFunc, latitude, longitude }) {
  await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude}%2C%20${latitude}.json?access_token=${apiKey}`,
  )
    .then((response) => response.json())
    .then((data) => {
      data.features && data.features.length > 0
        ? setterFunc((prevVal) => {
            let fullAddress = data.features[0].place_name;
            let splitted = fullAddress.split(', ');
            let streetNum = splitted[0];
            let state_zip = splitted[splitted.length - 2].split(' ');
            let zipCode = state_zip[state_zip.length - 1];
            return { ...prevVal, address: streetNum, zipCode: zipCode, fullAddress: fullAddress };
          })
        : null;
    })
    .catch((err) => console.error(err));
}

export { geocodeReverse };
