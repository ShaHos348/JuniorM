const express = require("express");
const connection = require("../connection");
const router = express.Router();
require("dotenv").config();
var auth = require("../services/authentication");


router.post("/entry", (req, res) => {
    let data = req.body;
    businessid = req.session.user.business.idnum;

    query = "INSERT INTO lottoactive(businessid, lottoid, quantity, name, box, shift, date, count) VALUES (?,?,?,?,?,?,now(),1)";
    connection.query(query, [businessid, data.lottoid, data.quantity, data.name, data.box, data.shift], (err, resu) => {
        if (!err) {
            return res.status(200).json({ message: "Lotto Activated" });
        } else {
            return res.status(500).json(err);
        }
    });
});

router.post("/getlottoactive", (req, res) => {
    let data = req.body;
    businessid = req.session.user.business.idnum;

    let date = new Date();
    let currentDate =
        String(date.getFullYear()) + "-" +
        String(date.getMonth() + 1).padStart(2, "0") + "-" +
        String(date.getDate()).padStart(2, "0");

    query = "SELECT name, box FROM lottoactive WHERE businessid = ? AND shift = ? AND date = ?";
    connection.query(query, [businessid,data.shift,currentDate], (err, results) => {
        if(!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

module.exports = router;