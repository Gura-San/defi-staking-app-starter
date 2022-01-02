const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

require("chai").use(require("chai-as-promised")).should();

contract("DecentralBank", ([owner, customer]) => {
  let tether,
    rwd,
    decentralBank = null;

  let tokens = (number) => web3.utils.toWei(number.toString(), "ether");

  before(async () => {
    // Load Contracts
    tether = await Tether.new();
    rwd = await RWD.new();
    decentralBank = await DecentralBank.new(rwd.address, tether.address);

    // Transfer all tokens to DecentralBank (1 mil)
    await rwd.transfer(decentralBank.address, tokens(1000000));

    // Transfer 100 mock Tethers to Investor
    await tether.transfer(customer, tokens(100), { from: owner });
  });

  describe("Mock Tether Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await tether.name();
      assert.equal(name, "Tether", "name does not match");
    });

    it("matches symbol successfully", async () => {
      const symbol = await tether.symbol();
      assert.equal(symbol, "USDT", "symbol does not match");
    });
  });

  describe("Mock RWD Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await rwd.name();
      assert.equal(name, "Reward Token", "name does not match");
    });

    it("matches symbol successfully", async () => {
      const symbol = await rwd.symbol();
      assert.equal(symbol, "RWD", "symbol does not match");
    });
  });

  describe("Decentral Bank Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await decentralBank.name();
      assert.equal(name, "Decentral Bank", "name does not match");
    });

    it("contract has tokens", async () => {
      let balance = await rwd.balanceOf(decentralBank.address);
      assert.equal(balance, tokens(1000000), "Insuficient ballance");
    });

    describe("Yield Farming", async () => {
      it("rewards tokens for staking", async () => {
        let customerBallance;

        // Check investor ballance
        customerBallance = await tether.balanceOf(customer);
        assert.equal(customerBallance, tokens(100), "Customer mock wallet ballance before staking")
      });
    });
  });
});
