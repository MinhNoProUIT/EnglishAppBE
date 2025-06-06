const {
  createGroupVModel,
  getDetailsGroupVModel,
  changeNameGroupVModel,
  changeImageGroupVModel,
} = require("../viewmodels/GroupVModel");

function mapGetDetailsGroupToVModel(group) {
  return new getDetailsGroupVModel(group);
}

function mapCreateGroupToVModel(group) {
  return new createGroupVModel(group);
}

function mapChangeNameGroupToVModel(data) {
  return new changeNameGroupVModel(data);
}

function mapChangeImageGroupToVModel(data) {
  return new changeImageGroupVModel(data);
}

module.exports = {
  mapGetDetailsGroupToVModel,
  mapCreateGroupToVModel,
  mapChangeImageGroupToVModel,
  mapChangeNameGroupToVModel,
};
