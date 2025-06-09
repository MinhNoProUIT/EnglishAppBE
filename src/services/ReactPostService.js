const pool = require("../config/db");
const ReactPost = require("../models/ReactPost");

const ReactPostService = {
  async getTotalReactPost(postId) {
    const result = await pool.query(
      `
      SELECT 
        COUNT(user_id) AS react_count
      FROM react_posts
      WHERE post_id = $1
      `,
      [postId]
    );

    return result.rows[0];
  },

  async createReactPost(data) {
    const { post_id, user_id } = data;

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const result = await client.query(
        `INSERT INTO react_posts (post_id, user_id)
         VALUES ($1, $2)
         RETURNING *`,
        [post_id, user_id]
      );

      await client.query(
        `UPDATE posts
         SET react_count = COALESCE(react_count, 0) + 1
         WHERE id = $1`,
        [post_id]
      );

      await client.query("COMMIT");
      return new ReactPost(result.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  async deleteReactPost(id) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const result = await client.query(
        `DELETE FROM react_posts WHERE id = $1 RETURNING *`,
        [id]
      );

      if (result.rows.length === 0) {
        throw new Error("React post not found or already deleted");
      }

      const { post_id } = result.rows[0];

      await client.query(
        `UPDATE posts
         SET react_count = GREATEST(COALESCE(react_count, 0) - 1, 0)
         WHERE id = $1`,
        [post_id]
      );

      await client.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  async checkLike(user_id, post_id) {
    const result = await pool.query(
      `SELECT id FROM react_posts WHERE user_id = $1 AND post_id = $2`,
      [user_id, post_id]
    );
    return result.rows.length > 0;
  }
};

module.exports = ReactPostService;
