const express = require("express");
const connection = require("../connection");
const router = express.Router();

const jwt = require("jsonwebtoken");
//const nodemailer = require("nodemailer");  not working currently
require("dotenv").config();
var auth = require("../services/authentication");

router.post("/businessSignup", (req, res) => {
  let user = req.body;
  query =
    "SELECT name,username,email from businesslogin where name=? OR username=? OR email=?";
  connection.query(
    query,
    [user.name, user.username, user.email],
    (err, results) => {
      if (!err) {
        if (results.length <= 0) {
          let lastIdNum = 2023001;
          query = "SELECT MAX(idnum) AS lastIdNum FROM businesslogin";
          connection.query(query, (err, rows) => {
            if (!err) {
              lastIdNum = rows[0].lastIdNum + 1;
              query =
                "INSERT INTO businesslogin (idnum,name,address,city,state,zipcode,country,phone,mobile,email,username,password) VALUES (" +
                lastIdNum +
                ",?,?,?,?,?,?,?,?,?,?,?)";
              connection.query(
                query,
                [
                  user.name,
                  user.address,
                  user.city,
                  user.state,
                  user.zipcode,
                  user.country,
                  user.phone,
                  user.mobile,
                  user.email,
                  user.username,
                  user.password,
                ],
                (err, results) => {
                  if (!err) {
                    return res
                      .status(200)
                      .json({ message: "Succesfully Registered!" });
                  } else {
                    return res.status(500).json(err);
                  }
                }
              );
            }
          });
        } else {
          return res.status(400).json({
            message: "Company name, username, and/or email already used!",
          });
        }
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

router.post("/businessLogin", (req, res) => {
  let user = req.body;
  query = "SELECT * FROM businesslogin where username=? AND password=?";
  connection.query(query, [user.username, user.password], (err, results) => {
    if (!err) {
      if (results.length == 1) {
        const user = { business: results[0] };
        /*const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, {
          expiresIn: "1h",
        });*/
        req.session.user = user;
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

router.post("/businessForgotPassword", (req, res) => {
  let user = req.body;
  query = "SELECT username,password,email FROM businesslogin WHERE username=? OR email=?";
  connection.query(query, [user.username, user.email], (err, result) => {
    if (!err) {
      if (result.length == 1) {
        var response = "Email: " + result[0].email + "\n Username: " + result[0].username + "\n Password: " + result[0].password;
        return res.status(200).json( response );
        /*var mailOptions = {
          from: process.env.EMAIL,
          to: result[0].email,
          subject: "Username and Password for Junior Market LLC",
          html: '<p><b>Your username is</b>' + result[0].username + '<br><b>Your password is</b>'+result[0].password+'<br><a href="http://localhost:4200/">Click here to login</a></p>'
        };
        transporter.sendMail(mailOptions,function(error,info){
          if(!error){
            console.log('email sent: '+info.response);
          }
          else{
            console.log(error);
          }
        });
        return res.status(200).json({ message: "Email sent succesfully!" }); */ // Not working currently
      } else {
        return res
          .status(400)
          .json({
            message: "This email/username is not associated with any business user!",
          });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/checkLogin", auth.authenticateToken, (req, res) => {
  return res.status(200).json( {message: "Logged In!"});
})

router.get("/logout", auth.authenticateToken, (req, res) => {
  req.session.user = null;
  return res.status(200).json( {message: "Logged Out!"});
})

/*var transporter = nodemailer.createTransport({ 
  service: 'gmail',
  auth:{
    user: process.env.EMAIL,
    pass: process.nextTick.PASSWORD
  }
}) */ // Not working currently

module.exports = router;
