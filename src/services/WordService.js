const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const WordService = {
  async getAllWords() {
    return await prisma.words.findMany({
      orderBy: { englishname: 'asc' },
      include: {
        courses: {
          select: {
            title: true,
          },
        },
      },
    });
  },

  async createWord(data) {
    return await prisma.words.create({
      data,
    });
  },

  async updateWord(id, data) {
    return await prisma.words.update({
      where: { id },
      data,
    });
  },

  async deleteWord(id) {
    return await prisma.words.delete({
      where: { id },
    });
  },

  async getAllWordsByCourse(courseId) {
    return await prisma.words.findMany({
      where: { course_id: courseId },
      orderBy: { englishname: 'asc' },
    });
  },

};

module.exports = WordService;
