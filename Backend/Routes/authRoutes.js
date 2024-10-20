// routes/authRoutes.js
const express = require("express");
const { signup, login, logout } = require("../Controllers/AuthControllers");
const router = express.Router();

// Handle user signup (React frontend will display the form)
router.post("/signup", signup);

// Handle user login (React frontend will display the form)
router.post("/login", login);

// Handle user logout
router.post("/logout", logout);

module.exports = router;
