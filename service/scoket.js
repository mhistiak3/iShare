const socketIO = require("socket.io");
const { files } = require("../db");

let io = null;
exports.initIO = (server) => {
  io = socketIO(server);
  //   connected
  io.on("connection", (socket) => {
    const userId = socket.id;
    console.log("New user is connected: " + userId);
    io.emit("updateFileList",files)
    //   disconnected
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

exports.io = () => io;
