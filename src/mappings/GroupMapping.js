const {
  createGroupVModel,
  editGroupVModel,
  getDetailsGroupVModel,
} = require("../viewmodels/GroupVModel");

function mapGetDetailsGroupToVModel(group) {
  return new getDetailsGroupVModel(group);
}

function mapCreateGroupToVModel(group) {
  return new createGroupVModel(group);
}

function mapEditGroupToVModel(data) {
  return new editGroupVModel(data);
}

module.exports = {
  mapGetDetailsGroupToVModel,
  mapCreateGroupToVModel,
  mapEditGroupToVModel,
};
