const {
  getAllTopicsVModel,
  createTopicVModel,
  updateTopicVModel,
} = require("../viewmodels/TopicVModel");

function mapGetAllTopicsToVModel(topic) {
  return new getAllTopicsVModel(topic);
}

function mapCreateTopicToVModel(topic) {
  return new createTopicVModel(topic);
}

function mapUpdateTopicToVModel(topic) {
  return new updateTopicVModel(topic);
}

module.exports = {
  mapGetAllTopicsToVModel,
  mapCreateTopicToVModel,
  mapUpdateTopicToVModel,
};
