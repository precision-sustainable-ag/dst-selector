const {
  REACT_APP_AIRTABLE_BEARER_KEY,
  REACT_APP_GITHUB_ORG,
  REACT_APP_GITHUB_REPO,
  REACT_APP_GITHUB_PAT,
  REACT_APP_GOOGLE_API_KEY,
  REACT_APP_OPEN_WEATHER_API_KEY,
  REACT_APP_GEOCODE_AUTH,
} = process.env;

export const AirtableBearerKey = REACT_APP_AIRTABLE_BEARER_KEY;
export const owner = REACT_APP_GITHUB_ORG;
export const repo = REACT_APP_GITHUB_REPO;
export const accessToken = REACT_APP_GITHUB_PAT;
export const googleApiKey = REACT_APP_GOOGLE_API_KEY;
export const openWeatherApiKey = REACT_APP_OPEN_WEATHER_API_KEY;
export const geocodeAuth = REACT_APP_GEOCODE_AUTH;
