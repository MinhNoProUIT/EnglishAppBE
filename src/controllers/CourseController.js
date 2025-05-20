const { mapGetAllCoursesToVModel, mapGetTotalCourseToVModel, mapCreateCoursesToVModel } = require("../mappings/CourseMapping");
const CourseService = require("../services/CourseService");

const CourseController = {
  async getAllCourses(req, res) {
    try {
      const allCourses = await CourseService.getAllCourses();
      res.json(allCourses.map(mapGetAllCoursesToVModel));
    } catch (err) {
      console.error("Error in get all courses:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getTotalCourses(req, res) {
    try {
      const result = await CourseService.getTotalCourses();
      res.json(mapGetTotalCourseToVModel(result));
    } catch (err) {
      console.error("Error in get total courses:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  
  async createCourse(req, res) {
    try {
      const newCourse = await CourseService.createCourse(req.body);
      res.status(201).json(mapCreateCoursesToVModel(newCourse));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = CourseController;
