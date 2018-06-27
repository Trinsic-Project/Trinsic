const SwapAgreementFactory = artifacts.require("./SwapAgreementFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(SwapAgreementFactory);
};
