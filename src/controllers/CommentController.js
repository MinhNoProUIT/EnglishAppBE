const {
  mapGetAllCommentsByPostToVModel,
  mapCreateCommentsToVModel,
  mapEditCommentToVModel,
} = require("../mappings/CommentMapping");
const CommentService = require("../services/CommentService");

const CommentController = {
  async getAllCommentsByPost(req, res) {
    try {
      const { id, type } = req.params;

      if (!["post", "shared"].includes(type)) {
        return res
          .status(400)
          .json({ error: "Invalid type. Must be 'post' or 'shared'" });
      }
      const allComments = await CommentService.getAllCommentsByPost({
        postId: type === "post" ? id : null,
        sharedPostId: type === "shared" ? id : null,
      });
      res.json(allComments.map(mapGetAllCommentsByPostToVModel));
    } catch (err) {
      console.error("Error in get all comments by post:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createComment(req, res) {
    try {
      const newComment = await CommentService.createComment(req.body);
      res.status(201).json(mapCreateCommentsToVModel(newComment));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async editComment(req, res) {
    try {
      const { id } = req.params;
      const editComment = await CommentService.editComment(id, req.body);
      res.status(200).json(mapEditCommentToVModel(editComment));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async deleteComment(req, res) {
    try {
      const { id } = req.params;
      const deletedComment = await CommentService.deleteComment(id);
      res.status(200).json(deletedComment);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = CommentController;
