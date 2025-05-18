const {
  UserGetAllVModel,
  UserCreateVModel,
  UserGetAllInPostVModel,
  TopFiveUserInPostVModel,
} = require("../viewmodels/UserVModel");

function mapUserToVModel(user) {
  return new UserGetAllVModel(user);
}

function mapUserInPostToVModel(user) {
  return new UserGetAllInPostVModel(user);
}

function mapTopFiveUserInPostToVModel(user) {
  return new TopFiveUserInPostVModel(user);
}

function mapUserToVModel2(user) {
  return new UserCreateVModel(user);
}

module.exports = {
  mapUserToVModel,
  mapUserToVModel2,
  mapUserInPostToVModel,
  mapTopFiveUserInPostToVModel,
};
