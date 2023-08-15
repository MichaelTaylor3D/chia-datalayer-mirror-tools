const os = require('os');
const path = require('path');

let chiaRoot = null;

const getChiaRoot = () => {
  if (chiaRoot) {
    return chiaRoot;
  }

  if (process.env.CHIA_ROOT) {
    chiaRoot = path.resolve(process.env.CHIA_ROOT);
  } else {
    const homeDir = os.homedir();
    chiaRoot = path.resolve(`${homeDir}/.chia/mainnet`);
  }

  return chiaRoot;
}

module.exports = {
  getChiaRoot,
}
