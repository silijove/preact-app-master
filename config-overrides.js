/* eslint-disable no-param-reassign */
const rewireSass = require('react-app-rewire-sass');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const target = process.env.npm_lifecycle_event;

/* config-overrides.js */
module.exports = function override(config, env) {
  delete config.eslint.configFile;
  config.eslint.useEslintrc = true;

  config = rewireSass(config, env);

  config.resolve = {
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
    },
  };

  config.entry = config.entry.map(e => {
    if (e.indexOf('polyfills') !== -1) {
      return require.resolve('./src/polyfills.js');
    }
    return e;
  });

  if (target === 'bundle') {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};
