const express = require("express");
const connection = require("../connection");
const router = express.Router();

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
              console.log(rows);
              lastIdNum = rows[0].lastIdNum + 1;
              console.log(lastIdNum);
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

module.exports = router;
