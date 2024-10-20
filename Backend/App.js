// server.js
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./Routes/authRoutes");
const taskRoutes = require("./Routes/taskRoutes");
const categoryRoutes = require("./Routes/categoryRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
const db = require("./config/db.js");
db();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Routes
app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use("/api", categoryRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
