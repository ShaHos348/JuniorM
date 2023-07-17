const express = require("express");
const connection = require("../connection");
const router = express.Router();
let date = new Date();
const jwt = require("jsonwebtoken");
require("dotenv").config();
var auth = require("../services/authentication");

router.post("/employeeSignup", (req, res) => {
  let user = req.body;
  query =
    "SELECT name, email FROM business WHERE name = ? OR email = ?";
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
                  let lastIdNum = 20210001;
                  query = "SELECT MAX(idnum) AS lastIdNum FROM employee";
                  connection.query(query, (err, rows) => {
                    if (!err) {
                      if (rows[0].lastIdNum != null) {
                        lastIdNum = rows[0].lastIdNum + 1;
                      }
                      let businessid = req.session.user.business.idnum;
                      query =
                        "INSERT INTO employee (idnum,businessid,name,address,phone,email,birth,ssn,password,citizenship, salary) VALUES ('" +
                        lastIdNum +
                        "','" +
                        businessid +
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
                              .json({ message: "Succesfully Registered!", idnum: lastIdNum });
                          } else {
                            return res.status(500).json(err);
                          }
                        }
                      );
                    } else {
                      return res.status(500).json(err);
                    }
                  });
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

router.post("/employeeUpdateInfo", (req, res) => {
  let user = req.body;
  query = "SELECT idnum FROM employee where idnum = ?";
  connection.query(query, [user.idnum], (err, result) => {
    if (!err) {
      if (result.length == 1) {
        query = "UPDATE employee SET name= ?, address= ?, phone= ?, email = ?,birth= ?, ssn= ?, password= ?, citizenship= ?, salary= ? WHERE idnum = ?";
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
            user.idnum
          ],
          (err, results) => {
            if (!err) {
              return res
                .status(200)
                .json({ message: "Succesfully Updated!" });
            } else {
              return res.status(500).json(err);
            }
          }
        );
      } else {
        return res.status(500).json({ message: "Employee Not Found!" });
      }
    } else {
      return res.status(500).json(err);
    }
  })
});

router.get("/employeeClockingLookup/:idnum&:password", (req, res) => {
  let idnum = req.params.idnum;
  let password = req.params.password;
  query = "SELECT idnum FROM employee WHERE idnum = ? AND password = ?";
  connection.query(query, [idnum, password], (err, results) => {
    if (!err) {
      if (results.length > 0) {
        let idnum = results[0].idnum;
        query =
          "SELECT idnum, clockin, clockout FROM clocking WHERE idnum = " +
          idnum +
          " AND clockout IS NULL";
        connection.query(query, (err, results) => {
          if (!err) {
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
          } else {
            return res.status(500).json(err);
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
      "UPDATE clocking SET clockout= now(), hours= (((TIMESTAMPDIFF(SECOND, clockin, clockout))/60)/60) WHERE idnum= " +
      idnum +
      " AND clockout IS NULL";
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

router.get("/getEmployeeClocking/:idnum", (req, res) => {
  let id = req.params.idnum;
  let businessid = req.session.user.business.idnum;
  query = "SELECT idnum from employee where businessid = ? AND idnum = ?";
  connection.query(query, [businessid, id], (err, result) => {
    if (!err) {
      if (result.length > 0) {
        query = "SELECT *, CONVERT_TZ(clockin,'+00:00',@@SESSION.time_zone) as clockin, CONVERT_TZ(clockout,'+00:00',@@SESSION.time_zone) as clockout FROM clocking WHERE idnum = ? AND clockout IS NOT NULL";
        connection.query(query, [id], (err, results) => {
          if (!err) {
            return res.status(200).json(results);
          } else {
            return res.status(500).json(err);
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

router.patch("/updateClocking", (req, res) => {
  let data = req.body;
  data.clockin = data.clockin.replace("T", " ");
  data.clockout = data.clockout.replace("T", " ");
  query = "UPDATE clocking SET clockin = ?, clockout = ?, hours = (((TIMESTAMPDIFF(SECOND, clockin, clockout))/60)/60) WHERE sl = '?'";
  connection.query(query, [data.clockin, data.clockout, data.sl], (err, result) => {
    if (!err) {
      return res.status(200).json({
        message: "Employee Clocking Updated!",
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

router.get("/employeeGetMessages/:idnum", (req, res) => {
  let idnum = req.params.idnum;
  query =
    "SELECT sender, message, CONVERT_TZ(date,'+00:00',@@SESSION.time_zone) as date from emessage where seen = 0 AND idnum = " + idnum;
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

router.get("/employeeGetPrevMessages/:idnum", (req, res) => {
  let idnum = req.params.idnum;
  let businessid = req.session.user.business.idnum;
  if (idnum == "00000000") {
    query = "SELECT *, CONVERT_TZ(date,'+00:00',@@SESSION.time_zone) as date from emessage WHERE idnum IN (SELECT idnum from employee where businessid = " + businessid + ")";
  } else {
    query = "SELECT *, CONVERT_TZ(date,'+00:00',@@SESSION.time_zone) as date from emessage WHERE idnum = " + idnum;
  }
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.post("/deleteMessages", (req, res) => {
  let data = req.body;
  query = "DELETE FROM emessage WHERE slno = ?";
  connection.query(
    query, [data.slno], (err, results) => {
      if (!err) {
        return res
          .status(200)
          .json({ message: "Succesfully Deleted!" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

router.get("/getEmployees", (req, res) => {
  let businessid = req.session.user.business.idnum;
  query = "SELECT * FROM employee where businessid = ?";
  connection.query(query, [businessid], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  })
})

router.post("/deleteEmployee", (req, res) => {
  let data = req.body;
  query = "SELECT idnum FROM employee where idnum = ?";
  connection.query(query, [data.idnum], (err, result) => {
    if (!err) {
      if (result.length == 1) {
        query = "DELETE FROM employee WHERE idnum = ?";
        connection.query(
          query, [data.idnum], (err, results) => {
            if (!err) {
              return res
                .status(200)
                .json({ message: "Succesfully Deleted!" });
            } else {
              return res.status(500).json(err);
            }
          }
        );
      } else {
        return res.status(500).json({ message: "Employee Not Found!" });
      }
    } else {
      return res.status(500).json(err);
    }
  })

});

module.exports = router;
