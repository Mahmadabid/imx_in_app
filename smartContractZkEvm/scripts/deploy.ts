import { ethers } from 'hardhat'

async function main() {

  const MyContract = await ethers.getContractFactory('SimpleString');

  const contract = await MyContract.deploy();

  await contract.deployed();

  console.log('Contract deployed to:', contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });