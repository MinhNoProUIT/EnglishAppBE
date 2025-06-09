const express = require("express");
const router = express.Router();
const UserCourseController = require("../controllers/UserCourseController");
const authMiddleware = require("../middlewares/auth.middleware");
/**
 * @swagger
 * tags:
 *   name: UserCourse
 *   description: Quản lý khóa học người dúng
 */

/**
/**
 * @swagger
 * /api/user-course/getUserCourses:
 *   get:
 *     summary: Lấy tất cả khóa học của người dùng
 *     tags: [UserCourse]
 *     responses:
 *       200:
 *         description: Danh sách điểm danh của user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get(
  "/getUserCourses",
  authMiddleware,
  UserCourseController.getUserCourses
);

module.exports = router;
