const { PrismaClient } = require("../generated/prisma"); // hoặc '@prisma/client' nếu dùng mặc định
const prisma = new PrismaClient();

const UserPackage = {
  async getAllUserPackage() {
    return await prisma.user_packages.findMany();
  },

  async createAttendance(userId, package_id) {
    return await prisma.attendance.create({
      data: {
        user_id: userId,
        package_id,
      },
    });
  },
};
module.exports = UserPackage;
