const { PrismaClient } = require("../generated/prisma"); // hoặc '@prisma/client' nếu dùng mặc định
const prisma = new PrismaClient();

const AttendanceService = {
  async getAllAttendance() {
    return await prisma.attendance.findMany({});
  },

  async getAllUserAttendance(id) {
    return await prisma.attendance.findMany({
      where: { id },
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

  async getMonthlyAttendance() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    let startMonthPrev = currentMonth - 1;
    let startYearPrev = currentYear;
    if (startMonthPrev < 0) {
      startMonthPrev += 12;
      startYearPrev -= 1;
    }

    const startDate = new Date(startYearPrev, startMonthPrev, 1);
    const endDate = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59);

    const attendance = await prisma.attendance.findMany({
      where: {
        checkin_date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        checkin_date: true,
      },
    });

    const counts = {};

    attendance.forEach(({ checkin_date }) => {
      const year = checkin_date.getFullYear();
      const month = checkin_date.getMonth();
      const key = `${year}-${month}`;
      counts[key] = (counts[key] || 0) + 1;
    });

    const currentKey = `${currentYear}-${currentMonth}`;
    let previousMonth = currentMonth - 1;
    let previousYear = currentYear;
    if (previousMonth === 0) {
      previousMonth = 11;
      previousYear -= 1;
    }
    const previousKey = `${previousYear}-${previousMonth}`;

    const currentCount = counts[currentKey] || 0;
    const previousCount = counts[previousKey] || 0;

    let changePercent;
    if (previousCount === 0) {
      changePercent = currentCount > 0 ? 100 : 0;
    } else {
      changePercent = ((currentCount - previousCount) / previousCount) * 100;
    }

    return {
      currentMonthCount: currentCount,
      changePercent: Number(changePercent.toFixed(2)),
    };
  },
};

module.exports = AttendanceService;
