const { expect } = require("chai");

// We use `loadFixture` to share common setups (or fixtures) between tests.
// Using this simplifies your tests and makes them run faster, by taking
// advantage of Hardhat Network's snapshot functionality.
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Utility contract", function () {
    async function deployWalletUtil() {
        const Wallet = await ethers.getContractFactory("Wallet");
        const [owner] = await ethers.getSigners();

        const hardhatWallet = await Wallet.deploy();

        await hardhatWallet.deployed();

        return {hardhatWallet};
    }

    it("Should retrieve all token balances given wallet address and token contract address", async function() {
        const { hardhatWallet } = await loadFixture(deployWalletUtil);
        const testWalletAddr = "0xFB6D7a969727F86533161daE27103F95c34A78bc";
        const tokenAddr = ["0x7af963cF6D228E564e2A0aA0DdBF06210B38615D", "0x7af963cF6D228E564e2A0aA0DdBF06210B38615D"];
        const output = await hardhatWallet.getBalances(testWalletAddr, tokenAddr);
        console.log(output);
     })
});