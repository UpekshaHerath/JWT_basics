require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new customError("JWT token is required", 401);
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (err) {
    throw new customError(
      "Invalid token, Not authorized to access this route",
      401
    );
  }
};

module.exports = authenticationMiddleware;
