const QuizQuestionService = require("../services/QuizQuestionService");
const {
  mapGetAllQuizQuestionsByQuizToVModel,
  mapCreateQuizQuestionToVModel,
  mapUpdateQuizQuestionToVModel,
} = require("../mappings/QuizQuestionMapping");

const QuizQuestionController = {
  async getAllQuizQuestionsByQuiz(req, res) {
    try {
      const { quiz_id } = req.params;
      const allQuizQuestions = await QuizQuestionService.getAllQuizQuestionsByQuiz(quiz_id);
      res.json(allQuizQuestions.map(mapGetAllQuizQuestionsByQuizToVModel));
    } catch (err) {
      console.error("Error in getAllQuizQuestionsByQuiz:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createQuizQuestion(req, res) {
    try {
      const newQuizQuestion = await QuizQuestionService.createQuizQuestion(req.body);
      res.status(201).json(mapCreateQuizQuestionToVModel(newQuizQuestion));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async updateQuizQuestion(req, res) {
    try {
      const { id } = req.params;
      const updateQuizQuestion = await QuizQuestionService.updateQuizQuestion(id, req.body);
      res.status(200).json(mapUpdateQuizQuestionToVModel(updateQuizQuestion));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async deleteQuizQuestion(req, res) {
    try {
      const { id } = req.params;
      await QuizQuestionService.deleteQuizQuestion(id);
      res.json({ message: `Deleted quiz question with id ${id}` });
    } catch (err) {
      console.error("Error in deleteQuizQuestion:", err);
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = QuizQuestionController;
