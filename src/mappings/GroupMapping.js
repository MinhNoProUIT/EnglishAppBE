const {
  getAllGroupByUserVModel,
  createGroupVModel,
  editGroupVModel,
} = require("../viewmodels/GroupVModel");

function mapGetAllGroupsByUserToVModel(group) {
  return new getAllGroupByUserVModel(group);
}

function mapCreateGroupToVModel(group) {
  return new createGroupVModel(group);
}

function mapEditGroupToVModel(data) {
  return new editGroupVModel(data);
}

module.exports = {
  mapGetAllGroupsByUserToVModel,
  mapCreateGroupToVModel,
  mapEditGroupToVModel,
};
