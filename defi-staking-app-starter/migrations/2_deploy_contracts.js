const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function (deployer, network, accounts) {
  // Deploy Mock Tether Contract
  await deployer.deploy(Tether);
  const tehter = await Tether.deployed();

  // Deploy Reward  Contract
  await deployer.deploy(RWD);
  const rwd = await RWD.deployed();

  // Deploy DecentralBank Contract
  await deployer.deploy(DecentralBank);
  const decentralBank = await DecentralBank.deployed();

  // Transfer all RWD tokens to Decentral Bank
  await rwd.transfer(DecentralBank.address, "1000000000000000000000000");

  // Distribute 100 tether tokens to investor
  await tether.transfer(accounts[1], "1000000000000000000");
};
