const os = require("os");
const path = require("path");
const fs = require("fs");
const { getChiaRoot } = require("../utils/chia-root");

const defaultConfig = {
  full_node_host: "https://localhost:8555",
  datalayer_host: "https://localhost:8562",
  wallet_host: "https://localhost:9256",
  certificate_folder_path: "~/.chia/mainnet/config/ssl",
  default_wallet_id: 1,
  default_fee: 300_000_000,
  default_mirror_coin_amount: 300_000_000,
};

const getBaseOptions = (config) => {
  const chiaRoot = getChiaRoot();
  let cert, key;

  if (process.env.CHIA_CERT_BASE64 && process.env.CHIA_KEY_BASE64) {
    console.log(`Using cert and key from environment variables.`);

    cert = Buffer.from(process.env.CHIA_CERT_BASE64, "base64").toString(
      "ascii"
    );
    key = Buffer.from(process.env.CHIA_KEY_BASE64, "base64").toString("ascii");
  } else {
    let certificateFolderPath =
      config.certificate_folder_path || `${chiaRoot}/config/ssl`;

    // If certificateFolderPath starts with "~", replace it with the home directory
    if (certificateFolderPath.startsWith("~")) {
      certificateFolderPath = path.join(
        os.homedir(),
        certificateFolderPath.slice(1)
      );
    }

    const certFile = path.resolve(
      `${certificateFolderPath}/data_layer/private_data_layer.crt`
    );
    const keyFile = path.resolve(
      `${certificateFolderPath}/data_layer/private_data_layer.key`
    );

    cert = fs.readFileSync(certFile);
    key = fs.readFileSync(keyFile);
  }

  const baseOptions = {
    method: "POST",
    cert,
    key,
    timeout: 300000,
  };

  return baseOptions;
};

module.exports = {
  getBaseOptions,
  defaultConfig,
};