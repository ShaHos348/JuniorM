const express = require("express");
const connection = require("../connection");
const router = express.Router();
require("dotenv").config();
let auth = require("../services/authentication");

/**
 * HTTP Request to activate a lotto
 */
router.post("/entry", auth.authenticateBusiness, (req, res) => {
  let data = req.body;
  businessid = req.session.user.business.idnum;

  // Put activated lotto information in database.
  query =
    "INSERT INTO lottoactive(businessid, lottoid, quantity, name, box, shift, date) VALUES (?,?,?,?,?,?,now())";
  connection.query(
    query,
    [businessid, data.lottoid, data.quantity, data.name, data.box, data.shift],
    (err, result) => {
      if (!err) {
        return res.status(200).json({ message: "Lotto Activated" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

/**
 * HTTP Request to get active lottos for shift and date.
 */
router.get("/getlottoactive/:shift&:date", auth.authenticateBusiness, (req, res) => {
  let shift = req.params.shift;
  let currentDate = req.params.date;
  businessid = req.session.user.business.idnum;

  // Checks if date was given or user want active lotto from today
  if (currentDate == "undefined") {
    let date = new Date();
    currentDate =
      String(date.getFullYear()) +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0");
  }

  // Find all active lottos for given shift and date for business.
  query =
    "SELECT name, box, quantity, Date(CONVERT_TZ(date,'+00:00',@@SESSION.time_zone)) as date, lottoid FROM lottoactive WHERE businessid = ? AND shift = ? AND date(date) = ?";
  connection.query(query, [businessid, shift, currentDate], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request to register a lotto id.
 */
router.post("/lottoRegistry", auth.authenticateBusiness, (req, res) => {
  let lottoid = req.body.lottoid;
  let name = req.body.name;
  let quantity = req.body.quantity;

  // Find if lotto with given id exists in database.
  query = "SELECT lottoid FROM lottoregistry WHERE lottoid = ?";
  connection.query(query, [lottoid], (err, result) => {
    if (!err) {
      if (result.length == 0) {
        // Inserts lotto if it does not already exist.
        query =
          "INSERT INTO lottoregistry (lottoid, name, quantity) VALUES (?,?,?)";
        connection.query(query, [lottoid, name, quantity], (err, result) => {
          if (!err) {
            return res.status(200).json({ message: "Lotto Inserted!" });
          } else {
            return res.status(500).json(err);
          }
        });
      } else {
        // Updates lotto if it exists.
        query =
          "UPDATE lottoregistry SET name = ?, quantity = ? WHERE lottoid = ?";
        connection.query(query, [name, quantity, lottoid], (err, result) => {
          if (!err) {
            return res.status(200).json({ message: "Lotto Updated!" });
          } else {
            return res.status(500).json(err);
          }
        });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request to get registered lottos.
 */
router.get("/getLottos", auth.authenticateAdmin, (req, res) => {
  query = "SELECT lottoid, name, quantity FROM lottoregistry ORDER BY name";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request to get specific lotto from lotto registry.
 */
router.get("/getSpecificLotto/:lottoid", auth.authenticateBusiness, (req, res) => {
  let lottoid = req.params.lottoid;

  query = "SELECT name, quantity FROM lottoregistry WHERE lottoid = ?";
  connection.query(query, [lottoid], (err, result) => {
    if (!err) {
      if (result.length != 0) {
        return res.status(200).json(result[0]);
      } else {
        return res
          .status(400)
          .json({ message: "Lotto not in registry. Enter name!" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request to delete lotto from lotto registry.
 */
router.delete("/deleteLotto/:lottoid", auth.authenticateAdmin, (req, res) => {
  let lottoid = req.params.lottoid;

  // Checks if lotto exists in lotto registry.
  query = "SELECT lottoid FROM lottoregistry WHERE lottoid = ?";
  connection.query(query, [lottoid], (err, result) => {
    if (!err) {
      if (result.length != 0) {
        // Deletes lotto from lotto registry.
        query = "DELETE FROM lottoregistry WHERE lottoid = ?";
        connection.query(query, [lottoid], (err, result) => {
          if (!err) {
            return res.status(200).json({ message: "Lotto Deleted!" });
          } else {
            return res.status(500).json(err);
          }
        });
      } else {
        return res
          .status(400)
          .json({ message: "Lotto is not in item registry!" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request to enter data for business lotto sales.
 */
router.post("/lottoSaleEntry", auth.authenticateBusiness, (req, res) => {
  let shift = req.body.shift;
  let boxes = req.body.boxes;
  businessid = req.session.user.business.idnum;
  let insertion = ""; // Keeps track of all sales to be inserted.
  for (let index = 0; index < boxes.length; index++) {
    const element = boxes[index];
    // Checks if box is empty
    if (
      (element.end != "0" && element.end != null) ||
      (element.active != "0" && element.active != null)
    ) {
      if (element.end == null) {
        element.end = 0;
      }
      if (element.active == null) {
        element.active = 0;
      }
      if (element.value == null) {
        element.vlaue = 0;
      }
      // Adds a lotto sale box to be entered
      insertion +=
        "(" +
        businessid +
        ",now(),'" +
        shift +
        "'," +
        element.box +
        "," +
        element.start +
        "," +
        element.end +
        "," +
        element.active +
        "," +
        element.value +
        "," +
        element.sale +
        "," +
        element.total +
        "),";
    }
  }
  insertion = insertion.substring(0, insertion.length - 1);

  // Checks if lotto sale to be inserted is empty
  if (insertion.length == 0) {
    return res.status(400).json({ message: "Lotto Sale Empty" });
  }

  // Inserts lotto sales for business.
  query =
    "INSERT INTO lottosale(businessid, date, shift, box, start, end, active, value, sale, total) VALUES " +
    insertion;
  connection.query(query, (err, result) => {
    if (!err) {
      return res.status(200).json({ message: "Lotto Sale Submitted" });
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request to get lottosale for given shift and date.
 */
router.get("/getLottoSale/:shift&:date", auth.authenticateBusiness, (req, res) => {
  let shift = req.params.shift;
  let currentDate = req.params.date;
  businessid = req.session.user.business.idnum;

  // Determines from which shift and date to get business lotto sales from.
  if (currentDate == "undefined") {
    let date = new Date();
    currentDate =
      String(date.getFullYear()) +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0");
    if (shift == "Day") {
      query =
        "SELECT box, end FROM lottosale WHERE businessid = ? AND shift = 'Night' AND date = ? - interval 1 day";
    } else if (shift == "Night") {
      query =
        "SELECT box, end FROM lottosale WHERE businessid = ? AND shift = 'Day' AND date = ?";
    }
  } else {
    query =
      "SELECT *, Date(CONVERT_TZ(date,'+00:00',@@SESSION.time_zone)) as date FROM lottosale WHERE businessid = ? AND shift = '" +
      shift +
      "' AND date = ?";
  }

  // Gets lotto sales for business.
  connection.query(query, [businessid, currentDate], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
