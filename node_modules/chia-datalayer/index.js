const { defaultConfig } = require("./utils/api-utils");

let config = defaultConfig;

function configure(newConfig) {
  config = { ...config, ...newConfig };
}

module.exports = {
  defaultConfig: config,
  configure,
  rpc: require("./rpcs/datalayer"),
};


