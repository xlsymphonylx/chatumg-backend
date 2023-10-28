const express = require("express");
const router = express.Router();

// Import routes
const authRoutes = require("./authRoutes");
const chatRoutes = require("./chatRoutes");
const checkAuth = require("../middleware/auth");
// Use routes
router.use("/auth", authRoutes);
router.use("/", checkAuth.authenticate, chatRoutes);

module.exports = router;
