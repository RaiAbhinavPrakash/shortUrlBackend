const { v4: uuidv4 } = require("uuid");
const {setUser} = require('../service/auth')

const User = require("../models/userSchema");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.redirect("/login");
  }

  const token = setUser(user)
  res.cookie("uid", token)

  res.redirect("/");
}

module.exports = { handleUserSignup, handleUserLogin };
