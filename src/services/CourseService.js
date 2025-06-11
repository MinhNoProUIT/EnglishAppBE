const pool = require("../config/db");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const CourseService = {
  async getAllCourses() {
    return await prisma.courses.findMany({
      orderBy: { created_date: "desc" },
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

  async getAllOngoingCoursesByUser(userId, checkIsPremiumUser) {
    let allowedCourseIds = [];

    if (!checkIsPremiumUser) {
      const userCourses = await prisma.user_courses.findMany({
        where: {
          user_id: userId,
        },
        select: {
          course_id: true,
        },
      });

      allowedCourseIds = userCourses.map((uc) => uc.course_id);
    }

    const courses = await prisma.courses.findMany({
      where: {
        ...(checkIsPremiumUser
          ? {}
          : {
              id: { in: allowedCourseIds },
            }),
        words: {
          some: {
            user_progress: {
              some: {
                user_id: userId,
              },
            },
          },
        },
      },
      include: {
        topics: {
          select: {
            name: true,
          },
        },
        words: {
          select: {
            user_progress: {
              where: { user_id: userId },
              select: { level: true },
            },
          },
        },
      },
    });

    const result = courses.map((course) => {
      const totalWords = course.words.length;
      let completedWords = 0;
      let remainWords = 0;
      let ongoingWords = 0;
      let progressScore = 0;

      for (const word of course.words) {
        const progress = word.user_progress[0];
        if (!progress) {
          remainWords++;
        } else {
          progressScore += progress.level;
          if (progress.level === 6) {
            completedWords++;
          } else {
            ongoingWords++;
          }
        }
      }

      return {
        id: course.id,
        title: course.title,
        totalWords,
        ongoingWords,
        completedWords,
        remainWords,
        progressScore,
        topic: course.topics.name,
        level: course.level,
        image: course.image_url,
      };
    });

    return result.filter(
      (course) =>
        course.ongoingWords !== 0 ||
        (course.remainWords !== 0 && course.completedWords !== 0)
    );
  },

  async getAllCompletedCoursesByUser(userId) {
    const courses = await prisma.courses.findMany({
      include: {
        topics: {
          select: {
            name: true,
          },
        },
        words: {
          select: {
            id: true,
            user_progress: {
              where: { user_id: userId },
              select: { level: true },
            },
          },
        },
      },
    });

    return courses
      .filter((course) => {
        const words = course.words;
        const totalWords = words.length;

        if (totalWords === 0) return false;

        const completedWords = words.filter(
          (word) =>
            word.user_progress.length === 1 && word.user_progress[0].level === 6
        ).length;

        return completedWords === totalWords;
      })
      .map((course) => ({
        id: course.id,
        title: course.title,
        totalWords: course.words.length,
        ongoingWords: 0,
        completedWords: course.words.length,
        remainWords: 0,
        progressScore: 6 * course.words.length,
        topic: course.topics.name,
        level: course.level,
        image: course.image_url,
      }));
  },
};

module.exports = CourseService;
