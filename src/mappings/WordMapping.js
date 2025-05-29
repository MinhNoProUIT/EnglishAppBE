const {
  getAllWordsVModel,
  createWordVModel,
  updateWordVModel,
} = require("../viewmodels/WordVModel");

function mapGetAllWordsToVModel(word) {
  return new getAllWordsVModel(word);
}

function mapCreateWordToVModel(word) {
  return new createWordVModel(word);
}

function mapUpdateWordToVModel(word) {
  return new updateWordVModel(word);
}

module.exports = {
  mapGetAllWordsToVModel,
  mapCreateWordToVModel,
  mapUpdateWordToVModel,
};
