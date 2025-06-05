const {
  getAllWordsVModel,
  createWordVModel,
  updateWordVModel,
  getAllWordsByCourseVModel
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

function mapGetAllWordsByCourseToVModel(word) {
  return new getAllWordsByCourseVModel(word);
}

module.exports = {
  mapGetAllWordsToVModel,
  mapCreateWordToVModel,
  mapUpdateWordToVModel,
  mapGetAllWordsByCourseToVModel,
};
