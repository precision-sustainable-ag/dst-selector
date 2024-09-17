import { defineConfig } from 'cypress';
import coverageTask from '@cypress/code-coverage/task.js';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:80/',
    experimentalRunAllSpecs: true,
    trashAssetsBeforeRuns: true,
    setupNodeEvents(on, config) {
      coverageTask(on, config);
      return config;
    },
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    supportFile: 'cypress/support/component.jsx',
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}', // Specify the path to your component tests
    numTestsKeptInMemory: 1,
    experimentalMemoryManagement: true,
    setupNodeEvents(on, config) {
      coverageTask(on, config);
      return config;
    },
  },

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
});
