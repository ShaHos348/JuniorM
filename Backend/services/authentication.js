require("dotenv").config();

function authenticateBusiness(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ message: "Bad" });
  }
  next();
}

function authenticateManager(req, res, next) {
  if (!req.session.manager) {
    return res.status(401).json({ message: "Bad" });
  }
  next();
}

function authenticateAdmin(req, res, next) {
  if (!req.session.admin) {
    return res.status(401).json({ message: "Bad" });
  }
  next();
}

module.exports = { authenticateBusiness: authenticateBusiness, authenticateManager: authenticateManager, authenticateAdmin: authenticateAdmin };
