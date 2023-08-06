const express = require("express");
const connection = require("../connection");
const router = express.Router();

require("dotenv").config();
let auth = require("../services/authentication");

/**
 * HTTP Request for registering business.
 */
router.post("/businessSignup", (req, res) => {
  let user = req.body;
  // Checks if name/email is already being used for an employee.
  query = "SELECT name,email FROM employee where name=? OR email=?";
  connection.query(query, [user.name, user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        // Checks if name/username/email is already being used for a business.
        query =
          "SELECT name,username,email from business where name=? OR username=? OR email=?";
        connection.query(
          query,
          [user.name, user.username, user.email],
          (err, results) => {
            if (!err) {
              if (results.length <= 0) {
                // Deletes code given for business signup.
                query = "DELETE FROM admin WHERE code = ?";
                connection.query(query, [user.code], (err, deleted) => {
                  if (!err) {
                    // Checks if a signup code was actually deleted.
                    if (deleted.affectedRows != 0) {
                      let lastIdNum = 20220001;
                      // Finds the next business id to be made.
                      query = "SELECT MAX(idnum) AS lastIdNum FROM business";
                      connection.query(query, (err, rows) => {
                        if (!err) {
                          if (rows[0].lastIdNum != null) {
                            lastIdNum = rows[0].lastIdNum + 1;
                          }
                          // Registers the business
                          query =
                            "INSERT INTO business (idnum,name,address,city,state,zipcode,country,phone,mobile,email,username,password) VALUES (" +
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
                                return res.status(200).json({
                                  message: "Succesfully Registered!",
                                });
                              } else {
                                return res.status(500).json(err);
                              }
                            }
                          );
                        }
                      });
                    } else {
                      return res
                        .status(400)
                        .json({ message: "Code is invalid!" });
                    }
                  } else {
                    return res.status(500).json(err);
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
      } else {
        return res.status(400).json({
          message: "Company name, username, and/or email already used!",
        });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for logging into business.
 */
router.post("/businessLogin", (req, res) => {
  let user = req.body;
  // Searches for business with username and password.
  query = "SELECT * FROM business where username=? AND password=?";
  connection.query(query, [user.username, user.password], (err, results) => {
    if (!err) {
      if (results.length == 1) {
        const user = {
          business: { idnum: results[0].idnum, username: results[0].username },
        };
        req.session.user = user; // Stores business id and username in session cookie upon login.
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
 * HTTP Request for getting business login information. 
 */

// TODO: Needs to be updated.
router.post("/businessForgotPassword", (req, res) => {
  let user = req.body;
  query =
    "SELECT username,password,email FROM business WHERE username=? OR email=?";
  connection.query(query, [user.username, user.email], (err, result) => {
    if (!err) {
      if (result.length == 1) {
        var response =
          "Email: " +
          result[0].email +
          "\n Username: " +
          result[0].username +
          "\n Password: " +
          result[0].password;
        return res.status(200).json(response);
      } else {
        return res.status(400).json({
          message:
            "This email/username is not associated with any business user!",
        });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for getting business information.
 */
router.get("/businessInfo", auth.authenticateBusiness, (req, res) => {
  businessidnum = req.session.user.business.idnum;
  // Finds all business information associated with business id in request session.
  query = "SELECT * FROM business WHERE idnum = ?";
  connection.query(query, [businessidnum], (err, result) => {
    if (!err) {
      return res.status(200).json(result[0]);
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for updating business information.
 */
router.patch("/updateInfo", auth.authenticateBusiness, (req, res) => {
  let user = req.body;
  businessidnum = req.session.user.business.idnum;
  // Updates all information for business id in this session.
  query =
    "UPDATE business SET name= ?, address= ?, city = ?, state = ?, zipcode = ?, country = ?, phone = ?, mobile = ?, email = ?, username = ?, password = ? WHERE idnum = ?";
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
      businessidnum,
    ],
    (err, result) => {
      if (!err) {
        return res.status(200).json({ message: "Business Info Updated!" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

/**
 * HTTP Request to check if business is logged in.
 */
router.get("/checkLogin", auth.authenticateBusiness, (req, res) => {
  return res.status(200).json({ message: req.session.user.business.username });
});

/**
 * HTTP Request to logout business.
 */
router.get("/logout", auth.authenticateBusiness, (req, res) => {
  req.session.destroy();
  return res.status(200).json({ message: "Logged Out!" });
});

module.exports = router;
