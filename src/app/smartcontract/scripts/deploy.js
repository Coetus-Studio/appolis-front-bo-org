// con este archivo desplegamos el proyecto usando hardhat
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // aqui se instancian los smartcontracts
  // const NFT = await ethers.getContractFactory("NFT");
  // const Marketplace = await ethers.getContractFactory("Marketplace");

  console.log("jamtoken");
  const AppolisToken = await ethers.getContractFactory("AppolisToken");
  console.log("Stellar");
  const StellartToken = await ethers.getContractFactory("StellartToken");
  console.log("TokenFarm");
  const TokenFarm = await ethers.getContractFactory("TokenFarm");

/*   // ahora hacemos el deply de los SC. El primer Smart contract recibe un feePercent en su constructor. % que gano por ser dueño de la aplicacion
  const marketplace = await Marketplace.deploy(1);
  // ahora desplegamos NFT. Este SC no recibe ningun parametro en su constructor
  const nft = await NFT.deploy(); */

  // nuevos smartcontract
  // JamToken sirve para hacer staking
  const appolisToken = await AppolisToken.deploy();
  console.log("deployado jamtoken")
  // smartcontract para recompenza a quuien haga staking
  const stellartToken = await StellartToken.deploy();
  console.log("deployado stellartToken")
  // smartcontract principal, controla appolisToken y stellartToken
  const tokenFarm = await TokenFarm.deploy(stellartToken.address, appolisToken.address);
  console.log("deployado tokenFarm")


  // Guarde copias de cada contrato abi y dirección en el frontend.
  // estos ficheros se almacenaran en la carpeta contractsData
 /*  saveFrontendFiles(marketplace, "Marketplace");
  saveFrontendFiles(nft, "NFT"); */
  saveFrontendFiles(appolisToken, "AppolisToken");
  saveFrontendFiles(stellartToken, "StellartToken");
  saveFrontendFiles(tokenFarm, "TokenFarm");

/*   console.log('marketplace: ' + JSON.stringify(marketplace.address));
  console.log('nft: ' + JSON.stringify(nft.address)); */
  console.log('appolisToken: ' + JSON.stringify(appolisToken.address));
  console.log('stellartToken: ' + JSON.stringify(stellartToken.address));
  console.log('tokenFarm: ' + JSON.stringify(tokenFarm.address));

}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  // const contractsDir = __dirname + "/../contracts-data";
  const contractsDir = __dirname + "/../../assets/contracts-data";

  // console.log('contractsDir: ', contractsDir)


  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
