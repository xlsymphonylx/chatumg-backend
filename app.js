const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const http = require("http");
// Load environment variables from .env file
dotenv.config();

const app = express();
const sequelize = require("./config/database");
const models = require("./models");
const server = http.createServer(app);

// Sync models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

// Set up CORS
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Import routes
const routes = require("./routes");
const io = socketIo(server);
io.attach(server);
io.use((socket, next) => {
  next();
});
io.on("connection", (socket) => {
  socket.on("joinGroup", (groupId) => {
    socket.join(`group_${groupId}`);
  });
  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected.`);
  });
});

// Use routes
app.use("/", routes); // Assuming you want your API routes under /api

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
