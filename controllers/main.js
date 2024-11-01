const jwt = require("jsonwebtoken");
require("dotenv").config();
const { BadRequest } = require("../errors/bad-request");

const login = async (req, res) => {
  const { username, password } = req.body;
  // mongoose validations
  // Joy

  // check in the controller
  if (!username || !password) {
    throw new BadRequest("Please provide email and password");
  }

  // just for demo, normally provided by DB
  const id = new Date().getDate();

  /*try to keep payload small better experience for user
    use a secret key as a long one for production */
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).send({ msg: "User created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: ` 🎉, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
