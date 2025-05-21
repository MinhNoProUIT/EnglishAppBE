const {
  mapCreateGroupToVModel,
  mapEditGroupToVModel,
} = require("../mappings/GroupMapping");
const GroupService = require("../services/GroupService");

const GroupController = {
  async createGroup(req, res) {
    try {
      const newGroup = await GroupService.createGroup(req.body);
      res.status(201).json(mapCreateGroupToVModel(newGroup));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async editGroup(req, res) {
    try {
      const { id } = req.params;
      const editGroup = await GroupService.editGroup(id, req.body);
      res.status(200).json(mapEditGroupToVModel(editGroup));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = GroupController;
