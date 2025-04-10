const { Server } = require("socket.io");

const io = new Server(4000, {
  cors: {
    origin: "*", // allow local dev
  },
});

console.log("Socket.io server running on port 4000");

io.on("connection", (socket) => {
  console.log("client connected");

  socket.on("appointment:created", (appointment) => {
    //console.log(data);
    socket.broadcast.emit("appointment:created", appointment);
  });

  socket.on("appointment:deleted", () => {
    //console.log(data);
    socket.broadcast.emit("appointment:deleted");
  });

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});
