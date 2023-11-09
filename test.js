const { publicIpv4 } = require("./ip-utils");

const run = async () => {
  const ip = await publicIpv4({ forceIp4: true });
  console.log(ip);
};

run();
