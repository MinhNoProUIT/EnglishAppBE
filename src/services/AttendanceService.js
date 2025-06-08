const { PrismaClient } = require("../generated/prisma"); // hoặc '@prisma/client' nếu dùng mặc định
const prisma = new PrismaClient();

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function getStartAndEndOfWeek() {
  const now = new Date();

  // Lấy ngày theo Asia/Ho_Chi_Minh (UTC+7)
  const tzOffset = -7 * 60;
  const localNow = new Date(now.getTime() + tzOffset * 60000);

  const dayOfWeek = localNow.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const diffToMonday = (dayOfWeek + 6) % 7;

  const monday = new Date(localNow);
  monday.setDate(localNow.getDate() - diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return { monday, sunday };
}

const AttendanceService = {
  async getAllAttendance() {
    return await prisma.attendance.findMany();
  },

  async getAllUserAttendance(user_id) {
    return await prisma.attendance.findMany({
      where: { user_id: user_id },
    });
  },

  async createAttendance(userId) {
    return await prisma.attendance.create({
      data: {
        user_id: userId, // Đảm bảo sử dụng đúng tên trường trong schema
      },
    });
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

  async getWeeklyAttendanceStatus(user_id) {
    const { monday, sunday } = getStartAndEndOfWeek();

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      weekDates.push(new Date(d));
    }

    const records = await prisma.attendance.findMany({
      where: {
        user_id,
        created_date: {
          gte: monday,
          lte: sunday,
        },
      },
      select: { created_date: true },
    });

    const attendedSet = new Set(
      records.map((r) =>
        new Date(r.created_date).toLocaleDateString("en-CA", {
          timeZone: "Asia/Ho_Chi_Minh",
        })
      )
    );

    // ✅ Trả về thứ tự từ Monday đến Sunday
    return weekDates.map((d, index) => {
      const dateStr = d.toLocaleDateString("en-CA", {
        timeZone: "Asia/Ho_Chi_Minh",
      });
      return {
        day: weekdays[index],
        date: dateStr,
        attended: attendedSet.has(dateStr),
      };
    });
  },
};

module.exports = AttendanceService;
