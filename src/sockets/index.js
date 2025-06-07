const MessageService = require("../services/MessageService")

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("joinGroup", (groupId) => {
      socket.join(groupId);
      console.log(`Socket ${socket.id} joined group ${groupId}`);
    });

    socket.on("leaveGroup", (groupId) => {
      socket.leave(groupId);
      console.log(`Socket ${socket.id} left group ${groupId}`);
    });

    // Lấy tất cả tin nhắn trong group từ DB
    socket.on("getAllMessages", async (groupId, callback) => {
      try {
        const messages = await MessageService.getAllMessagesInGroup(groupId);
        if (callback) callback(messages); 
      } catch (error) {
        console.error("Error getting messages:", error);
        if (callback) callback({ error: "Failed to get messages." });
      }
    });

    // Gửi tin nhắn và phát đến group
    socket.on("sendMessage", async (data) => {
      const savedMessage = await MessageService.sendMessage({
        sender_id: data.senderId,
        group_id: data.groupId,
        content: data.content,
      });
    
      // Gửi lại cho tất cả trong group
      io.to(data.groupId).emit("newMessage", savedMessage);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
