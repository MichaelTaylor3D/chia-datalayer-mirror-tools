const Datalayer = require("chia-datalayer");
const { getChiaConfig } = require("chia-config-loader");
const defaultConfig = require("./defaultConfig");
const { publicIpv4 } = require("./ip-utils");

let config = defaultConfig;
let datalayer = new Datalayer(defaultConfig);

const configure = (newConfig) => {
  config = { ...config, ...newConfig };
  datalayer = new Datalayer(config);
};

const getOwnedMirrors = async (storeId) => {
  const response = await datalayer.getMirrors({
    id: storeId,
  });

  return response.mirrors.filter((mirror) => mirror.ours === true);
};

const deleteAllOwnedMirrors = async (storeId) => {
  const mirrors = await getOwnedMirrors(storeId);

  for (mirror of mirrors) {
    const response = await datalayer.deleteMirror({
      coin_id: mirror.coin_id,
    });

    if (response.success === false) {
      console.error(
        `Failed to delete mirror ${mirror.coin_id} for store ${storeId}`
      );
    } else {
      console.log(`Deleted mirror ${mirror.coin_id} for store ${storeId}`);
    }
  }
};

const doesMirrorExist = async (storeId, url) => {
  const mirrors = await getOwnedMirrors(storeId);
  return mirrors.some(
    (mirror) =>
      mirror.urls.includes(url) &&
      mirror.launcher_id === storeId &&
      mirror.ours === true
  );
};

const addMirror = async (storeId, url) => {
  if (await doesMirrorExist(storeId, url)) {
    console.log(`Mirror ${url} already exists for store ${storeId}`);
    return { success: false}
  }

  const response = await datalayer.addMirror({
    id: storeId,
    urls: [url],
    amount: config.default_mirror_coin_amount,
  });

  if (response.success === false) {
    console.error(`Failed to add mirror ${url} for store ${storeId}`);
  }

  return response;
};

const addMirrorForCurrentHost = async (storeId) => {
  const chiaConfig = await getChiaConfig();
  const ip = await publicIpv4();
  const port = chiaConfig.data_layer.host_port;
  const url = `http://${ip}:${port}`;

  if (!storeId) {
    throw new Error("Store ID is required");
  }

  if (!ip) {
    throw new Error("Failed to get public IP");
  }

  if (!port) {
    throw new Error("Failed to get datalayer port from chia config file");
  }

  return addMirror(storeId, url);
};

const deleteMirror = async (storeId, url) => {
  const mirrors = await getOwnedMirrors(storeId);
  const mirror = mirrors.find(
    (mirror) => mirror.url === url && mirror.ours === true
  );

  if (!mirror) {
    console.log(`Mirror ${url} does not exist for store ${storeId}`);
    return { success: false }
  }

  const response = await datalayer.deleteMirror({
    coin_id: mirror.coin_id,
  });

  if (response.success === false) {
    console.error(`Failed to delete mirror ${url} for store ${storeId}`);
  }

  return response;
};

module.exports = {
  configure,
  getOwnedMirrors,
  deleteAllOwnedMirrors,
  doesMirrorExist,
  addMirror,
  deleteMirror,
  addMirrorForCurrentHost,
};
