const pool = require("../config/db");
const Post = require("../models/Post");

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
  
    return result.rows.map(row => ({
      date: row.date,
      count: parseInt(row.count)
    }));
  }  
};

module.exports = PostService;
