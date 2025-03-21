import { defineConfig } from 'cypress';
// import coverageTask from '@cypress/code-coverage/task.js';
import dotenv from 'dotenv';
import vitePreprocessor from 'cypress-vite';

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    experimentalRunAllSpecs: true,
    trashAssetsBeforeRuns: true,
    setupNodeEvents(on, config) {
      on('file:preprocessor', vitePreprocessor());
      on('before:browser:launch', (browser, launchOptions) => {
        if (['chrome', 'edge'].includes(browser.name)) {
          launchOptions.args.push('--js-flags=--max-old-space-size=4096');
        }
        return launchOptions;
      });
      // coverageTask(on, config);
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
    screenshotOnRunFailure: false,
  },

  env: {
    auth0_username: process.env.VITE_AUTH0_USERNAME,
    auth0_password: process.env.VITE_AUTH0_PASSWORD,
    auth0_domain: process.env.VITE_API_AUTH0_DOMAIN,
  },
});
