const {
  mapGetAllCoursesToVModel,
  mapGetTotalCourseToVModel,
  mapCreateCourseToVModel,
  mapUpdateCourseToVModel,
} = require("../mappings/CourseMapping");
const CourseService = require("../services/CourseService");
const { getCurrentUserId } = require("../utils/CurrentUser");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
async function checkIsPremiumUser(user_id) {
  const user = await prisma.users.findFirst({
    where: {
      id: user_id,
    },
    select: {
      isPremium: true,
    },
  });

  if (!user) {
    return false;
  }

  return user.isPremium;
}

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
      res.status(201).json(mapCreateCourseToVModel(newCourse));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async updateCourse(req, res) {
    try {
      const { id } = req.params;
      const updateCourse = await CourseService.updateCourse(id, req.body);
      res.status(200).json(mapUpdateCourseToVModel(updateCourse));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async deleteCourse(req, res) {
    try {
      const { id } = req.params;
      await CourseService.deleteCourse(id);
      res.json({ message: `Deleted course with id ${id}` });
    } catch (err) {
      console.error("Error in deleteCourse:", err);
      res.status(400).json({ error: err.message });
    }
  },

  async getAllOngoingCoursesByUser(req, res) {
    try {
      const user_id = getCurrentUserId(req);
      const isPremium = await checkIsPremiumUser(user_id);
      const allCourses = await CourseService.getAllOngoingCoursesByUser(user_id, isPremium);
      res.json(allCourses);
    } catch (err) {
      console.error("Error in get all ongoing courses by user:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getAllCompletedCoursesByUser(req, res) {
    try {
      const allCourses = await CourseService.getAllCompletedCoursesByUser(
        getCurrentUserId(req)
      );
      res.json(allCourses);
    } catch (err) {
      console.error("Error in get all completed courses by user:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = CourseController;
