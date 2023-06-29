const express = require("express");
const connection = require("../connection");
const router = express.Router();
let date = new Date();
const jwt = require("jsonwebtoken");
//const nodemailer = require("nodemailer");  not working currently
require("dotenv").config();
var auth = require("../services/authentication");

router.post("/employeeSignup", (req, res) => {
  let user = req.body;
  query =
    "(SELECT name, email FROM business WHERE name = ? OR email = ?) UNION (SELECT name, email FROM manager WHERE name = ? OR email = ?)";
  connection.query(
    query,
    [user.name, user.email, user.name, user.email],
    (err, results) => {
      if (!err) {
        if (results.length <= 0) {
          query =
            "SELECT name, email, ssn FROM employee WHERE name = ? OR email = ? OR ssn = ?";
          connection.query(
            query,
            [user.name, user.email, user.ssn],
            (err, results) => {
              if (!err) {
                if (results.length <= 0) {
                  idNum =
                    String(date.getFullYear()) +
                    String(date.getMonth() + 1).padStart(2, "0") +
                    String(date.getDate()).padStart(2, "0");
                  let business = req.session.user.business.name;
                  query =
                    "INSERT INTO employee (idnum,business,name,address,phone,email,birth,ssn,password,citizenship, salary) VALUES ('" +
                    idNum +
                    "','" +
                    business +
                    "',?,?,?,?,?,?,?,?,?)";
                  connection.query(
                    query,
                    [
                      user.name,
                      user.address,
                      user.phone,
                      user.email,
                      user.birth,
                      user.ssn,
                      user.password,
                      user.citizenship,
                      user.salary,
                    ],
                    (err, results) => {
                      if (!err) {
                        return res
                          .status(200)
                          .json({ message: "Succesfully Registered!", idnum: results.insertId });
                      } else {
                        return res.status(500).json(err);
                      }
                    }
                  );
                } else {
                  return res.status(400).json({
                    message: "Employee name, ssn, and/or email already used!",
                  });
                }
              } else {
                return res.status(500).json(err);
              }
            }
          );
        } else {
          return res.status(400).json({
            message: "Employee name and/or email already used!",
          });
        }
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

router.post("/employeeClockingLookup", (req, res) => {
  let user = req.body;
  query = "SELECT idnum FROM employee WHERE idnum = ?";
  connection.query(query, [user.idnum], (err, results) => {
    if (!err) {
      if (results.length > 0) {
        let idnum = results[0].idnum;
        query =
          "SELECT idnum, clockin, clockout FROM clocking WHERE idnum = " +
          idnum +
          " AND clockout = '0000-00-00 00:00:00'";
        connection.query(query, (err, results) => {
          if (results == 0) {
            return res.status(200).json({
              message: "Clock In",
              clocked: false,
            });
          } else {
            return res.status(200).json({
              message: "Clock Out",
              clocked: true,
            });
          }
        });
      } else {
        return res.status(400).json({
          message: "Employee not found!",
        });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.post("/employeeClocking", (req, res) => {
  let user = req.body;
  let idnum = user.idnum;
  let clockedin = user.clockedin;
  if (!clockedin) {
    query =
      "INSERT INTO clocking (idnum, clockin) VALUES (" + idnum + ", now())";
    message = "Clocked In!";
  } else {
    query =
      "UPDATE clocking SET clockout= now(),hours= (((clockout - clockin)/60)/60) WHERE idnum= " +
      idnum +
      " AND clockout='0000-00-00 00:00:00'";
    message = "Clocked Out!";
  }

  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json({
        message: message,
      });
    } else {
      return res.status(500).json(err);
    }
  });
});

router.post("/employeeSendMessage", (req, res) => {
  let content = req.body;
  query = "SELECT idnum, name FROM employee where phone = ?";
  connection.query(query, [content.phone], (err, result) => {
    if (!err) {
      if (result.length == 1) {
        let idnum = result[0].idnum;
        let name = result[0].name;
        query =
          "INSERT INTO emessage (idnum, name, sender, message, date) VALUES (" +
          idnum +
          ",'" +
          name +
          "',?,?, now())";
        connection.query(
          query,
          [content.sender, content.message],
          (err, results) => {
            if (!err) {
              return res.status(200).json({
                message: "Message sent successfully!",
              });
            } else {
              return res.status(500).json(err);
            }
          }
        );
      } else {
        return res.status(400).json({
          message: "Employee not found!",
        });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.post("/employeeGetMessages", (req, res) => {
  let idnum = req.body.idnum;
  query =
    "SELECT sender, message, date from emessage where seen = 0 AND idnum = " + idnum;
  connection.query(query, (err, results) => {
    if (!err) {
      query = "UPDATE emessage SET seen = 1 where seen = 0 AND idnum = " + idnum;
      connection.query(query, (err, resp) => {
        if (!err) {
          return res.status(200).json(results);
        } else {
          return res.status(500).json(err);
        }
      });
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
