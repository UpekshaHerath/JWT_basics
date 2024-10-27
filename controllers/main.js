const customError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  // mongoose validations
  // Joy

  // check in the controller
  if (!username || !password) {
    throw new customError("Please provide email and password", 400);
  }

  // just for demo, normally provided by DB
  const id = new Date().getDate();

  // try to keep payload small better experience for user
  // use a secret key as a long one for production
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).send({ msg: "User created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello Upeksha`,
    secret: ` 🎉, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};