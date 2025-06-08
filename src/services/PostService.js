const pool = require("../config/db");
const Post = require("../models/Post");
const { PrismaClient } = require("../generated/prisma"); // hoặc '@prisma/client' nếu dùng mặc định
const prisma = new PrismaClient();
const PostService = {
  async getAllPosts(limit = 5, page = 1) {
    const offset = (page - 1) * limit;

    const result = await pool.query(
      `
      SELECT 
        posts.*, 
        users.username as author_name,
        users.image_url as author_image_url
      FROM posts
      JOIN users ON posts.user_id = users.id
      ORDER BY posts.created_date DESC
      LIMIT $1 OFFSET $2
    `,
      [limit, offset]
    );
    return result.rows;
  },

  async getTotalPosts() {
    const result = await pool.query("SELECT COUNT(*) FROM posts");

    const currentMonthQuery = `
    SELECT COUNT(*) FROM posts
    WHERE DATE_TRUNC('month', created_date) = DATE_TRUNC('month', CURRENT_DATE)
  `;

    const previousMonthQuery = `
    SELECT COUNT(*) FROM posts
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

  async createPost(data) {
    const {
      user_id,
      react_count = 0,
      content,
      image_url,
      shared_user_id_count = 0,
      comment_count = 0,
    } = data;

    const result = await pool.query(
      `INSERT INTO posts 
        (user_id, react_count, content, image_url, shared_user_id_count, comment_count)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        user_id,
        react_count,
        content,
        image_url,
        shared_user_id_count,
        comment_count,
      ]
    );

    return new Post(result.rows[0]);
  },

  async getDailyPostCount(days = 7) {
    const result = await pool.query(
      `
      WITH date_series AS (
        SELECT generate_series(
          CURRENT_DATE - INTERVAL '${days - 1} days',
          CURRENT_DATE,
          INTERVAL '1 day'
        )::date AS date
      )
      SELECT 
        TO_CHAR(ds.date, 'DD/MM/YYYY') AS date,
        COUNT(p.id) AS count
      FROM date_series ds
      LEFT JOIN posts p ON p.created_date::date = ds.date
      GROUP BY ds.date
      ORDER BY ds.date
      `
    );

    return result.rows.map((row) => ({
      date: row.date,
      count: parseInt(row.count),
    }));
  },

  async getMonthlyPostStats() {
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

    const posts = await prisma.posts.findMany({
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

    posts.forEach(({ created_date }) => {
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

  async getAllPostByUser(userId) {
    if (!userId) {
      throw new Error("userId is required");
    }
  
    const result = await pool.query(
      `
      SELECT 
        posts.*, 
        users.username AS author_name,
        users.image_url AS author_image_url
      FROM posts
      JOIN users ON posts.user_id = users.id
      WHERE posts.user_id = $1
      ORDER BY posts.created_date DESC
      `,
      [userId]
    );
    return result.rows;
  }
};

module.exports = PostService;
