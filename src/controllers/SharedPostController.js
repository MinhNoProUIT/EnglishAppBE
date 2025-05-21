const {
  mapGetAllSharedPostToVModel,
  mapSharedPostCreateToVModel,
} = require("../mappings/SharedPostMapping");
const SharedPostService = require("../services/SharedPostService");

const SharedPostController = {
  async getAllSharedPost(req, res) {
    try {
      const allSharedPost = await SharedPostService.getAllSharedPost();
      res.json(allSharedPost.map(mapGetAllSharedPostToVModel));
    } catch (err) {
      console.error("Error in get all shared posts:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createSharedPost(req, res) {
    try {
      const newSharedPost = await SharedPostService.createSharedPost(req.body);
      res.status(201).json(mapSharedPostCreateToVModel(newSharedPost));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = SharedPostController;
