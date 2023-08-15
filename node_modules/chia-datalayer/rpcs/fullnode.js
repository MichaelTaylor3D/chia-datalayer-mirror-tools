const superagent = require("superagent");
const https = require("https");
const { getBaseOptions } = require("../utils/api-utils");

const getFeeEstimate = async (config) => {
  const { cert, key } = getBaseOptions(config);

  if (!config.full_node_host) {
    console.log(`Using default fee estimate: ${config.default_fee}`);
    return config.default_fee;
  }

  try {
    const response = await superagent
      .post(`${config.full_node_host}/get_fee_estimate`)
      .send({
        target_times: [60, 120, 300],
        spend_type: "send_xch_transaction",
      })
      .set("Content-Type", "application/json")
      .key(key)
      .cert(cert)
      .agent(new https.Agent({ rejectUnauthorized: false }));

    const estimates = response?.body?.estimates;
    const mojos = estimates && estimates[0] ? estimates[0] : config.default_fee;

    // If the mojos are over 1 trillion, use the default fee
    if (mojos > convertXchToMojos(1)) {
      console.log(`Current fee estimate is too high: ${mojos} mojos`);
      return config.default_fee;
    }

    console.log(`Current fee estimate: ${mojos} mojos`);
    return mojos;
  } catch {
    console.log(
      "Error fetching fee estimate from the fullnode. Using default fee."
    );
    return config.default_fee;
  }
};

module.exports = {
  getFeeEstimate,
};
