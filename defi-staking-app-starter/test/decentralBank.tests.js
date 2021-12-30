const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

require("chai").use(require("chai-as-promised")).should();

contract("DecentralBank", (accounts) => {
  describe("Mock Tether Deployment", async () => {
    let tether = null;
    beforeEach(async () => {
      tether = await Tether.new();
    });

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
      let rwd = await RWD.new();
      const name = await rwd.name();
      assert.equal(name, "Reward Token", "name does not match");
    });
  });
});
