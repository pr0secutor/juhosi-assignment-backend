const jwt = require("jsonwebtoken");

const Success = (message, token, data) => {
  return {
    success: true,
    message,
    token,
    data: { ...data },
  };
};

const AppError = (type, message) => {
  return {
    success: false,
    error: {
      type,
      message,
    },
  };
};

const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { Success, AppError, generateToken };
