const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");



const app = express();


app.use(cors());
app.use(express.json());

const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

  socket.on("join room", (roomName) => {
    socket.join(roomName);
    socket.roomName = roomName;
    console.log("User joined room:", roomName);
  });

  socket.on("text update", (text) => {
    socket.to(socket.roomName).emit("text update", text);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});