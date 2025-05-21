const {
  getAllMemberInGroupVModel,
  addMemberVModel,
  kickMemberVModel,
  getAllGroupByUserVModel,
} = require("../viewmodels/GroupMemberVModel");

function mapGetAllMemberInGroupToVModel(member) {
  return new getAllMemberInGroupVModel(member);
}

function mapGetAllGroupsByUserToVModel(group) {
  return new getAllGroupByUserVModel(group);
}

function mapAddMemberToVModel(member) {
  return new addMemberVModel(member);
}

function mapKickMemberToVModel(id) {
  return new kickMemberVModel(id);
}

module.exports = {
  mapGetAllMemberInGroupToVModel,
  mapGetAllGroupsByUserToVModel,
  mapAddMemberToVModel,
  mapKickMemberToVModel,
};
