const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const QuizService = {
  async getAllQuizzesByUser(userId) {
    return await prisma.quizzes.findMany({
      where: {
        user_id: userId,
      },
      orderBy: { created_date: 'asc' }
    });
  },

  async createQuiz(data) {
    return await prisma.quizzes.create({
      data,
    });
  },

  async updateQuiz(id, data) {
    return await prisma.quizzes.update({
      where: { id },
      data,
    });
  },

  async deleteQuiz(id) {
    return await prisma.quizzes.delete({
      where: { id },
    });
  },
};

module.exports = QuizService;
