const PostService = require("../services/PostService");
const {
  mapGetAllPostsToVModel,
  mapCreatePostToVModel,
  mapGetTotalPostsToVModel,
  mapToPostDataChartVModel,
} = require("../mappings/PostMapping");

const PostController = {
  async getAllPosts(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;

      const allPosts = await PostService.getAllPosts(limit, page);
      const total = (await PostService.getTotalPosts()).total;

      res.json({
        data: allPosts.map(mapGetAllPostsToVModel),
        pagination: {
          total,
          page,
          limit,
        },
      });
    } catch (err) {
      console.error("Error in get all posts:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getTotalPosts(req, res) {
    try {
      const result = await PostService.getTotalPosts();
      res.json(mapGetTotalPostsToVModel(result));
    } catch (err) {
      console.error("Error in get total posts:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  
  async createPost(req, res) {
    try {
      const newPost = await PostService.createPost(req.body);
      res.status(201).json(mapCreatePostToVModel(newPost));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getPostChartData(req, res) {
    try {
      const days = parseInt(req.query.days) || 7;
      const rawData = await PostService.getDailyPostCount(days);
      const viewModelData = mapToPostDataChartVModel(rawData);
      res.json(viewModelData);
    } catch (error) {
      console.error("Error getting post chart data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

};

module.exports = PostController;
