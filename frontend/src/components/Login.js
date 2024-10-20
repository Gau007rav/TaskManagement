import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";
const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setUser, user } = useContext(AuthContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.post(
        "http://localhost:5000/api/login",

        { email, password }
      );
      let result = response.data;
      console.log(result);

      setMessage(response);
      setAuthenticated(true);
      setUser(result);
      console.log(user);
      localStorage.setItem("userInfo", JSON.stringify(result));
      navigate("/tasks");
    } catch (error) {
      setMessage(error.message || "Login failed");
    }
  };

  return (
    <>
      <Link to="/">Home</Link>
      <form onSubmit={handleLogin} className="bg-gray-100 p-4 rounded">
        <h2 className="text-2xl mb-4">Login</h2>
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
          Login
        </button>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </form>
    </>
  );
};

export default Login;
