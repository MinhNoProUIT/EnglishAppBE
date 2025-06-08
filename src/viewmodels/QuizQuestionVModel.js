class getAllQuizQuestionsByQuizVModel {
  constructor({
    id,
    quiz_id,
    question_text,
    options,
    correct_answer,
  }) {
    this.id = id;
    this.quiz_id = quiz_id
    this.question_text = question_text;
    this.options = options;
    this.correct_answer = correct_answer;
  }
}

class createQuizQuestionVModel {
  constructor({
    id,
    quiz_id,
    question_text,
    options,
    correct_answer,
  }) {
    this.id = id;
    this.quiz_id = quiz_id
    this.question_text = question_text;
    this.options = options;
    this.correct_answer = correct_answer;
  }
}

class updateQuizQuestionVModel {
  constructor({
    id,
    quiz_id,
    question_text,
    options,
    correct_answer,
  }) {
    this.id = id;
    this.quiz_id = quiz_id
    this.question_text = question_text;
    this.options = options;
    this.correct_answer = correct_answer;
  }
}

module.exports = {
  getAllQuizQuestionsByQuizVModel,
  createQuizQuestionVModel,
  updateQuizQuestionVModel,
};
