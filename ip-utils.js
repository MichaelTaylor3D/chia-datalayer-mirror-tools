const _ = require("lodash");
const superagent = require("superagent");

const defaults = {
  timeout: 5000,
  onlyHttps: false,
};

const dnsServers = [
  {
    servers: [
      "208.67.222.222",
      "208.67.220.220",
      "208.67.222.220",
      "208.67.220.222",
    ],
    name: "myip.opendns.com",
    type: "A",
  },
  {
    servers: [
      "216.239.32.10",
      "216.239.34.10",
      "216.239.36.10",
      "216.239.38.10",
    ],
    name: "o-o.myaddr.l.google.com",
    type: "TXT",
    transform: (ip) => ip.replace(/"/g, ""),
  },
];

const type = {
  v4: {
    dnsServers: dnsServers.map(({ servers, ...question }) => ({
      servers,
      question,
    })),
    httpsUrls: ["https://icanhazip.com/", "https://api.ipify.org/"],
  },
};

const queryHttps = (version, options) => {
  let cancel;

  const promise = (async () => {
    const urls = [...type[version].httpsUrls, ...(options.fallbackUrls ?? [])];

    for (const url of urls) {
      if (options.forceIp4 && url === "https://icanhazip.com/") {
        continue; // Skip this URL if forceIp4 option is set
      }
      
      const response = await superagent.get(url);
      const ip = (response.text || "").trim();
      if (!_.isEmpty(ip)) {
        return ip;
      }
    }

    throw new Error("IP Not found");
  })();

  promise.cancel = function () {
    return cancel.apply(this);
  };

  return promise;
};

function publicIpv4(options) {
  options = {
    ...defaults,
    ...options,
  };

  return queryHttps("v4", options);
}

module.exports = {
  publicIpv4,
};
