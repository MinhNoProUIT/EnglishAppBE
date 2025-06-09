const UserProgressService = require("../services/UserProgressService");
const {
  mapCreateUserProgressToVModel,
  mapUpdateUserProgressToVModel,
} = require("../mappings/UserProgressMapping");
const { getCurrentUserId } = require("../utils/CurrentUser");

const UserProgressController = {
  async getAllUserProgressByCourse(req, res) {
    try {
      const { course_id } = req.params;
      const allUserProgress = await UserProgressService.getAllUserProgressByCourse(getCurrentUserId(req), course_id);
      res.json(allUserProgress);
    } catch (err) {
      console.error("Error in getAllUserProgressByCourse:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createUserProgress(req, res) {
    try {
      const { word_id } = req.params;
      const newUserProgress = await UserProgressService.createUserProgress(getCurrentUserId(req), word_id);
      res.status(201).json(mapCreateUserProgressToVModel(newUserProgress));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async updateUserProgress(req, res) {
    try {
      const { word_id } = req.params;
      const updateUserProgress = await UserProgressService.updateUserProgress(getCurrentUserId(req), word_id, req.body);
      res.status(200).json(mapUpdateUserProgressToVModel(updateUserProgress));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async deleteUserProgress(req, res) {
    try {
      const { id } = req.params;
      await UserProgressService.deleteUserProgress(id);
      res.json({ message: `Deleted user progress with id ${id}` });
    } catch (err) {
      console.error("Error in deleteUserProgress:", err);
      res.status(400).json({ error: err.message });
    }
  },

  async getUnlearnedWordsByCourse(req, res) {
    try {
      const { course_id } = req.params;
      const allWords = await UserProgressService.getUnlearnedWordsByCourse(getCurrentUserId(req), course_id);
      res.json(allWords);
    } catch (err) {
      console.error("Error in getUnlearnedWordsByCourse:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getAllTodayRepeatWordsByCourse(req, res) {
    try {
      const { course_id } = req.params;
      const allWords = await UserProgressService.getAllTodayRepeatWordsByCourse(getCurrentUserId(req), course_id);
      res.json(allWords);
    } catch (err) {
      console.error("Error in getAllTodayRepeatWordsByCourse:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getNumberTodayRepeatWordsByCourse(req, res) {
    try {
      const { course_id } = req.params;
      const allWords = await UserProgressService.getNumberTodayRepeatWordsByCourse(getCurrentUserId(req), course_id);
      res.json(allWords);
    } catch (err) {
      console.error("Error in getNumberTodayRepeatWordsByCourse:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getCompletedWordsByCourse(req, res) {
    try {
      const { course_id } = req.params;
      const allWords = await UserProgressService.getCompletedWordsByCourse(getCurrentUserId(req), course_id);
      res.json(allWords);
    } catch (err) {
      console.error("Error in getCompletedWordsByCourse:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = UserProgressController;
