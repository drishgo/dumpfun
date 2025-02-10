require("@nomicfoundation/hardhat-toolbox");
 require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  sources: "./contracts",
  networks: {
    hardhat: {
     forking:{
      url:"https://mainnet.infura.io/v3/f2740132a9dc47f198839eefb8664776"
     },
     chainId:1

    }
    
  },
  external: {
    contracts: [
      {
        artifacts: "node_modules/@uniswap/v2-periphery/artifacts",
        deploy: "node_modules/@uniswap/v2-periphery/deploy"
      }
    ]
  }
};
