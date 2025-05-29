const UserService = require("../services/UserService");
const {
  mapUserToVModel,
  mapUserInPostToVModel,
  mapTopFiveUserInPostToVModel,
} = require("../mappings/UserMapping");

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

  async getQuarterlyUserStats(req, res) {
    try {
      const stats = await UserService.getQuarterlyUserStats();
      res.json(stats);
    } catch (err) {
      console.error("Error in getQuarterlyUserStats:", err);
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

      const allUsers = await UserService.filterUsersInPost(
        keyword,
        limit,
        page,
        postRange
      );
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
  async updateUser(req, res) {
    try {
      const { id } = req.params;

      const userUpdateVModel = req.body;

      const updateUser = await UserService.updateUser(id, userUpdateVModel);
      res
        .status(200)
        .json({ message: "User updated successfully", data: updateUser });
    } catch (error) {
      console.error("Error in updateUser:", error);
      res.status(400).json({ message: error.message });
    }
  },

  async blockUser(req, res) {
    try {
      const { id } = req.params;

      const user = await UserService.blockUser(id);
      res
        .status(200)
        .json({ message: "user blocked successfully", data: user });
    } catch (err) {
      console.error("Error in block", err);
      res.status(400).json({ message: err.message });
    }
  },

  async removeUser(req, res) {
    try {
      const { id } = req.params;

      const user = await UserService.removeUser(id);
      res
        .status(200)
        .json({ message: "user removed successfully", data: user });
    } catch (err) {
      console.error("Error in remove user", err);
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = UserController;
