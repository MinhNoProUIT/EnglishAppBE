const UserService = require("../services/UserService");
const { mapUserToVModel, mapUserInPostToVModel, mapTopFiveUserInPostToVModel } = require("../mappings/UserMapping");

const UserController = {
  async getUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users.map(mapUserToVModel));
    } catch (err) {
      console.error("Error in getAllUsers:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getAllUsersInPost(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;

      const allUsers = await UserService.getAllUsersInPost(limit, page);
      const total = await UserService.getTotalUsers();

      res.json({
        data: allUsers.map(mapUserInPostToVModel),
        pagination: {
          total,
          page,
          limit,
        },
      });
    } catch (err) {
      console.error("Error in get all users in table post:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async filterUsersInPost(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const keyword = req.query.keyword || "";
      const postRange = req.query.postRange || "all"; 

      const allUsers = await UserService.filterUsersInPost(keyword, limit, page, postRange);
      const total = await UserService.countSearchUsers(keyword, postRange);
  
      res.json({
        data: allUsers.map(mapUserInPostToVModel),
        pagination: {
          total,
          page,
          limit,
        },
      });
    } catch (err) {
      console.error("Error in filter users:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  
  async createUser(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(mapUserToVModel(user));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getTopFiveUserInPost(req, res) {
    try {
      const users = await UserService.getTopFiveUsersInPost();
      res.json(users.map(mapTopFiveUserInPostToVModel));
    } catch (err) {
      console.error("Error in getAllUsers:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = UserController;
