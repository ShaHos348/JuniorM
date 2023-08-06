const express = require("express");
const connection = require("../connection");
const router = express.Router();
require("dotenv").config();
var auth = require("../services/authentication");

/**
 * HTTP Request for registering employee for business.
 */
router.post("/employeeSignup", auth.authenticateManager, (req, res) => {
  let user = req.body;
  // Checks if name/email/phone is already being used for a business.
  query =
    "SELECT name, email FROM business WHERE name = ? OR email = ? OR phone = ? OR mobile = ?";
  connection.query(
    query,
    [user.name, user.email, user.phone, user.mobile],
    (err, results) => {
      if (!err) {
        if (results.length <= 0) {
          // Checks if name/email/ssn/phone is already being used for an employee.
          query =
            "SELECT name, email, ssn, phone FROM employee WHERE name = ? OR email = ? OR ssn = ? OR phone = ?";
          connection.query(
            query,
            [user.name, user.email, user.ssn, user.phone],
            (err, results) => {
              if (!err) {
                if (results.length <= 0) {
                  let lastIdNum = 20210001;
                  // Finds the next employee id to be made.
                  query = "SELECT MAX(idnum) AS lastIdNum FROM employee";
                  connection.query(query, (err, rows) => {
                    if (!err) {
                      if (rows[0].lastIdNum != null) {
                        lastIdNum = rows[0].lastIdNum + 1;
                      }
                      let businessid = req.session.user.business.idnum;
                      if (user.ssn == "") {
                        user.ssn = null;
                      }
                      // Registers the employee for given business.
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
                            return res.status(200).json({
                              message: "Succesfully Registered!",
                              idnum: lastIdNum,
                            });
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
                    message:
                      "Employee name, ssn, phone, and/or email already used!",
                  });
                }
              } else {
                return res.status(500).json(err);
              }
            }
          );
        } else {
          return res.status(400).json({
            message: "Employee name, email, and/or phone already used!",
          });
        }
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

/**
 * HTTP Request for updating employee information.
 */
router.post("/employeeUpdateInfo", auth.authenticateManager, (req, res) => {
  let user = req.body;
  // Finds if employee id exists.
  query = "SELECT idnum FROM employee where idnum = ?";
  connection.query(query, [user.idnum], (err, result) => {
    if (!err) {
      if (result.length == 1) {
        // Updates all information for employee with given id.
        query =
          "UPDATE employee SET name= ?, address= ?, phone= ?, email = ?,birth= ?, ssn= ?, password= ?, citizenship= ?, salary= ? WHERE idnum = ?";
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
            user.idnum,
          ],
          (err, results) => {
            if (!err) {
              return res.status(200).json({ message: "Succesfully Updated!" });
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
  });
});

/**
 * HTTP Request for checking if employee needs to clock in or clockout.
 */
router.get("/employeeClockingLookup/:idnum&:password", auth.authenticateBusiness, (req, res) => {
  let idnum = req.params.idnum;
  let password = req.params.password;
  // Checks if employee exists.
  query = "SELECT idnum FROM employee WHERE idnum = ? AND password = ?";
  connection.query(query, [idnum, password], (err, results) => {
    if (!err) {
      if (results.length > 0) {
        let idnum = results[0].idnum;
        // Finds if employee is clocked in.
        query =
          "SELECT idnum, clockin, clockout FROM clocking WHERE idnum = " +
          idnum +
          " AND clockout IS NULL";
        connection.query(query, (err, results) => {
          if (!err) {
            // Checks if employee needs to clock in or clockout.
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

/**
 * HTTP Request for clocking in/out employee.
 */
router.post("/employeeClocking", auth.authenticateBusiness, (req, res) => {
  let user = req.body;
  let idnum = user.idnum;
  let clockedin = user.clockedin;
  // Checks if employee needs to clock in or clockout.
  if (!clockedin) {
    query = "INSERT INTO clocking (idnum, clockin) VALUES (?, now())";
    message = "Clocked In!";
  } else {
    query =
      "UPDATE clocking SET clockout= now(), hours= (((TIMESTAMPDIFF(SECOND, clockin, clockout))/60)/60) WHERE idnum= ? AND clockout IS NULL";
    message = "Clocked Out!";
  }

  connection.query(query, [idnum], (err, results) => {
    if (!err) {
      return res.status(200).json({
        message: message,
      });
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for getting employee clockin data.
 */
router.get("/getEmployeeClocking/:idnum", auth.authenticateManager, (req, res) => {
  let id = req.params.idnum;
  let businessid = req.session.user.business.idnum;
  // Finds employee in business.
  query = "SELECT idnum from employee where businessid = ? AND idnum = ?";
  connection.query(query, [businessid, id], (err, result) => {
    if (!err) {
      if (result.length > 0) {
        // Selects all the times employee clocked in.
        // TODO: Need to adjust get data from selected date range
        query =
          "SELECT *, CONVERT_TZ(clockin,'+00:00',@@SESSION.time_zone) as clockin, CONVERT_TZ(clockout,'+00:00',@@SESSION.time_zone) as clockout FROM clocking WHERE idnum = ? AND clockout IS NOT NULL";
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

/**
 * HTTP request to update employee clockin.
 */
router.patch("/updateClocking", auth.authenticateManager, (req, res) => {
  let data = req.body;
  data.clockin = data.clockin.replace("T", " ");
  data.clockout = data.clockout.replace("T", " ");
  // Updates clockin, clockout, and hours for given serial.
  query =
    "UPDATE clocking SET clockin = ?, clockout = ?, hours = (((TIMESTAMPDIFF(SECOND, clockin, clockout))/60)/60) WHERE sl = '?'";
  connection.query(
    query,
    [data.clockin, data.clockout, data.sl],
    (err, result) => {
      if (!err) {
        return res.status(200).json({
          message: "Employee Clocking Updated!",
        });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

/**
 * HTTP Request for getting employee hours for one week pay.
 */
router.get("/employeePay/:date", auth.authenticateManager, (req, res) => {
  let startDate = req.params.date;
  let businessid = req.session.user.business.idnum;
  // Selects all employees in the business.
  query = "SELECT idnum, name, salary FROM employee WHERE businessid = ?";
  connection.query(query, [businessid], (err, employees) => {
    if (!err) {
      if (employees.length != 0) {
        // Selects all hours worked by each employee in given week.
        query =
          "SELECT idnum, SUM(hours) AS hours, Date(CONVERT_TZ(clockin,'+00:00',@@SESSION.time_zone)) as clockedin FROM clocking WHERE ((clockin BETWEEN ? AND ? + interval 7 day) AND idnum IN (SELECT idnum FROM employee WHERE businessid = ?)) GROUP BY clockedin, idnum ORDER BY idnum, clockedin";
        connection.query(
          query,
          [startDate, startDate, businessid],
          (err, results) => {
            if (!err) {
              if (results.length != 0) {
                return res
                  .status(200)
                  .json({ employees: employees, clockins: results });
              } else {
                return res.status(400).json({
                  message: "No Employees Clocked In this week!",
                });
              }
            } else {
              return res.status(500).json(err);
            }
          }
        );
      } else {
        return res.status(400).json({
          message: "You have no employees!",
        });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for sending message to employee during clocking.
 */
router.post("/employeeSendMessage", auth.authenticateBusiness, (req, res) => {
  let content = req.body;
  // Finds employee with given phone number.
  query = "SELECT idnum, name FROM employee where phone = ?";
  connection.query(query, [content.phone], (err, result) => {
    if (!err) {
      if (result.length == 1) {
        let idnum = result[0].idnum;
        let name = result[0].name;
        // Sends message to employee.
        query =
          "INSERT INTO emessage (idnum, name, sender, message, date) VALUES (?,?,?,?, now())";
        connection.query(
          query,
          [idnum, name, content.sender, content.message],
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

/**
 * HTTP Request for getting messages for employee.
 */
router.get("/employeeGetMessages/:idnum", auth.authenticateBusiness, (req, res) => {
  let idnum = req.params.idnum;

  // Finds all messages not yet viewed by employee.
  query =
    "SELECT sender, message, CONVERT_TZ(date,'+00:00',@@SESSION.time_zone) as date from emessage where seen = 0 AND idnum = ?";
  connection.query(query, [idnum], (err, results) => {
    if (!err) {
      // Updates all messages to seen once employee viewed during clocking.
      query =
        "UPDATE emessage SET seen = 1 where seen = 0 AND idnum = " + idnum;
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

/**
 * HTTP Request for getting previously sent employee messages.
 */
router.get("/employeeGetPrevMessages/:idnum", auth.authenticateManager, (req, res) => {
  let idnum = req.params.idnum;
  let businessid = req.session.user.business.idnum;
  // Checks to see if manager wants to see all messages or for a specific employee.
  if (idnum == "00000000") {
    query =
      "SELECT *, CONVERT_TZ(date,'+00:00',@@SESSION.time_zone) as date from emessage WHERE idnum IN (SELECT idnum from employee where businessid = ?)";
    id = businessid;
  } else {
    query =
      "SELECT *, CONVERT_TZ(date,'+00:00',@@SESSION.time_zone) as date from emessage WHERE idnum = ?";
    id = idnum;
  }
  connection.query(query, [id], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request to delete specific employee message.
 */
router.delete("/deleteMessages/:slno", auth.authenticateManager, (req, res) => {
  let slno = req.params.slno;
  query = "DELETE FROM emessage WHERE slno = ?";
  connection.query(query, [slno], (err, results) => {
    if (!err) {
      return res.status(200).json({ message: "Succesfully Deleted!" });
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for getting all employees in business.
 */
router.get("/getEmployees", auth.authenticateManager, (req, res) => {
  let businessid = req.session.user.business.idnum;
  query = "SELECT * FROM employee where businessid = ?";
  connection.query(query, [businessid], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for deleting specific employee in business.
 */
router.delete("/deleteEmployee/:idnum", auth.authenticateManager, (req, res) => {
  let idnum = req.params.idnum;
  let businessid = req.session.user.business.idnum;
  // Finds employee in business.
  query = "SELECT idnum FROM employee where idnum = ? AND businessid = ?";
  connection.query(query, [idnum, businessid], (err, result) => {
    if (!err) {
      if (result.length == 1) {
        // Deletes employee from business.
        query = "DELETE FROM employee WHERE idnum = ?";
        connection.query(query, [idnum], (err, results) => {
          if (!err) {
            return res.status(200).json({ message: "Succesfully Deleted!" });
          } else {
            return res.status(500).json(err);
          }
        });
      } else {
        return res.status(500).json({ message: "Employee Not Found!" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
