const pool = require("../config/db");
const Comment = require("../models/Comment");

const CommentService = {
  async getAllCommentsByPost(postId) {
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
      WHERE c.post_id = $1
      ORDER BY c.created_date ASC
      `,
      [postId]
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
    } = data;

    const result = await pool.query(
      `INSERT INTO comments 
        (post_id, user_id, react_count, content, parent_comment, root_comment)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [post_id, user_id, react_count, content, parent_comment, root_comment]
    );

    return new Comment(result.rows[0]);
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
    const result = await pool.query(
      `DELETE FROM comments WHERE id = $1 RETURNING *`,
      [id]
    );
  
    if (result.rows.length === 0) {
      throw new Error("Comment not found or already deleted");
    }
    return result.rows[0];
  }
};

module.exports = CommentService;
