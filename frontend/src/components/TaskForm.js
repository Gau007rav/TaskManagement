import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "./context/AuthContext";

function TaskForm({ onTaskAdded }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); // category will store the category ID
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("Pending");
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext); // Accessing user from AuthContext

  // Fetch categories on mount
  console.log(user);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories",
          {
            headers: {
              Authorization: `Bearer ${user.token}`, // Assuming you have a token in your user object
            },
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Could not fetch categories");
      }
    };

    fetchCategories();
  }, []); // Fetch categories when user token changes

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const taskData = {
        name,
        description,
        category, // Category ID
        status,
      };
      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        taskData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Include the token for authentication
          },
        }
      );
      console.log(response.data, "task data is here"); // Logging the task data
      onTaskAdded(response.data); // Call the callback function to update the UI
      // Clear the form
      setName("");
      setDescription("");
      setCategory("");
      setStatus("Pending");
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Error adding task");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>

      {/* Task form */}
      <form onSubmit={handleSubmit}>
        {/* Task Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Task Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-4 py-2"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-4 py-2"
          ></textarea>
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)} // store the selected category's ID
            className="mt-1 block w-full border border-gray-300 rounded px-4 py-2"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
