// /** @type import('hardhat/config').HardhatUserConfig */
// import "@nomiclabs/hardhat-ethers";

require("@nomiclabs/hardhat-ethers")

module.exports = {
  solidity: "0.8.20",
  paths: {
    sources: "./src/app/smartcontract/contracts",
    tests: "./src/app/smartcontract/test",
    cache: "./src/app/smartcontract/cache",
    artifacts: "./src/app/smartcontract/artifacts"
  },
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545"
    },
    hardhat:{}
  },
  defaultNetwork: "ganache"
};
