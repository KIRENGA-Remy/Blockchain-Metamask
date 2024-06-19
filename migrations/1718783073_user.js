const User = artifacts.require("User");

module.exports = ((deployer) => {
    deployer.deploy(User);
});

