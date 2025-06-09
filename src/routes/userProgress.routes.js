const express = require("express");
const router = express.Router();
const UserProgressController = require("../controllers/UserProgressController");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/getAllByCourse/:course_id", authMiddleware, UserProgressController.getAllUserProgressByCourse);
router.post("/create", authMiddleware, UserProgressController.createUserProgress);
router.put("/update/:word_id", authMiddleware, UserProgressController.updateUserProgress);
router.delete("/delete/:id", UserProgressController.deleteUserProgress);
router.get("/getUnlearnedWordsByCourse/:course_id", authMiddleware, UserProgressController.getUnlearnedWordsByCourse);
router.get("/getAllTodayRepeatWordsByCourse/:course_id", authMiddleware, UserProgressController.getAllTodayRepeatWordsByCourse);
router.get("/getNumberTodayRepeatWordsByCourse/:course_id", authMiddleware, UserProgressController.getNumberTodayRepeatWordsByCourse);
router.get("/getCompletedWordsByCourse/:course_id", authMiddleware, UserProgressController.getCompletedWordsByCourse);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: UserProgress
 *   description: Các API quản lý tiến độ học
 */

/**
 * @swagger
 * /api/user-progress/getAllByCourse/{course_id}:
 *   get:
 *     summary: Lấy tiến độ học của người dùng theo khóa học
 *     tags: [UserProgress]
 *     parameters:
 *       - in: path
 *         name: course_id
 *         required: true
 *         description: ID của khóa học
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Danh sách tiến độ học của người dùng theo khóa học
 */

/**
 * @swagger
 * /api/user-progress/create:
 *   post:
 *     summary: Tạo tiến độ học mới
 *     tags: [UserProgress]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               word_id:
 *                 type: string
 *                 format: uuid
 *             example:
 *               word_id: 385d5054-2896-4b13-a34b-bf1f274a7ab2
 *     responses:
 *       201:
 *         description: Đã tạo tiến độ học thành công
 */

/**
 * @swagger
 * /api/user-progress/update/{word_id}:
 *   put:
 *     summary: Cập nhật tiến độ học của người dùng cho một từ vựng
 *     tags: [UserProgress]
 *     parameters:
 *       - in: path
 *         name: word_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID từ vựng cần cập nhật tiến độ học
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isCorrect:
 *                 type: boolean
 *               isRetry:
 *                 type: boolean
 *             example:
 *               isCorrect: true
 *               isRetry: false
 *     responses:
 *       200:
 *         description: Đã cập nhật tiến độ học thành công
 */

/**
 * @swagger
 * /api/user-progress/delete/{id}:
 *   delete:
 *     summary: Xóa tiến độ học
 *     tags: [UserProgress]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID tiến độ học cần xóa
 *     responses:
 *       200:
 *         description: Xóa tiến độ học thành công
 */

/**
 * @swagger
 * /api/user-progress/getUnlearnedWordsByCourse/{course_id}:
 *   get:
 *     summary: Lấy từ vựng mà người dùng chưa học trong khóa học
 *     tags: [UserProgress]
 *     parameters:
 *       - in: path
 *         name: course_id
 *         required: true
 *         description: ID của khóa học
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Danh sách từ vựng mà người dùng chưa học trong khóa học
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/**
 * @swagger
 * /api/user-progress/getAllTodayRepeatWordsByCourse/{course_id}:
 *   get:
 *     summary: Lấy từ vựng mà người dùng cần ôn tập hôm nay theo khóa học
 *     tags: [UserProgress]
 *     parameters:
 *       - in: path
 *         name: course_id
 *         required: true
 *         description: ID của khóa học
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Danh sách từ vựng mà người dùng cần ôn tập hôm nay theo khóa học
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/**
 * @swagger
 * /api/user-progress/getNumberTodayRepeatWordsByCourse/{course_id}:
 *   get:
 *     summary: Lấy số lượng từ vựng mà người dùng cần ôn tập hôm nay theo khóa học
 *     tags: [UserProgress]
 *     parameters:
 *       - in: path
 *         name: course_id
 *         required: true
 *         description: ID của khóa học
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Số từ vựng mà người dùng cần ôn tập hôm nay theo khóa học
 */

/**
 * @swagger
 * /api/user-progress/getCompletedWordsByCourse/{course_id}:
 *   get:
 *     summary: Lấy từ vựng mà người dùng đã học xong theo khóa học
 *     tags: [UserProgress]
 *     parameters:
 *       - in: path
 *         name: course_id
 *         required: true
 *         description: ID của khóa học
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Danh sách từ vựng mà người dùng đã học xong theo khóa học
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */