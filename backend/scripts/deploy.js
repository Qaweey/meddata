const { ethers } = require('hardhat');

async function main() {
  const medData = await ethers.getContractFactory('patientInfo');
  const MedDataDeployment = await medData.deploy();
  await MedDataDeployment.deployed();

  console.log('Your smart contract is deployed at', MedDataDeployment.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
