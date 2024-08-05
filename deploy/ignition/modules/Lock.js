const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TodoModule", (m) => {
  const todo = m.contract("Todo");

  return { todo };
});
