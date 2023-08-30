const {
  REACT_APP_GOOGLE_API_KEY,
  REACT_APP_OPEN_WEATHER_API_KEY,
  REACT_APP_MAPBOX_API_KEY,
  REACT_APP_AUTH0_DOMAIN,
  REACT_APP_AUTH0_CLIENT_ID,
  REACT_APP_AUTH0_AUDIENCE,
} = process.env;

export const googleApiKey = REACT_APP_GOOGLE_API_KEY;
export const openWeatherApiKey = REACT_APP_OPEN_WEATHER_API_KEY;
export const MapboxApiKey = REACT_APP_MAPBOX_API_KEY;
export const auth0Domain = REACT_APP_AUTH0_DOMAIN;
export const auth0ClientId = REACT_APP_AUTH0_CLIENT_ID;
export const auth0Audience = REACT_APP_AUTH0_AUDIENCE;
