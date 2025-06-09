const {
  mapCreateReactCommentToVModel,
  mapGetAllReactCommentsByPostToVModel,
} = require("../mappings/ReactCommentMapping");
const ReactCommentService = require("../services/ReactCommentService");

const ReactCommentController = {
  async getAllReactCommentsByPost(req, res) {
    try {
      const { id } = req.params;
      const allReactComments =
        await ReactCommentService.getAllReactCommentsByPost(id);
      res.json(allReactComments.map(mapGetAllReactCommentsByPostToVModel));
    } catch (err) {
      console.error("Error in get all react comments by post:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createReactComment(req, res) {
    try {
      const newReactComment = await ReactCommentService.createReactComment(
        req.body
      );
      res.status(201).json(mapCreateReactCommentToVModel(newReactComment));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async deleteReactComment(req, res) {
    try {
      const { user_id, comment_id } = req.params;
      const deletedReactComment = await ReactCommentService.deleteReactComment(
        user_id,
        comment_id
      );
      res.status(200).json(deletedReactComment);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async checkLikeComment(req, res) {
    try {
      const { user_id, comment_id } = req.params;
      const isLike = await ReactCommentService.checkLike(user_id, comment_id);
      res.status(200).json({isLike});
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = ReactCommentController;
