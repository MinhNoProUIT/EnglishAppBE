const pool = require("../config/db");
const SharedPost = require("../models/SharedPost");

const SharedPostService = {
  async getAllSharedPost() {
    const result = await pool.query(
      `
      SELECT 
        sp.id,
        p.user_id AS author_id,
        au.username AS author_name,
        au.image_url AS author_image_url,
        sp.user_id AS user_shared_id,
        us.username AS user_shared_name,
        us.image_url AS user_shared_image_url,
        sp.react_count,
        sp.comment_count,
        sp.shared_count,
        sp.content,
        sp.created_date,
        p.image_url
      FROM shared_post sp
      JOIN posts p ON sp.post_id = p.id
      JOIN users au ON p.user_id = au.id           
      JOIN users us ON sp.user_id = us.id 
      ORDER BY sp.created_date DESC
      `,
    );
  
    return result.rows;
  },

  async createSharedPost(data) {
    const {
      post_id,
      user_id,
      shared_post_id,
      react_count = 0,
      comment_count = 0,
      shared_count = 0,
      content,
    } = data;

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const result = await client.query(
        `INSERT INTO shared_post (post_id, user_id, shared_post_id, react_count, comment_count, shared_count, content)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [
          post_id,
          user_id,
          shared_post_id,
          react_count,
          comment_count,
          shared_count,
          content,
        ]
      );

      if (shared_post_id) {
        await client.query(
          `UPDATE shared_post
           SET shared_count = COALESCE(shared_count, 0) + 1
           WHERE id = $1`,
          [shared_post_id]
        );
      } else {
        await client.query(
          `UPDATE posts
           SET shared_user_id_count = COALESCE(shared_user_id_count, 0) + 1
           WHERE id = $1`,
          [post_id]
        );
      }
      await client.query("COMMIT");
      return new SharedPost(result.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },
};

module.exports = SharedPostService;
