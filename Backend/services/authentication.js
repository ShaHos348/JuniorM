require("dotenv").config();

function authenticateToken(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ message: "Bad" });
  }
  next();
}
module.exports = { authenticateToken: authenticateToken };
