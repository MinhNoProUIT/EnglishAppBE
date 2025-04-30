const UserService = require("../services/UserService");
const { mapUserToVModel } = require("../mappings/UserMapping");

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

  async createUser(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(mapUserToVModel(user));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = UserController;
