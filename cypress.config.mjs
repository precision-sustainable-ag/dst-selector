import { defineConfig } from 'cypress';
import dotenv from 'dotenv';
import vitePreprocessor from 'cypress-vite';

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost/',
    experimentalRunAllSpecs: true,
    trashAssetsBeforeRuns: true,
    setupNodeEvents(on, config) {
      on('file:preprocessor', vitePreprocessor());
    },
  },

  video: true,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',

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
      return config;
    },
  },
  defaultCommandTimeout: 30000,
  env: {
    auth0_username: process.env.VITE_AUTH0_USERNAME,
    auth0_password: process.env.VITE_AUTH0_PASSWORD,
    auth0_domain: process.env.VITE_API_AUTH0_DOMAIN,
    test_auth0_env: process.env.VITE_TEST_AUTH0_ENV === 'true',
  },
});
