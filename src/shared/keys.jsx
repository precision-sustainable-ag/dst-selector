const getEnv = (key) => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] || '';
  }
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || '';
  }
  return '';
};

export const auth0Domain = getEnv('VITE_API_AUTH0_DOMAIN');
export const auth0ClientId = getEnv('VITE_API_AUTH0_CLIENT_ID');
export const auth0Audience = getEnv('VITE_API_AUTH0_AUDIENCE');
export const userHistoryApiUrl = getEnv('VITE_API_USER_HISTORY_API_URL');
export const userHistorySchema = getEnv('VITE_API_USER_HISTORY_SCHEMA');
export const releaseNotesURL = getEnv('VITE_API_RELEASE_NOTES');
export const mapboxToken = getEnv('VITE_API_MAPBOX_TOKEN');
