const { PrismaClient } = require("../generated/prisma"); // hoặc '@prisma/client' nếu dùng mặc định
const prisma = new PrismaClient();

const UserPackageService = {
  async getAllUserPackage() {
    return await prisma.user_packages.findMany();
  },

  async createUserPackage(userId, package_id) {
    return await prisma.user_packages.create({
      data: {
        user_id: userId,
        package_id,
      },
    });
  },
};
module.exports = UserPackageService;
