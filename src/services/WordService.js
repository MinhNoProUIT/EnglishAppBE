const { tr } = require("translatte/languages");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const { translateToVietnamese } = require("../utils/translateutils");

const WordService = {
  async getAllWords() {
    return await prisma.words.findMany({
      orderBy: { englishname: "asc" },
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
      orderBy: { englishname: "asc" },
    });
  },
  async updateTable() {
    try {
      const words = await prisma.words.findMany();
      for (const word of words) {
        const translateText = await translateToVietnamese(word.englishname);

        await prisma.words.update({
          where: { id: word.id },
          data: { vietnamesename: translateText },
        });
      }
      console.log("All words have been updated successfully!");
    } catch (error) {
      console.error("Error updating words:", error.message);
    }
  },
};

module.exports = WordService;
