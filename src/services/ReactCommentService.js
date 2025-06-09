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
    const { comment_id, user_id } = data;
  
    const client = await pool.connect();
  
    try {
      await client.query('BEGIN');

      const result = await client.query(
        `INSERT INTO react_comments 
          (comment_id, user_id)
         VALUES ($1, $2)
         RETURNING *`,
        [comment_id, user_id]
      );
  
      await client.query(
        `UPDATE comments 
         SET react_count = COALESCE(react_count, 0) + 1 
         WHERE id = $1`,
        [comment_id]
      );
  
      await client.query('COMMIT');
      return new ReactComment(result.rows[0]);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  async deleteReactComment(user_id, comment_id) {
    const client = await pool.connect();
  
    try {
      await client.query('BEGIN');

      const result = await client.query(
        `DELETE FROM react_comments 
         WHERE comment_id = $1 AND user_id = $2
         RETURNING comment_id`,
        [comment_id, user_id]
      );
  
      if (result.rows.length === 0) {
        throw new Error("React comment not found or already deleted");
      }

      await client.query(
        `UPDATE comments 
         SET react_count = GREATEST(COALESCE(react_count, 1) - 1, 0)
         WHERE id = $1`,
        [comment_id]
      );
  
      await client.query('COMMIT');
      return { comment_id };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  async checkLike(user_id, comment_id) {
    const result = await pool.query(
      `SELECT id FROM react_comments WHERE user_id = $1 AND comment_id = $2`,
      [user_id, comment_id]
    );
    return result.rows.length > 0;
  }
};

module.exports = ReactCommentService;
