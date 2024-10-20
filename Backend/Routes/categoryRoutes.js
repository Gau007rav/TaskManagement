// routes/categoryRoutes.js
const express = require("express");
const {
  getCategories,
  createCategory,
  deleteCategory,
} = require("../Controllers/CategoryControllers");
const { protect } = require("../Middleware/authMiddleware");
const router = express.Router();

router.route("/categories").get(protect, getCategories);
router.route("/categories").post(protect, createCategory);
router.route("/categories/:id").delete(protect, deleteCategory);

module.exports = router;
