const {
  getAllQuizzesByUserVModel,
  createQuizVModel,
  updateQuizVModel,
} = require("../viewmodels/QuizVModel");

function mapGetAllQuizzesByUserToVModel(quiz) {
  return new getAllQuizzesByUserVModel(quiz);
}

function mapCreateQuizToVModel(quiz) {
  return new createQuizVModel(quiz);
}

function mapUpdateQuizToVModel(quiz) {
  return new updateQuizVModel(quiz);
}

module.exports = {
  mapGetAllQuizzesByUserToVModel,
  mapCreateQuizToVModel,
  mapUpdateQuizToVModel,
};
