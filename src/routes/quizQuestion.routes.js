const express = require("express");
const router = express.Router();
const QuizQuestionController = require("../controllers/QuizQuestionController");

router.get("/getAllByQuiz/:id", QuizQuestionController.getAllQuizQuestionsByQuiz);
router.post("/create", QuizQuestionController.createQuizQuestion);
router.put("/update/:id", QuizQuestionController.updateQuizQuestion);
router.delete("/delete/:id", QuizQuestionController.deleteQuizQuestion);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: QuizQuestions
 *   description: Các API quản lý câu hỏi trong quiz
 */

/**
 * @swagger
 * /api/quiz-questions/getAllByQuiz/{id}:
 *   get:
 *     summary: Lấy danh sách tất cả câu hỏi theo quiz
 *     tags: [QuizQuestions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của quiz
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Danh sách câu hỏi trong quiz
 */

/**
 * @swagger
 * /api/quiz-questions/create:
 *   post:
 *     summary: Tạo câu hỏi mới
 *     tags: [QuizQuestions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quiz_id:
 *                 type: string
 *                 format: uuid
 *               question_text:
 *                 type: string
 *               options:
 *                 type: string[]
 *               correct_answer:
 *                 type: string
 *             example:
 *               quiz_id: 60e62a44-2e55-407a-9f4b-e3ebca712e1c
 *               question_text: Which word means the opposite of 'happy'?
 *               options: ["sad", "glad", "joyful", "excited"]
 *               correct_answer: "0"
 *     responses:
 *       201:
 *         description: Đã tạo câu hỏi thành công
 */

/**
 * @swagger
 * /api/quiz-questions/update/{id}:
 *   put:
 *     summary: Chỉnh sửa câu hỏi
 *     tags: [QuizQuestions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID câu hỏi cần chỉnh sửa
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
 *               question_text:
 *                 type: string
 *               options:
 *                 type: string[]
 *               correct_answer:
 *                 type: string
 *             example:
 *               question_text: Which word means the opposite of 'happy'?
 *               options: ["sad", "glad", "joyful", "excited"]
 *               correct_answer: "0"
 *     responses:
 *       200:
 *         description: Đã chỉnh sửa câu hỏi thành công
 */

/**
 * @swagger
 * /api/quiz-questions/delete/{id}:
 *   delete:
 *     summary: Xóa câu hỏi
 *     tags: [QuizQuestions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID câu hỏi cần xóa
 *     responses:
 *       200:
 *         description: Xóa câu hỏi thành công
 */
