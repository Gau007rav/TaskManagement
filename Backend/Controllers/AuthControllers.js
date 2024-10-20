// controllers/authController.js
const User = require("../Models/User");
const jwt = require("jsonwebtoken");

// Signup
signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please enter all details");
  }
  let existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(400);
    throw new Error("user already exist");
  }
  try {
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json(error.message + "user will not create");
  }
};

// Login
login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true });
    console.log(token);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      password: user.password,
      pic: user.pic,
      token: token,
    });
  } catch (error) {
    res.status(400).json({ error: "Error logging in" });
  }
};

// Logout
logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

module.exports = { signup, login, logout };
