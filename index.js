const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

// Create an Express app and an HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server);

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Handle the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for cell changes and broadcast to others
  socket.on("cellChange", (changes) => {
    socket.broadcast.emit("cellUpdate", changes);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start the server
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
