const {
  UserGetAllVModel,
  UserCreateVModel,
} = require("../viewmodels/UserVModel");

function mapUserToVModel(user) {
  return new UserGetAllVModel(user);
}

function mapUserToVModel2(user) {
  return new UserCreateVModel(user);
}

module.exports = { mapUserToVModel, mapUserToVModel2 };
