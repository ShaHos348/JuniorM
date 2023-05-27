require("dotenv").config();

function authenticateToken(req, res, next) {
  if (req.session == null) return res.sendStatus(401);
  next();
}
module.exports = { authenticateToken: authenticateToken };
