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
  },
});
