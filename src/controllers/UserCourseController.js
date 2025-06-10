const UserCourseService = require("../services/UserCourseService");
const { formatResponse } = require("../utils/responseHelper");
const { getCurrentUserId } = require("../utils/CurrentUser");

const UserCourseController = {
  async getUserCourses(req, res) {
    try {
      const user_id = getCurrentUserId(req);
      const result = await UserCourseService.getUserCourses(user_id);
      res.json(formatResponse(true, result));
    } catch (err) {
      console.error("Error in getUserCourses:", err);
      res.status(500).json({
        Success: false,
        Data: null,
        Message: "Internal Server Error",
      });
    }
  },

  async createUserCourse(req, res) {
    try {
      const user_id = getCurrentUserId(req);
      const { course_id } = req.body;
      const created = await UserCourseService.createUserCourse(
        user_id,
        course_id
      );
      res.status(201).json(formatResponse(true, created));
    } catch (err) {
      console.error("Error in createUserCourse:", err);
      res.status(500).json({
        Success: false,
        Data: null,
        Message: "Internal Server Error",
      });
    }
  },
};

module.exports = UserCourseController;
