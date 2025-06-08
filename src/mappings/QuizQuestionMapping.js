const {
  getAllQuizQuestionsByQuizVModel,
  createQuizQuestionVModel,
  updateQuizQuestionVModel,
} = require("../viewmodels/QuizQuestionVModel");

function mapGetAllQuizQuestionsByQuizToVModel(question) {
  return new getAllQuizQuestionsByQuizVModel(question);
}

function mapCreateQuizQuestionToVModel(question) {
  return new createQuizQuestionVModel(question);
}

function mapUpdateQuizQuestionToVModel(question) {
  return new updateQuizQuestionVModel(question);
}

module.exports = {
  mapGetAllQuizQuestionsByQuizToVModel,
  mapCreateQuizQuestionToVModel,
  mapUpdateQuizQuestionToVModel,
};
