const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, nex) {
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect("/login");
  const user = await getUser(userUid);

  if (!user) res.redirect("/login");

  req.user = user;
  nex();
}

async function checkAuth(req, res, nex) {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  req.user = user;
  nex();
}

module.exports = { restrictToLoggedinUserOnly, checkAuth };
