const Category = require("../Models/Category");
const mongoose = require("mongoose");

// Get all categories
const getCategories = async (req, res) => {
  try {
    const userId = req.query.userId; // ✅ Read userId from query params
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const categories = await Category.find({ user: userId });
    console.log(categories);
    if (!categories.length) {
      return res.status(404).json({ message: "No categories found" });
    }

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// Create new category
const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!req.user || !req.user._id) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  if (!name) {
    return res.status(400).json({ error: "Category name is required" });
  }

  try {
    const category = new Category({ name, user: req.user._id });
    const newCategory = await category.save();

    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  if (!req.user || !req.user._id) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid category ID" });
  }

  try {
    const category = await Category.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getCategories, createCategory, deleteCategory };
