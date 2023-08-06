const express = require("express");
const connection = require("../connection");
const router = express.Router();

require("dotenv").config();
let auth = require("../services/authentication");

/**
 * HTTP Request for login for admin.
 */
router.post("/login", (req, res) => {
  let input = req.body;
  let username = input.username;
  let password = input.password;
  let code = input.code;

  query =
    "SELECT username FROM admin WHERE username=? AND password=? AND code=?";
  connection.query(query, [username, password, code], (err, results) => {
    if (!err) {
      if (results.length == 1) {
        req.session.admin = true;
        return res.status(200).json({ message: "Login successful" });
      } else {
        return res.status(400).json({ message: "Incorrect Input!" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for inserting code needed for business signup.
 */
router.post("/createCode", auth.authenticateAdmin, (req, res) => {
  let code = req.body.code;
  query = "INSERT INTO admin values(null, null, ?)";
  connection.query(query, [code], (err, result) => {
    if (!err) {
      return res.status(200).json({ message: "Code Created" });
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for deleting code used for business signup.
 */
router.delete("/deleteCode/:code", auth.authenticateAdmin, (req, res) => {
  let code = req.params.code;
  query = "DELETE FROM admin WHERE code = ?";
  connection.query(query, [code], (err, result) => {
    if (!err) {
      return res.status(200).json({ message: "Code Deleted" });
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for getting business signup codes.
 */
router.get("/getCodes", auth.authenticateAdmin, (req, res) => {
  query = "SELECT code FROM admin WHERE username IS NULL AND password IS NULL";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for getting all current sessions.
 */
router.get("/getSessions", auth.authenticateAdmin, (req, res) => {
  query = "SELECT * FROM sessions";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for destroying a specific session.
 */
router.delete("/destroySession/:id", auth.authenticateAdmin, (req, res) => {
  let id = req.params.id;
  query = "DELETE FROM sessions WHERE session_id = ?";
  connection.query(query, [id], (err, result) => {
    if (!err) {
      return res.status(200).json({ message: "Session Destroyed!" });
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for clearing tables in the database.
 */
router.delete("/clearDatabase/:input", auth.authenticateAdmin, (req, res) => {
  let input = req.params.input;
  let query = "";
  switch (input) {
    case "3MonthMessages": //Clears all employee messages that are over 3 months old.
      query =
        "DELETE FROM emessage WHERE date < DATE_SUB(NOW(), INTERVAL 3 MONTH);";
      break;
    case "AllMessages": //Clears all employee messages.
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
  });
});

/**
 * HTTP Request to check if admin is logged in.
 */
router.get("/checkLogin", auth.authenticateAdmin, (req, res) => {
  return res.status(200).json({ message: "Admin Logged In" });
});

/**
 * HTTP Request to log out admin.
 */
router.get("/logout", auth.authenticateAdmin, (req, res) => {
  req.session.destroy();
  return res.status(200).json({ message: "Logged Out!" });
});

module.exports = router;
