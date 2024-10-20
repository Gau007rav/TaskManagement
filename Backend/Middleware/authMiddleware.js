const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const protect = async (req, res, next) => {
  // Get token from Authorization header or cookies
  let token;

  // Check if token exists in Authorization header (Bearer token)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; // Extract the token after "Bearer"
  }
  // Check if token exists in cookies
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // If no token is found, return unauthorized error
  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token provided" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to the request object
    req.user = await User.findById(decoded.userId);

    // Proceed to the next middleware
    next();
  } catch (error) {
    res.status(401).json({ error: "Token is not valid" });
  }
};

module.exports = { protect };
