const { UserGetAllVModel } = require("../viewmodels/UserVModel");

function mapUserToVModel(user) {
  return new UserGetAllVModel(user);
}

module.exports = { mapUserToVModel };
