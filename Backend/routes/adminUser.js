const express = require("express");
const connection = require("../connection");
const router = express.Router();

const jwt = require("jsonwebtoken");
require("dotenv").config();
var auth = require("../services/authentication");

router.post("/login", (req, res) => {
  let input = req.body;
  let username = input.username;
  let password = input.password;
  let code = input.code;

  query = "SELECT username FROM admin WHERE username=? AND password=? AND code=?";
  connection.query(query, [username, password, code], (err, results) => {
    if (!err) {
      if (results.length == 1) {
        req.session.admin = true;
        return res.status(200).json({ message: "Login successful" });
      } else {
        return res
          .status(400)
          .json({ message: "Incorrect Input!" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.post("/createCode", (req, res) => {
  let code = req.body.code;
  query = "INSERT INTO admin values(null, null, ?)";
  connection.query(query, [code], (err, result) => {
    if (!err) {
      return res.status(200).json({ message: "Code Created" });
    } else {
      return res.status(500).json(err);
    }
  })
});

router.delete("/deleteCode/:code", (req, res) => {
  let code = req.params.code;
  query = "DELETE FROM admin WHERE code = ?";
  connection.query(query, [code], (err, result) => {
    if (!err) {
      return res.status(200).json({ message: "Code Deleted" });
    } else {
      return res.status(500).json(err);
    }
  })
});

router.get("/getCodes", (req, res) => {
  query = "SELECT code FROM admin WHERE username IS NULL AND password IS NULL";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/getSessions", (req, res) => {
  query = "SELECT * FROM sessions";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.delete("/destroySession/:id", (req, res) => {
  let id = req.params.id;
  query = "DELETE FROM sessions WHERE session_id = ?";
  connection.query(query, [id], (err, result) => {
    if (!err) {
      return res.status(200).json({ message: "Session Destroyed!" });
    } else {
      return res.status(500).json(err);
    }
  })
});

router.delete("/clearDatabase/:input", (req, res) => {
  let input = req.params.input;
  let query = "SELECT code FROM admin WHERE username = 'ahsbfhwkkchajw'";
  switch (input) {
    case "3MonthMessages":
      query = "DELETE FROM emessage WHERE date < DATE_SUB(NOW(), INTERVAL 3 MONTH);";
      break;
    case "AllMessages":
      query = "DELETE FROM emessage WHERE 1=1";
      break;
    default:
      break;
  }
  connection.query(query, (err, result) => {
    if (!err) {
      return res.status(200).json({ message: "Clearing Done!" });
    } else {
      return res.status(500).json(err);
    }
  })
});

router.get("/checkLogin", auth.authenticateAdmin, (req, res) => {
  return res.status(200).json({ message: "Admin" });
});

router.get("/logout", auth.authenticateAdmin, (req, res) => {
  req.session.destroy();
  return res.status(200).json({ message: "Logged Out!" });
});

module.exports = router;
