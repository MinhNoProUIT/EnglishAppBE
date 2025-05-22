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

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
