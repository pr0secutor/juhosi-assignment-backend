const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { db } = require("../database");
const { AppError, generateToken, Success } = require("../utils");

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res.status(400).json(AppError("Invalid Input..."));
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (error, results) => {
      console.log(results);
      if (JSON.stringify(results) === "[]") {
        return res.status(404).json(AppError("User Not Found..."));
      }
      const passwordMatch = await bcrypt.compare(password, results[0].password);
      if (passwordMatch) {
        const token = generateToken(results[0].email);
        return res.status(200).json(Success("User Logged in...", token, {is_admin: results[0].is_admin, email: results[0].email}));
      }
      return res.status(401).json(AppError("Wrong Password..."));
    }
  );
};

const verifyJwt = (req, res, next) => {
  const token = req.headers["access-token"];
  if (!token) {
    return res.status(403).json(AppError("Token not provided..."));
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) return res.status(403).json(AppError("Token not verified..."));
      next();
    });
  }
};

const checkAuth = (req, res) => {
  return res.status(200).json(Success("User Authenticated..."));
};

module.exports = { login, checkAuth, verifyJwt };
