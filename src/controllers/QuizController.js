const QuizService = require("../services/QuizService");
const {
  mapCreateQuizToVModel,
  mapUpdateQuizToVModel,
} = require("../mappings/QuizMapping");
const { getCurrentUserId } = require("../utils/CurrentUser");

const QuizController = {
  async getAllQuizzesByUser(req, res) {
    try {
      const allQuizzes = await QuizService.getAllQuizzesByUser(getCurrentUserId(req));
      res.json(allQuizzes);
    } catch (err) {
      console.error("Error in getAllQuizzesByUser:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createQuiz(req, res) {
    try {
      const userId = getCurrentUserId(req);
      const { title } = req.body;
      const newQuiz = await QuizService.createQuiz({ user_id: userId, title });
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

  async createQuizWithQuestions(req, res) {
    try {
      const userId = getCurrentUserId(req);
      const { title, questions } = req.body;

      const quiz = await QuizService.createQuizWithQuestions(userId, title, questions);
      res.status(201).json(quiz);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  
  async updateQuizWithQuestions(req, res) {
    try {
      const { quiz_id } = req.params;
      const { title, questions } = req.body;

      const quiz = await QuizService.updateQuizWithQuestions(quiz_id, title, questions);
      res.status(201).json(quiz);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

};

module.exports = QuizController;
