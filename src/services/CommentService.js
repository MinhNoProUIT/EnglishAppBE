const pool = require("../config/db");
const Comment = require("../models/Comment");

const CommentService = {
  async getAllCommentsByPost({ postId = null, sharedPostId = null }) {
    const result = await pool.query(
      `
      SELECT 
        c.*,
        u.username AS author_name,
        u.image_url AS author_image,
        up.username AS username_parent,
        ur.username AS username_root
      FROM comments c
      JOIN users u ON c.user_id = u.id
      LEFT JOIN comments cp ON c.parent_comment = cp.id
      LEFT JOIN users up ON cp.user_id = up.id
      LEFT JOIN comments cr ON c.root_comment = cr.id
      LEFT JOIN users ur ON cr.user_id = ur.id
      WHERE 
        ($1::uuid IS NULL OR c.post_id = $1)
        AND ($2::uuid IS NULL OR c.shared_post_id = $2)
      ORDER BY c.created_date ASC
      `,
      [postId, sharedPostId]
    );
  
    return result.rows;
  },
  
  async createComment(data) {
    const {
      post_id,
      user_id,
      react_count,
      content,
      parent_comment = null,
      root_comment = null,
      shared_post_id,
    } = data;

    const client = await pool.connect();

    try {
      await client.query("BEGIN");
      const result = await client.query(
        `INSERT INTO comments 
          (post_id, user_id, react_count, content, parent_comment, root_comment, shared_post_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [post_id, user_id, react_count, content, parent_comment, root_comment, shared_post_id]
      );

      if (shared_post_id) {
        await client.query(
          `UPDATE shared_post
           SET comment_count = COALESCE(comment_count, 0) + 1
           WHERE id = $1`,
          [shared_post_id]
        );
      } else {
        await client.query(
          `UPDATE posts
           SET comment_count = COALESCE(comment_count, 0) + 1
           WHERE id = $1`,
          [post_id]
        );
      }

      await client.query("COMMIT");
      return new Comment(result.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  async editComment(id, data) {
    const { content, react_count, parent_comment, root_comment } = data;

    const result = await pool.query(
      `UPDATE comments
       SET content = $1,
           react_count = $2,
           parent_comment = $3,
           root_comment = $4
       WHERE id = $5
       RETURNING *`,
      [content, react_count, parent_comment, root_comment, id]
    );

    return new Comment(result.rows[0]);
  },

  async deleteComment(id) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
  
      const commentResult = await client.query(
        `SELECT post_id, shared_post_id FROM comments WHERE id = $1`,
        [id]
      );
  
      if (commentResult.rows.length === 0) {
        throw new Error("Comment not found or already deleted");
      }
  
      const { post_id, shared_post_id } = commentResult.rows[0];

      await client.query(
        `UPDATE comments
         SET root_comment = NULL
         WHERE root_comment = $1`,
        [id]
      );
  
      const deleteResult = await client.query(
        `DELETE FROM comments WHERE id = $1 RETURNING *`,
        [id]
      );
  
      if (shared_post_id) {
        await client.query(
          `UPDATE shared_post
           SET comment_count = GREATEST(COALESCE(comment_count, 1) - 1, 0)
           WHERE id = $1`,
          [shared_post_id]
        );
      } else {
        await client.query(
          `UPDATE posts
           SET comment_count = GREATEST(COALESCE(comment_count, 1) - 1, 0)
           WHERE id = $1`,
          [post_id]
        );
      }
  
      await client.query("COMMIT");
      return deleteResult.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },
};

module.exports = CommentService;
