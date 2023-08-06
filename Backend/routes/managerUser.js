const express = require("express");
const connection = require("../connection");
const router = express.Router();
require("dotenv").config();
var auth = require("../services/authentication");

/**
 * HTTP Request for manager login.
 */
router.post("/managerLogin", auth.authenticateBusiness, (req, res) => {
  let user = req.body;
  let businessid = req.session.user.business.idnum;
  /* Login info is same as business login. 
  Requiring idnum makes sure manager of business in session is logging in.*/
  query = "SELECT * FROM business where username=? AND password=? AND idnum = ?";
  connection.query(query, [user.username, user.password, businessid], (err, results) => {
    if (!err) {
      if (results.length == 1) {
        req.session.manager = true;
        return res.status(200).json({ message: "Login successful" });
      } else {
        return res
          .status(400)
          .json({ message: "Username and Password do not match!" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for checking if manager is logged in.
 */
router.get("/checkLogin", auth.authenticateManager, (req, res) => {
  return res.status(200).json({ message: "Manager of " + req.session.user.business.username});
});

/**
 * HTTP Request to logout manager.
 */
router.get("/logout", auth.authenticateManager, (req, res) => {
  req.session.manager = false;
  return res.status(200).json({ message: "Logged Out!" });
});

module.exports = router;
