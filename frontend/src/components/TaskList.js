import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "./context/AuthContext";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext); // Accessing user from AuthContext

  // Fetch tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks", {
          headers: {
            Authorization: `Bearer ${user.token}`, // Include the token for authentication
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Could not fetch tasks");
      }
    };

    fetchTasks();
  }, []); // Fetch tasks when user token changes

  // Update task status
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        { status: newStatus }, // Update status only
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Include the token for authentication
          },
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: response.data.status } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
      setError("Could not update task status");
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div key={task._id} className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold">{task.name}</h3>
            <p className="text-gray-700">{task.description}</p>
            <p>Category: {task.category?.name || "Uncategorized"}</p>
            <p>Status: {task.status}</p>
            <div className="mt-4">
              <button
                onClick={() => updateTaskStatus(task._id, "In Progress")}
                className={`mr-2 py-1 px-3 rounded ${
                  task.status === "In Progress"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => updateTaskStatus(task._id, "Completed")}
                className={`py-1 px-3 rounded ${
                  task.status === "Completed"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                Complete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
