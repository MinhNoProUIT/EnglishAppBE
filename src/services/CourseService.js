const pool = require("../config/db");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const CourseService = {
  async getAllCourses() {
    return await prisma.courses.findMany({
      orderBy: { title: 'asc' },
      include: {
        topics: {
          select: {
            name: true,
          },
        },
      },
    });
  },

  async getTotalCourses() {
    const result = await pool.query("SELECT COUNT(*) FROM courses");

    const currentMonthQuery = `
    SELECT COUNT(*) FROM courses
    WHERE DATE_TRUNC('month', created_date) = DATE_TRUNC('month', CURRENT_DATE)
  `;

    const previousMonthQuery = `
    SELECT COUNT(*) FROM courses
    WHERE DATE_TRUNC('month', created_date) = DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
  `;
    const currentResult = await pool.query(currentMonthQuery);
    const previousResult = await pool.query(previousMonthQuery);

    const currentCount = parseInt(currentResult.rows[0].count);
    const previousCount = parseInt(previousResult.rows[0].count);

    const rate =
      previousCount === 0
        ? null
        : ((currentCount - previousCount) / previousCount) * 100;
    return {
      total: parseInt(result.rows[0].count),
      rate: rate !== null ? Math.round(rate * 100) / 10 : null,
    };
  },

  async createCourse(data) {
    return await prisma.courses.create({
      data,
    });
  },

  async updateCourse(id, data) {
    return await prisma.courses.update({
      where: { id },
      data,
    });
  },

  async deleteCourse(id) {
    return await prisma.courses.delete({
      where: { id },
    });
  },
};

module.exports = CourseService;
