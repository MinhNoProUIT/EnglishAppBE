const { PrismaClient } = require("../generated/prisma"); // hoặc '@prisma/client' nếu dùng mặc định
const prisma = new PrismaClient();

const UserAbuseReportService = {
  async getMonthlyUserAbuseReportSummary() {
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

    const user_abuse_reports = await prisma.user_abuse_reports.findMany({
      where: {
        created_date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        created_date: true,
      },
    });

    const counts = {};

    user_abuse_reports.forEach(({ created_date }) => {
      const year = created_date.getFullYear();
      const month = created_date.getMonth();
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

  async getAllUserAbuseReport(limit = 5, page = 1) {
    const offset = (page - 1) * limit;

    const [reports, total] = await Promise.all([
      prisma.user_abuse_reports.findMany({
        skip: offset,
        take: limit,
        orderBy: { created_date: "desc" },
        include: {
          users: {
            select: {
              username: true,
              image_url: true,
            },
          },
        },
      }),
      prisma.user_abuse_reports.count(),
    ]);

    return { reports, total };
  },

  async createUserAbuseReport(data) {
    return await prisma.user_abuse_reports.create({
      data,
    });
  },

  async deleteUserAbuseReport(id) {
    return await prisma.user_abuse_reports.delete({
      where: { id },
    });
  },
};

module.exports = UserAbuseReportService;
