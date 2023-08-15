const superagent = require("superagent");
const https = require("https");
const { getBaseOptions } = require("../utils/api-utils");

const walletIsSynced = async (config) => {
  try {
    const { cert, key, timeout } = getBaseOptions(config);

    const response = await superagent
      .post(`${config.wallet_host}/get_sync_status`)
      .send({})
      .key(key)
      .cert(cert)
      .timeout(timeout)
      .agent(new https.Agent({ rejectUnauthorized: false }));

    const data = JSON.parse(response.text);

    if (data.success) {
      return data.synced;
    }

    return false;
  } catch (error) {
    return false;
  }
};

const walletIsAvailable = async (config) => {
  return await walletIsSynced(config);
};

const waitForAllTransactionsToConfirm = async (config) => {
  const unconfirmedTransactions = await hasUnconfirmedTransactions(config);

  if (unconfirmedTransactions) {
    await new Promise((resolve) => setTimeout(() => resolve(), 15000));
    return waitForAllTransactionsToConfirm(config);
  }

  return true;
};

const hasUnconfirmedTransactions = async (config, options) => {
  const { cert, key, timeout } = getBaseOptions(config);

  const response = await superagent
    .post(`${config.wallet_host}/get_transactions`)
    .send({
      wallet_id: options?.walletId || config.default_wallet_id,
      sort_key: "RELEVANCE",
    })
    .key(key)
    .cert(cert)
    .timeout(timeout)
    .agent(new https.Agent({ rejectUnauthorized: false }));

  const data = JSON.parse(response.text);

  if (data.success) {
    const unconfirmedTransactions = data.transactions.some(
      (transaction) => !transaction.confirmed
    );

    if (unconfirmedTransactions) {
      console.log("Wallet has pending transactions");
    }

    return unconfirmedTransactions;
  }

  return false;
};

module.exports = {
  walletIsSynced,
  walletIsAvailable,
  waitForAllTransactionsToConfirm,
  hasUnconfirmedTransactions,
};

