const express = require("express");
const connection = require("../connection");
const router = express.Router();
require("dotenv").config();
var auth = require("../services/authentication");

/**
 * HTTP Request to log shift report.
 */
router.post("/log", (req, res) => {
  let data = req.body;
  businessidnum = req.session.user.business.idnum;

  // Deletes report from database.
  query =
    "DELETE FROM worksheet WHERE businessid = ? AND date = ? AND shift = ?";
  connection.query(
    query,
    [businessidnum, data.date, data.shift],
    (err, results) => {
      if (!err) {
        part1 = businessidnum + ",'" + data.date + "','" + data.shift + "'";

        // Creates arrays for each section of report
        companyPart = new Array();
        lottoPart = new Array();
        shreportPart = new Array();
        shcountPart = new Array();
        let i = 0;
        //Loops through given data and inserts in appropriate array
        for (let index = 0; index < 20; index += 2) {
          companyPart[index] = data.companyNames[i];
          companyPart[index + 1] = data.companyAmounts[i];
          lottoPart[index] = data.lottoNames[i];
          lottoPart[index + 1] = data.lottoBoxes[i];
          shreportPart[i] = data.shreportAmounts[i];
          shcountPart[i] = data.shcountAmounts[i];
          i++;
        }

        // Adds single quotes around all array elememts and converts to string
        companyPart = String(companyPart.map((d) => `'${d}'`));
        lottoPart = String(lottoPart.map((d) => `'${d}'`));
        shreportPart = String(shreportPart.map((d) => `'${d}'`));
        shcountPart = String(shcountPart.map((d) => `'${d}'`));

        // Replaces all none given values ith null or 0.
        companyPart = companyPart.replaceAll("'null'", null);
        lottoPart = lottoPart.replaceAll("'null'", null);
        companyPart = companyPart.replaceAll("'undefined'", null);
        lottoPart = lottoPart.replaceAll("'undefined'", null);
        shreportPart = shreportPart.replaceAll("'null'", 0);
        shcountPart = shcountPart.replaceAll("'null'", 0);
        shreportPart = shreportPart.replaceAll("'undefined'", 0);
        shcountPart = shcountPart.replaceAll("'undefined'", 0);

        // Joins entire value to be added to database.
        value =
          part1 +
          "," +
          companyPart +
          "," +
          data.payoutTotal +
          "," +
          lottoPart +
          "," +
          shreportPart +
          "," +
          data.shiftReportTotal +
          "," +
          shcountPart +
          "," +
          data.shiftCountTotal +
          "," +
          data.overshoot;

        // Adds report to database.
        query =
          "INSERT INTO worksheet (businessid, date, shift," +
          "company1, comamount1, company2, comamount2, company3, comamount3, company4, comamount4, company5, comamount5, " +
          "company6, comamount6, company7, comamount7, company8, comamount8, company9, comamount9, company10, comamount10, paidout, " +
          "lotto1, box1, lotto2, box2, lotto3, box3, lotto4, box4, lotto5, box5, lotto6, box6, lotto7, box7, lotto8, box8, lotto9, box9, lotto10, box10, " +
          "shreport1, shreport2, shreport3, shreport4, shreport5, shreport6, shreport7, shreport8, shreport9, shreport10, shreporttotal, " +
          "shcount1, shcount2, shcount3, shcount4, shcount5, shcount6, shcount7, shcount8, shcount9, shcount10, shcounttotal, overshoot) VALUES " +
          "(" +
          value +
          ")";
        connection.query(query, (err, results) => {
          if (!err) {
            return res.status(200).json({ message: "Succesfully Logged!" });
          } else {
            console.log(err);
            return res.status(500).json(err);
          }
        });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

/**
 * HTTP Request to get specific report.
 */
router.get("/daily/:date&:shift", (req, res) => {
  let date = req.params.date;
  let shift = req.params.shift;
  businessidnum = req.session.user.business.idnum;

  // Selects report from database if found.
  query =
    "SELECT * FROM worksheet WHERE businessid = ? AND date = ? AND shift = ?";
  connection.query(query, [businessidnum, date, shift], (err, results) => {
    if (!err) {
      return res.status(200).json(results[0]);
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request to get monthly report.
 */
router.get("/monthly/:year&:month", (req, res) => {
  let year = req.params.year;
  let month = req.params.month;
  businessidnum = req.session.user.business.idnum;

  // Selects all reports for a given month and year.
  query =
    "SELECT * FROM worksheet WHERE businessid = ? AND YEAR(date) = ? AND MONTH(date) = ?";
  connection.query(query, [businessidnum, year, month], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
