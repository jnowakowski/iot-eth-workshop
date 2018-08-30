var IOT = artifacts.require("../contracts/IOTLamp.sol");

const assert = require("chai").assert;

contract('IOTLamp', function(accounts) {  
  it("readUsersLog", function() {
    return IOT.deployed().then(async function(iot) {      
      await iot.addUser("Marcin", "user@gmail.com", {from: web3.eth.accounts[1], gas:230000});
      let result = await iot.getAccessList(); 
      console.log(result);
      assert.isNotEmpty(result);
    });
  })
});