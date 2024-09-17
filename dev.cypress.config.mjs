import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    excludeSpecPattern: '**/examples/*',
    screenshotOnRunFailure: false,
    //  supportFile: false,
  },
  viewportWidth: 1920,
  viewportHeight: 1080,

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
    screenshotOnRunFailure: false,
    env: {
      REACT_APP_GOOGLE_API_KEY: process.env.REACT_APP_GOOGLE_API_KEY,
      REACT_APP_OPEN_WEATHER_API_KEY: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
      REACT_APP_MAPBOX_API_KEY: process.env.REACT_APP_MAPBOX_API_KEY,
      REACT_APP_AUTH0_DOMAIN: process.env.REACT_APP_AUTH0_DOMAIN,
      REACT_APP_AUTH0_CLIENT_ID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      REACT_APP_AUTH0_AUDIENCE: process.env.REACT_APP_AUTH0_AUDIENCE,
      REACT_APP_USER_HISTORY_API_URL: process.env.REACT_APP_USER_HISTORY_API_URL,
      REACT_APP_USER_HISTORY_SCHEMA: process.env.REACT_APP_USER_HISTORY_SCHEMA,
    },
  },
});
