const express = require("express");
const router = express.Router();
const UserProgressController = require("../controllers/UserProgressController");

router.get("/getAllByCourse/:user_id/:course_id", UserProgressController.getAllUserProgressByCourse);
router.post("/create", UserProgressController.createUserProgress);
router.put("/update/:id", UserProgressController.updateUserProgress);
router.delete("/delete/:id", UserProgressController.deleteUserProgress);
router.get("/getUnlearnedWordsByCourse/:user_id/:course_id", UserProgressController.getUnlearnedWordsByCourse);
router.get("/getAllTodayRepeatWordsByCourse/:user_id/:course_id", UserProgressController.getAllTodayRepeatWordsByCourse);
router.get("/getCompletedWordsByCourse/:user_id/:course_id", UserProgressController.getCompletedWordsByCourse);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: UserProgress
 *   description: Các API quản lý từ vựng
 */

/**
 * @swagger
 * /api/user-progress/getAllByCourse/{user_id}/{course_id}:
 *   get:
 *     summary: Lấy tiến độ học của người dùng theo khóa học
 *     tags: [UserProgress]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: string
 *           format: uuid
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
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               word_id:
 *                 type: string
 *                 format: uuid
 *             example:
 *               user_id: 78c8f4ff-02f6-44dd-bfef-91a7e4b921ed
 *               word_id: 385d5054-2896-4b13-a34b-bf1f274a7ab2
 *     responses:
 *       201:
 *         description: Đã tạo tiến độ học thành công
 */

/**
 * @swagger
 * /api/user-progress/update/{id}:
 *   put:
 *     summary: Cập nhật tiến độ học của người dùng cho một từ vựng
 *     tags: [UserProgress]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID tiến độ học cần cập nhật
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
 * /api/user-progress/getUnlearnedWordsByCourse/{user_id}/{course_id}:
 *   get:
 *     summary: Lấy từ vựng mà người dùng chưa học trong khóa học
 *     tags: [UserProgress]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: string
 *           format: uuid
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
 * /api/user-progress/getAllTodayRepeatWordsByCourse/{user_id}/{course_id}:
 *   get:
 *     summary: Lấy từ vựng mà người dùng cần ôn tập hôm nay theo khóa học
 *     tags: [UserProgress]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: string
 *           format: uuid
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
 * /api/user-progress/getCompletedWordsByCourse/{user_id}/{course_id}:
 *   get:
 *     summary: Lấy từ vựng mà người dùng đã học xong theo khóa học
 *     tags: [UserProgress]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: string
 *           format: uuid
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