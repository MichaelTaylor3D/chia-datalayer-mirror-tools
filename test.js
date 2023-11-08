const { publicIpv4 } = require("./ip-utils");

const run = async () => {
  const ip = await publicIpv4();
  console.log(ip);
};

run();
