const QuizService = require("../services/QuizService");
const {
  mapGetAllQuizzesByUserToVModel,
  mapCreateQuizToVModel,
  mapUpdateQuizToVModel,
} = require("../mappings/QuizMapping");
const { getCurrentUserId } = require("../utils/CurrentUser")

const QuizController = {
  async getAllQuizzesByUser(req, res) {
    try {
      const allQuizzes = await QuizService.getAllQuizzesByUser(getCurrentUserId(req));
      res.json(allQuizzes.map(mapGetAllQuizzesByUserToVModel));
    } catch (err) {
      console.error("Error in getAllQuizzesByUser:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createQuiz(req, res) {
    try {
      const newQuiz = await QuizService.createQuiz(req.body);
      res.status(201).json(mapCreateQuizToVModel(newQuiz));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async updateQuiz(req, res) {
    try {
      const { id } = req.params;
      const updateQuiz = await QuizService.updateQuiz(id, req.body);
      res.status(200).json(mapUpdateQuizToVModel(updateQuiz));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async deleteQuiz(req, res) {
    try {
      const { id } = req.params;
      await QuizService.deleteQuiz(id);
      res.json({ message: `Deleted quiz with id ${id}` });
    } catch (err) {
      console.error("Error in deleteQuiz:", err);
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = QuizController;
