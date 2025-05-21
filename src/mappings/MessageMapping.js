const {
  getAllMessagesInGroupVModel,
  createMessageVModel,
} = require("../viewmodels/MessageVModel");

function mapGetAllMessagesInGroupToVModel(message) {
  return new getAllMessagesInGroupVModel(message);
}

function mapCreateMessageToVModel(message) {
  return new createMessageVModel(message);
}

module.exports = {
  mapGetAllMessagesInGroupToVModel,
  mapCreateMessageToVModel,
};
