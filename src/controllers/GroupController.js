const {
  mapCreateGroupToVModel,
  mapEditGroupToVModel,
  mapGetDetailsGroupToVModel,
} = require("../mappings/GroupMapping");
const GroupService = require("../services/GroupService");
const { uploadToCloudinary } = require("../services/UploadService");
const { formatResponse } = require("../utils/responseHelper");

const GroupController = {
  async createGroup(req, res) {
    try {
      if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, "english-app");
        req.body.image_url = result.secure_url;
      }
      const newGroup = await GroupService.createGroup(req.body);
      res.status(201).json(mapCreateGroupToVModel(newGroup));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async editGroup(req, res) {
    try {
      const { id } = req.params;
      if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, "english-app");
        req.body.image_url = result.secure_url;
      }
      const editGroup = await GroupService.editGroup(id, req.body);
      res.status(200).json(mapEditGroupToVModel(editGroup));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getDetailsGroup(req, res) {
    try {
      const { id } = req.params;
      const group = await GroupService.getDetailsGroup(id);
      res.status(200).json(mapGetDetailsGroupToVModel(group));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getMonthlyGroupSummary(req, res) {
    try {
      const groups = await GroupService.getMonthlyGroupSummary();
      res.json(formatResponse(true, groups));
    } catch (err) {
      res.status(500).json({
        Success: false,
        Data: null,
        Message: "Internal Server Error",
      });
    }
  },
};

module.exports = GroupController;
