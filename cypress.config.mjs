import { defineConfig } from 'cypress';
// import coverageTask from '@cypress/code-coverage/task.js';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost/',
    experimentalRunAllSpecs: true,
    trashAssetsBeforeRuns: true,
    setupNodeEvents(on, config) {
      // coverageTask(on, config);
      // return config;
    },
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}', // Specify the path to your component tests
    numTestsKeptInMemory: 1,
    experimentalMemoryManagement: true,
    setupNodeEvents(on, config) {
      // coverageTask(on, config);
      // return config;
    },
  },
  defaultCommandTimeout: 30000,
  env: {
    VITE_API_MAPBOX_API_KEY: process.env.VITE_API_MAPBOX_API_KEY,
    VITE_API_AUTH0_DOMAIN: process.env.VITE_API_AUTH0_DOMAIN,
    VITE_API_AUTH0_CLIENT_ID: process.env.VITE_API_AUTH0_CLIENT_ID,
    VITE_API_AUTH0_AUDIENCE: process.env.VITE_API_AUTH0_AUDIENCE,
    VITE_API_USER_HISTORY_API_URL: process.env.VITE_API_USER_HISTORY_API_URL,
    VITE_API_USER_HISTORY_SCHEMA: process.env.VITE_API_USER_HISTORY_SCHEMA,
  },
});
