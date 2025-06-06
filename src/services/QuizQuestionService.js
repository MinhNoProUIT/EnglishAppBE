const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const QuizQuestionService = {
  async getAllQuizQuestionsByQuiz(quiz_id) {
    return await prisma.quiz_questions.findMany({
      where: {
        quiz_id: quiz_id,
      },
    });
  },

  async createQuizQuestion(data) {
    return await prisma.quiz_questions.create({
      data,
    });
  },

  async updateQuizQuestion(id, data) {
    return await prisma.quiz_questions.update({
      where: { id },
      data,
    });
  },

  async deleteQuizQuestion(id) {
    return await prisma.quiz_questions.delete({
      where: { id },
    });
  },
};

module.exports = QuizQuestionService;
