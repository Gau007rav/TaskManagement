const Category = require("../Models/Category");

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user._id });
    console.log(categories);
    if (!categories.length) {
      return res.status(404).json({ message: "No categories found" });
    }

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create new category
const createCategory = async (req, res) => {
  const { name } = req.body;
  console.log(name);
  if (!name) {
    return res.status(400).json({ error: "Category name is required" });
  }

  try {
    const category = new Category({
      name,
      user: req.user._id,
    });

    const newCategory = await category.save();
    console.log("Category created:", newCategory);

    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  const { id } = req.params;

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
