const jwt = require("jsonwebtoken");

const secret = "$s$e$c$r$e$t$";
function setUser(user) {
  const payload = {
    id: user._id,
    email: user.email,
  };
  return jwt.sign(payload, secret);
}

function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, secret);
}

module.exports = { setUser, getUser };
