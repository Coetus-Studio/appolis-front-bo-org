// con este archivo desplegamos el proyecto usando hardhat
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // aqui se instancian los smartcontracts
  const NFT = await ethers.getContractFactory("NFT");
  const Marketplace = await ethers.getContractFactory("Marketplace");

  // ahora hacemos el deply de los SC. El primer Smart contract recibe un feePercent en su constructor. % que gano por ser dueño de la aplicacion
  const marketplace = await Marketplace.deploy(1);
  // ahora desplegamos NFT. Este SC no recibe ningun parametro en su constructor
  const nft = await NFT.deploy();

  // Save copies of each contracts abi and address to the frontend.
  // estos ficheros se almacenaran en la carpeta contractsData
  saveFrontendFiles(marketplace, "Marketplace");
  saveFrontendFiles(nft, "NFT");

}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../contracts-data";

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
