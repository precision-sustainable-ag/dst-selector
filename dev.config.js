const { defineConfig } = require('cypress');

module.exports = defineConfig({
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
      REACT_APP_MAPBOX_API_KEY: 'pk.eyJ1IjoibWlrYWhwaW5lZ2FyIiwiYSI6ImNseHZ2NndjZDJrejMycXB4dWtlamo2eWYifQ.29yeP8CgZpO98jyzxYxU4Q',
    },
  },
});
