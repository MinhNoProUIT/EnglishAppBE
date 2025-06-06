const express = require("express");
const router = express.Router();
const QuizController = require("../controllers/QuizController");

router.get("/getAllByUser/:id", QuizController.getAllQuizzesByUser);
router.post("/create", QuizController.createQuiz);
router.put("/update/:id", QuizController.updateQuiz);
router.delete("/delete/:id", QuizController.deleteQuiz);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Quizzes
 *   description: Các API quản lý quiz
 */

/**
 * @swagger
 * /api/quizzes/getAllByUser/{id}:
 *   get:
 *     summary: Lấy danh sách tất cả quiz theo người dùng
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Danh sách quiz của người dùng
 */

/**
 * @swagger
 * /api/quizzes/create:
 *   post:
 *     summary: Tạo quiz mới
 *     tags: [Quizzes]
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
 *               title:
 *                 type: string
 *             example:
 *               user_id: 78c8f4ff-02f6-44dd-bfef-91a7e4b921ed
 *               title: English Quiz 1 
 *     responses:
 *       201:
 *         description: Đã tạo quiz thành công
 */

/**
 * @swagger
 * /api/quizzes/update/{id}:
 *   put:
 *     summary: Chỉnh sửa quiz
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID quiz cần chỉnh sửa
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *             example:
 *               title: English Quiz 1 
 *     responses:
 *       200:
 *         description: Đã chỉnh sửa quiz thành công
 */

/**
 * @swagger
 * /api/quizzes/delete/{id}:
 *   delete:
 *     summary: Xóa quiz
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID quiz cần xóa
 *     responses:
 *       200:
 *         description: Xóa quiz thành công
 */
