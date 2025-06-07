const {
  mapAddMemberToVModel,
  mapKickMemberToVModel,
  mapGetAllMemberInGroupToVModel,
  mapGetAllGroupsByUserToVModel,
} = require("../mappings/GroupMemberMapping");
const GroupMemberService = require("../services/GroupMemberService");

const GroupMemberController = {
  async addMember(req, res) {
    try {
      const newMember = await GroupMemberService.addMember(req.body);
      res.status(201).json(mapAddMemberToVModel(newMember));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async kickMember(req, res) {
    try {
      const { user_id, group_id } = req.params;
      const kickedMember = await GroupMemberService.kickMember(
        user_id,
        group_id
      );
      res.status(200).json(mapKickMemberToVModel(kickedMember));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async dishBand(req, res) {
    try {
      const { group_id } = req.params;
      const result = await GroupMemberService.dishBand(group_id);
      res.status(200).json({ message: "Group disbanded successfully", group: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getAllMemberInGroup(req, res) {
    try {
      const { group_id } = req.params;
      const members = await GroupMemberService.getAllMemberInGroup(group_id);
      res.status(200).json(members.map(mapGetAllMemberInGroupToVModel));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getAllGroupByUser(req, res) {
    try {
      const { user_id } = req.params;
      const groups = await GroupMemberService.getAllGroupByUser(user_id);
      res.status(200).json(groups.map(mapGetAllGroupsByUserToVModel));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = GroupMemberController;
