const webpack = require('webpack');

function getClientEnvironment() {
  const envVars = {};
  for (const key in process.env) {
    envVars[key] = process.env[key];
  }

  return {
    'process.env': JSON.stringify(envVars),
  };
}

module.exports = (config) => {
  config.mode = process.env.NODE_ENV || config.mode;
  config.plugins.push(new webpack.DefinePlugin(getClientEnvironment()));
  return config;
};
