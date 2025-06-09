const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const QuizService = {
  async getAllQuizzesByUser(userId) {
    const quizzes = await prisma.quizzes.findMany({
      where: {
        user_id: userId,
      },
      orderBy: { created_date: 'asc' },
      include: {
        _count: {
          select: {
            quiz_questions: true,
          },
        },
      },
    });

    // Map kết quả trả về thành đối tượng có `total_questions`
    return quizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.title,
      user_id: quiz.user_id,
      created_date: quiz.created_date,
      total_questions: quiz._count.quiz_questions,
    }));
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

  async createQuizWithQuestions(userId, title, questions) {
    return await prisma.$transaction(async (tx) => {
      const quiz = await tx.quizzes.create({
        data: {
          user_id: userId,
          title,
        },
      });

      const questionData = questions.map(q => ({
        quiz_id: quiz.id,
        question_text: q.question_text,
        options: q.options,
        correct_answer: q.correct_answer,
      }));

      await tx.quiz_questions.createMany({ data: questionData });

      return quiz;
    });
  },

  async updateQuizWithQuestions(quizId, title, questions) {
    // Cập nhật quiz
    await prisma.quizzes.update({
      where: { id: quizId },
      data: { title },
    });
    
    const oldQuestions = await prisma.quiz_questions.findMany({
      where: { quiz_id: quizId },
      select: { id: true },
    });
    const oldQuestionIds = oldQuestions.map(q => q.id);
    const newQuestionIds = questions.filter(q => q.id).map(q => q.id);
    const questionIdsToDelete = oldQuestionIds.filter(id => !newQuestionIds.includes(id));

    // Xóa các câu hỏi không còn tồn tại
    if (questionIdsToDelete.length > 0) {
      await prisma.quiz_questions.deleteMany({
        where: {
          id: { in: questionIdsToDelete },
        },
      });
    }

    for (const q of questions) {
      if (q.id) {
        // Câu hỏi cũ → cập nhật
        await prisma.quiz_questions.update({
          where: { id: q.id },
          data: {
            question_text: q.question_text,
            options: q.options,
            correct_answer: q.correct_answer,
          },
        });
      } else {
        // Câu hỏi mới → tạo
        await prisma.quiz_questions.create({
          data: {
            quiz_id: quizId,
            question_text: q.question_text,
            options: q.options,
            correct_answer: q.correct_answer,
          },
        });
      }
    }
  },

};

module.exports = QuizService;
