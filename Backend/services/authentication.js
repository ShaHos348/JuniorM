require("dotenv").config();

/**
 * Checks if business is signed in.
 *
 * @param {*} req Contains session data
 * @param {*} res
 * @param {*} next Allows for HTTP request to proceed
 * @returns
 */
function authenticateBusiness(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not Authenticated!" });
  }
  next();
}

/**
 * Checks if manager is signed in.
 *
 * @param {*} req Contains session data
 * @param {*} res
 * @param {*} next Allows for HTTP request to proceed
 * @returns
 */
function authenticateManager(req, res, next) {
  if (!req.session.manager) {
    return res.status(401).json({ message: "Not Authenticated!" });
  }
  next();
}

/**
 * Checks if admin is signed in.
 *
 * @param {*} req Contains session data
 * @param {*} res
 * @param {*} next Allows for HTTP request to proceed
 * @returns
 */
function authenticateAdmin(req, res, next) {
  if (!req.session.admin) {
    return res.status(401).json({ message: "Not Authenticated!" });
  }
  next();
}

module.exports = {
  authenticateBusiness: authenticateBusiness,
  authenticateManager: authenticateManager,
  authenticateAdmin: authenticateAdmin,
};
