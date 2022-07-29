const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  allowEIO3: true, // false by default
});

//this is for future use of socket.io to communicate with the client side

io.on("connection", (socket) => {
  console.log("connected to client");
  io.emit("event-frontend");
});

module.exports = {
  app,
  server,
};
