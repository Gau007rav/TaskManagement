import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "./context/AuthContext";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

const TaskForm = ({ onTaskAdded }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("Pending");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!user?.token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/categories?userId=${user.id}`, // ✅ Sending user.id as a query parameter
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        console.log(response.data, "from category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Could not fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [user?.token, user?.id]); // ✅ Added dependencies

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !category) {
      setError("Task name and category are required!");
      return;
    }

    try {
      const taskData = { name, description, category, status };
      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        taskData,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      onTaskAdded(response.data);
      setName("");
      setDescription("");
      setCategory("");
      setStatus("Pending");
    } catch (error) {
      setError("Error adding task");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-700 to-purple-700 text-white p-4 shadow-md flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          GK
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/tasks" className="hover:underline">
              Tasks
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:underline">
              About
            </Link>
          </li>
        </ul>
      </nav>

      {/* Carousel Section */}
      <div className="mt-6 max-w-4xl mx-auto">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="rounded-xl shadow-xl overflow-hidden"
        >
          {[
            "https://www.ecpgurgaon.org/wp-content/uploads/2023/07/CA-Foundation-Course-CA-Foundation-program-Chartered-Accountancy-Foundation-course-CA-Foundation-syllabus-CA-Foundation-exams.png",
            "https://render.fineartamerica.com/images/rendered/default/poster/8/4.5/break/images/artworkimages/medium/3/ca-foundation-course-studybytech.jpg",
            "https://caportal.saginfotech.com/wp-content/uploads/2020/06/CA-Foundation-2020.jpg",
          ].map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-64 object-cover rounded-xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Task Form Section */}
      <motion.div
        className="max-w-lg mx-auto mt-8 p-6 bg-white/80 backdrop-blur-md shadow-xl rounded-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Add New Task
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Task Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-gray-300 rounded-lg p-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-gray-300 rounded-lg p-2"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border-gray-300 rounded-lg p-2"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            {loading ? (
              <p className="text-gray-500">Loading categories...</p>
            ) : (
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border-gray-300 rounded-lg p-2"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600"
          >
            Add Task
          </motion.button>
        </form>
      </motion.div>

      {/* Footer */}
      <footer className="mt-10 p-6 bg-gray-200 text-center text-gray-600">
        <p>
          &copy; {new Date().getFullYear()} GK Task Manager. All Rights
          Reserved.
        </p>
      </footer>
    </div>
  );
};

export default TaskForm;
