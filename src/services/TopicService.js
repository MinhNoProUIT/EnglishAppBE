const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const TopicService = {
  async getAllTopics() {
    return await prisma.topics.findMany({
      orderBy: { name: 'asc' }
    });
  },

  async createTopic(data) {
    return await prisma.topics.create({
      data,
    });
  },

  async updateTopic(id, data) {
    return await prisma.topics.update({
      where: { id },
      data,
    });
  },
  
  async deleteTopic(id) {
    return await prisma.topics.delete({
      where: { id },
    });
  },
};

module.exports = TopicService;
