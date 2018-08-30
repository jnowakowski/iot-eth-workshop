var Migrations = artifacts.require("./IOTLamp.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
