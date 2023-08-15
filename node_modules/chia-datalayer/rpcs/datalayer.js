const { callAndAwaitChiaRPC } = require("./rpc-base");
const { defaultConfig } = require("../utils/api-utils");

module.exports = (config = {}) => {
  config = {
    ...defaultConfig,
    ...config,
  };

  return {
    addMirror: (params, options = {}) => {
      return callAndAwaitChiaRPC(
        `${config.datalayer_host}/add_mirror`,
        params,
        config,
        options
      );
    },

    addMissingFiles: (params, options = {}) => {
      return callAndAwaitChiaRPC(
        `${config.datalayer_host}/add_missing_files`,
        params,
        config,
        {
          includeFee: false,
          ...options,
        }
      );
    },

    createDataStore: (params, options = {}) => {
      return callAndAwaitChiaRPC(
        `${config.datalayer_host}/create_data_store`,
        params,
        config,
        {
          includeFee: false,
          ...options,
        }
      );
    },

    deleteMirror: (params, options = {}) => {
      return callAndAwaitChiaRPC(
        `${config.datalayer_host}/delete_mirror`,
        params,
        config,
        {
          includeFee: false,
          ...options,
        }
      );
    },

    getKeys: (params, options = {}) => {
      return callAndAwaitChiaRPC(
        `${config.datalayer_host}/get_keys`,
        params,
        config,
        {
          includeFee: false,
          ...options,
        }
      );
    },

    getKeysValues: (params, options = {}) => {
      return callAndAwaitChiaRPC(
        `${config.datalayer_host}/get_keys_values`,
        params,
        config,
        {
          includeFee: false,
          ...options,
        }
      );
    },

    getKvDiff: (params, options = {}) => {
      return callAndAwaitChiaRPC(
        `${config.datalayer_host}/get_kv_diff`,
        params,
        config,
        {
          includeFee: false,
          ...options,
        }
      );
    },

    getMirrors: (params, options = {}) => {
      return callAndAwaitChiaRPC(
        `${config.datalayer_host}/get_mirrors`,
        params,
        config,
        {
          includeFee: false,
          ...options,
        }
      );
    },

    getOwnedStores: (params, options = {}) => {
      return callAndAwaitChiaRPC(
        `${config.datalayer_host}/get_owned_stores`,
        params,
        config,
        {
          includeFee: false,
          ...options,
        }
      );
    },

    getRoot: (params, options = {}) => {
      return callAndAwaitChiaRPC(
        `${config.datalayer_host}/get_root`,
        params,
        config,
        {
          includeFee: false,
          ...options,
        }
      );
    },

    getRootHistory: (params, options = {}) => {
      return callAndAwaitChiaRPC(
        `${config.datalayer_host}/get_root_history`,
        params,
        config,
        {
          includeFee: false,
          ...options,
        }
      );
    },

    getSubscriptions: (params, options = {}) => {
      return callAndAwaitChiaRPC(
        `${config.datalayer_host}/get_subscriptions`,
        params,
        config,
        {
          includeFee: false,
          ...options,
        }
      );
    },

    getSyncStatus: (params, options = {}) => {
      return callAndAwaitChiaRPC(
        `${config.datalayer_host}/get_sync_status`,
        params,
        config,
        {
          includeFee: false,
          ...options,
        }
      );
    },

    getValue: (params, options = {}) => {
      return callAndAwaitChiaRPC(
        `${config.datalayer_host}/get_value`,
        params,
        config,
        {
          includeFee: false,
          ...options,
        }
      );
    },

    plugins: (params, options = {}) => {
      return callAndAwaitChiaRPC(
        `${config.datalayer_host}/plugins`,
        params,
        config,
        {
          includeFee: false,
          ...options,
        }
      );
    },

    removeSubscription: (params, options = {}) => {
      return callAndAwaitChiaRPC(
        `${config.datalayer_host}/remove_subscription`,
        params,
        config,
        {
          includeFee: false,
          ...options,
        }
      );
    },

    subscribe: (params, options = {}) => {
      return callAndAwaitChiaRPC(
        `${config.datalayer_host}/subscribe`,
        params,
        config,
        {
          includeFee: false,
          ...options,
        }
      );
    },

    unsubscribe: (params, options = {}) => {
      return callAndAwaitChiaRPC(
        `${config.datalayer_host}/unsubscribe`,
        params,
        config,
        {
          includeFee: false,
          ...options,
        }
      );
    },

    updateDataStore: (params, options = {}) => {
      return callAndAwaitChiaRPC(
        `${config.datalayer_host}/batch_update`,
        params,
        config,
        options
      );
    },
  };
};
