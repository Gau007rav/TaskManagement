import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      let config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        config,
        {
          name,
          email,
          password,
        }
      );
      setMessage(response.data.message);
      setName("");
      setEmail("");
      setPassword("");
      localStorage.setItem("userInfo", JSON.stringify(response.data));
    } catch (error) {
      setMessage(error.message || "Error during signup");
    }
  };

  return (
    <>
      <Link to="/">Home</Link>
      <form onSubmit={handleSignup} className="bg-gray-100 p-4 rounded">
        <h2 className="text-2xl mb-4">Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block mb-2 p-2 border"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block mb-2 p-2 border"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block mb-2 p-2 border"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Sign Up
        </button>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </form>
    </>
  );
};

export default Signup;
