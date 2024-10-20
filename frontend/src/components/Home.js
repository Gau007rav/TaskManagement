import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Signup or Login Here
      </h1>
      <div className="space-x-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Home;
