// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userInfo.token);
    setUser(userInfo);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, tasks, setTasks, categories, setCategories }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
