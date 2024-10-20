const Task = require("../Models/Task");

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).populate("category");
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: "Error fetching tasks" });
  }
};

// Create a new task
const createTask = async (req, res) => {
  const { name, description, category } = req.body;

  // Ensure that required fields are present
  if (!name) {
    return res.status(400).json({ error: "Task name is required" });
  }

  try {
    const task = new Task({
      name,
      description,
      category, // Category is directly from req.body
      user: req.user._id, // Assuming req.user is set by authentication middleware
    });

    await task.save();
    return res.status(201).json(task);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Error creating task" });
  }
};

// Update task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, description, status, category } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { name, description, status, category },
      { new: true }
    );

    // Check if the task was found
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ error: "Error updating task" });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });

    // Check if the task was found and deleted
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting task" });
  }
};

// Export the functions
module.exports = { deleteTask, updateTask, createTask, getTasks };
