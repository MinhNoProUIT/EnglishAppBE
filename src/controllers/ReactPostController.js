const {
  mapGetTotalReactPostToVModel,
  mapCreateReactPostoVModel,
} = require("../mappings/ReactPostMapping");
const ReactPostService = require("../services/ReactPostService");

const ReactPostController = {
  async getTotalReactPost(req, res) {
    try {
      const { id } = req.params;
      const totalReactPost = await ReactPostService.getTotalReactPost(id);
      res.json(mapGetTotalReactPostToVModel(totalReactPost));
    } catch (err) {
      console.error("Error in get total react posts:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createReactPost(req, res) {
    try {
      const newReactPost = await ReactPostService.createReactPost(req.body);
      res.status(201).json(mapCreateReactPostoVModel(newReactPost));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async deleteReactPost(req, res) {
    try {
      const { user_id, post_id } = req.params;
      const deletedReactPost = await ReactPostService.deleteReactPost(user_id, post_id);
      res.status(200).json(deletedReactPost);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async checkLikePost(req, res) {
    try {
      const { user_id, post_id } = req.params;
      const isLike = await ReactPostService.checkLike(user_id, post_id);
      res.status(200).json({isLike});
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = ReactPostController;
