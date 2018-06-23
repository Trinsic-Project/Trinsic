const SwapAgreement = artifacts.require("./SwapAgreement.sol");

module.exports = function(deployer) {
  deployer.deploy(SwapAgreement);
};
