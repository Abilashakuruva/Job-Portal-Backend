

const jwt = require("jsonwebtoken");
const { User } = require("../models/User"); // Assuming you have a User model

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = await User.findByPk(decoded.id);

    if (!req.user) {
      return res.status(401).json({ message: "Invalid token or user not found." });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

module.exports = { authenticateUser, authorizeAdmin };

