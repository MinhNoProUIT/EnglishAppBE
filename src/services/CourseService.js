const pool = require("../config/db");
const Course = require("../models/Course");

const CourseService = {
  async getAllCourses() {
    const result = await pool.query(
      `
      SELECT * FROM courses
    `
    );
    return result.rows;
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
    const { title, topic_id, level, description, image_url, price } = data;

    const result = await pool.query(
      `INSERT INTO courses 
        (title, topic_id, level, description, image_url, price)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, topic_id, level, description, image_url, price]
    );

    return new Course(result.rows[0]);
  },
};

module.exports = CourseService;
