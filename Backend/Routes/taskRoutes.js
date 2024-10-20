// routes/taskRoutes.js
const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../Controllers/TaskControllers");
const { protect } = require("../Middleware/authMiddleware");
const router = express.Router();

router.route("/tasks").get(protect, getTasks);
router.route("/tasks").post(protect, createTask);
router.route("/tasks/:id").put(protect, updateTask);
router.route("/tasks/:id").delete(protect, deleteTask);

module.exports = router;
