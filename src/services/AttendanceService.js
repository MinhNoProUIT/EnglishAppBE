const { PrismaClient } = require("../generated/prisma"); // hoặc '@prisma/client' nếu dùng mặc định
const prisma = new PrismaClient();

const AttendanceService = {
  async getAllAttendance() {
    return await prisma.attendance.findMany();
  },

  async getAllUserAttendance(user_id) {
    return await prisma.attendance.findMany({
      where: { user_id: user_id },
    });
  },

  async createAttendance(data) {
    return await prisma.attendance.create({ data });
  },

  async deleteAttendance(id) {
    return await prisma.attendance.delete({
      where: { id },
    });
  },

  async getMonthlyAttendanceSummary() {
    const now = new Date();

    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const currentMonthUsers = await prisma.attendance.groupBy({
      by: ["user_id"],
      where: {
        created_date: {
          gte: startOfCurrentMonth,
          lt: startOfNextMonth,
        },
      },
    });
    const currentMonthCount = currentMonthUsers.length;

    // Lấy tổng số user đã điểm danh tháng trước
    const prevMonthUsers = await prisma.attendance.groupBy({
      by: ["user_id"],
      where: {
        created_date: {
          gte: startOfPrevMonth,
          lt: startOfCurrentMonth,
        },
      },
    });
    const prevMonthCount = prevMonthUsers.length;

    // Tính phần trăm tăng giảm
    let changePercent = null;
    if (prevMonthCount === 0 && currentMonthCount > 0) {
      changePercent = 100; // tăng 100% từ 0
    } else if (prevMonthCount === 0 && currentMonthCount === 0) {
      changePercent = 0; // không thay đổi
    } else {
      changePercent =
        ((currentMonthCount - prevMonthCount) / prevMonthCount) * 100;
    }

    return {
      currentMonthCount: currentMonthCount,
      changePercent: Number(changePercent.toFixed(2)),
    };
  },
};

module.exports = AttendanceService;
