const {
  mapCreateMessageToVModel,
  mapGetAllMessagesInGroupToVModel,
} = require("../mappings/MessageMapping");
const MessageService = require("../services/MessageService");

const MessageController = {
  async sendMesage(req, res) {
    try {
      const newMessage = await MessageService.sendMessage(req.body);
      const io = req.app.get("io");
      io.to(newMessage.group_id).emit("receiveMessage", newMessage);
      res.status(201).json(mapCreateMessageToVModel(newMessage));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getAllMessageInGroup(req, res) {
    try {
      const { group_id } = req.params;
      const allMessages = await MessageService.getAllMessagesInGroup(group_id);
      res.status(200).json(allMessages.map(mapGetAllMessagesInGroupToVModel));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = MessageController;
