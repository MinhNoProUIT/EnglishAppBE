const pool = require("../config/db");
const ReactComment = require("../models/ReactComment");

const ReactCommentService = {
  async getAllReactCommentsByPost(postId) {
    const result = await pool.query(
      `
      SELECT 
        c.id AS comment_id,
        COUNT(r.user_id) AS react_count
      FROM comments c
      JOIN react_comments r ON c.id = r.comment_id
      WHERE c.post_id = $1
      GROUP BY c.id
      ORDER BY MAX(c.created_date) ASC
      `,
      [postId]
    );
  
    return result.rows;
  },
  
  async createReactComment(data) {
    const {
      comment_id,
      user_id,
    } = data;

    const result = await pool.query(
      `INSERT INTO react_comments 
        (comment_id, user_id)
       VALUES ($1, $2)
       RETURNING *`,
      [comment_id, user_id]
    );

    return new ReactComment(result.rows[0]);
  },

  async deleteReactComment(id) {
    const result = await pool.query(
      `DELETE FROM react_comments WHERE id = $1 RETURNING *`,
      [id]
    );
  
    if (result.rows.length === 0) {
      throw new Error("React comment not found or already deleted");
    }
    return result.rows[0];
  }
};

module.exports = ReactCommentService;
