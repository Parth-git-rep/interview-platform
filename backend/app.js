const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
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

server.listen(3001, () => {
    console.log("Server is running on port 3001");
});