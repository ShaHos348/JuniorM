const express = require("express");
const connection = require("../connection");
const router = express.Router();

const jwt = require("jsonwebtoken");
//const nodemailer = require("nodemailer");  not working currently
require("dotenv").config();
var auth = require("../services/authentication");

router.post("/managerLogin", (req, res) => {
  let user = req.body;
  let businessid = req.session.user.business.idnum;
  query = "SELECT * FROM business where username=? AND password=? AND idnum = ?";
  connection.query(query, [user.username, user.password, businessid], (err, results) => {
    if (!err) {
      if (results.length == 1) {
        /*const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, {
          expiresIn: "1h",
        });*/
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

router.get("/checkLogin", auth.authenticateManager, (req, res) => {
  return res.status(200).json({ message: "Manager of " + req.session.user.business.username});
});

router.get("/logout", auth.authenticateManager, (req, res) => {
  req.session.manager = false;
  return res.status(200).json({ message: "Logged Out!" });
});

/*var transporter = nodemailer.createTransport({ 
  service: 'gmail',
  auth:{
    user: process.env.EMAIL,
    pass: process.nextTick.PASSWORD
  }
}) */ // Not working currently

module.exports = router;
