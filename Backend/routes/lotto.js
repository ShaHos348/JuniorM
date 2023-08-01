const express = require("express");
const connection = require("../connection");
const router = express.Router();
require("dotenv").config();
var auth = require("../services/authentication");


router.post("/entry", (req, res) => {
    let data = req.body;
    businessid = req.session.user.business.idnum;

    query = "INSERT INTO lottoactive(businessid, lottoid, quantity, name, box, shift, date) VALUES (?,?,?,?,?,?,now())";
    connection.query(query, [businessid, data.lottoid, data.quantity, data.name, data.box, data.shift], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "Lotto Activated" });
        } else {
            return res.status(500).json(err);
        }
    });
});

router.get("/getlottoactive/:shift&:date", (req, res) => {
    let shift = req.params.shift;
    let currentDate = req.params.date;
    businessid = req.session.user.business.idnum;

    if (currentDate == 'undefined') {
        let date = new Date();
        currentDate =
            String(date.getFullYear()) + "-" +
            String(date.getMonth() + 1).padStart(2, "0") + "-" +
            String(date.getDate()).padStart(2, "0");
    }


    query = "SELECT name, box, quantity, Date(CONVERT_TZ(date,'+00:00',@@SESSION.time_zone)) as date, lottoid FROM lottoactive WHERE businessid = ? AND shift = ? AND date(date) = ?";
    connection.query(query, [businessid, shift, currentDate], (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

router.post("/lottoRegistry", (req, res) => {
    let lottoid = req.body.lottoid;
    let name = req.body.name;
    let quantity = req.body.quantity;

    query = "SELECT lottoid FROM lottoregistry WHERE lottoid = ?";
    connection.query(query, [lottoid], (err, result) => {
        if (!err) {
            if (result.length == 0) {
                query = "INSERT INTO lottoregistry (lottoid, name, quantity) VALUES (?,?,?)";
                connection.query(query, [lottoid, name, quantity], (err, result) => {
                    if (!err) {
                        return res
                            .status(200)
                            .json({ message: "Lotto Inserted!" });
                    } else {
                        return res.status(500).json(err);
                    }
                });
            } else {
                query = "UPDATE lottoregistry SET name = ?, quantity = ? WHERE lottoid = ?";
                connection.query(query, [name, quantity, lottoid], (err, result) => {
                    if (!err) {
                        return res
                            .status(200)
                            .json({ message: "Lotto Updated!" });
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

router.get("/getLottos", (req, res) => {

    query = "SELECT lottoid, name, quantity FROM lottoregistry ORDER BY name";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

router.get("/getSpecificLotto/:lottoid", (req, res) => {
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

router.delete("/deleteLotto/:lottoid", (req, res) => {
    let lottoid = req.params.lottoid;

    query = "SELECT lottoid FROM lottoregistry WHERE lottoid = ?";
    connection.query(query, [lottoid], (err, result) => {
        if (!err) {
            if (result.length != 0) {
                query = "DELETE FROM lottoregistry WHERE lottoid = ?";
                connection.query(query, [lottoid], (err, result) => {
                    if (!err) {
                        return res.status(200).json({ message: "Lotto Deleted!" });
                    } else {
                        return res.status(500).json(err);
                    }
                });
            } else {
                return res.status(400).json({ message: "Lotto is not in item registry!" });
            }
        } else {
            return res.status(500).json(err);
        }
    });
});

router.post("/lottoSaleEntry", (req, res) => {
    let shift = req.body.shift;
    let boxes = req.body.boxes;
    businessid = req.session.user.business.idnum;
    let insertion = "";
    for (let index = 0; index < boxes.length; index++) {
        const element = boxes[index];
        if ((element.end != '0' && element.end != null) || (element.active != '0' && element.active != null)) {
            if (element.end == null) { element.end = 0; }
            if (element.active == null) { element.active = 0; }
            if (element.value == null) { element.vlaue = 0; }
            insertion += "(" + businessid + ",now(),'" + shift + "'," + element.box + "," + element.start + "," + element.end + "," + element.active + "," + element.value + "," + element.sale + "," + element.total + "),";
        }
    }
    insertion = insertion.substring(0, insertion.length - 1);

    if (insertion.length == 0) {
        return res.status(400).json({ message: "Lotto Sale Empty" });
    }


    query = "INSERT INTO lottosale(businessid, date, shift, box, start, end, active, value, sale, total) VALUES " + insertion;
    connection.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "Lotto Sale Submitted" });
        } else {
            return res.status(500).json(err);
        }
    });
});

router.get("/getLottoSale/:shift&:date", (req, res) => {
    let shift = req.params.shift;
    let currentDate = req.params.date;
    businessid = req.session.user.business.idnum;

    if (currentDate == 'undefined') {
        let date = new Date();
        currentDate =
            String(date.getFullYear()) + "-" +
            String(date.getMonth() + 1).padStart(2, "0") + "-" +
            String(date.getDate()).padStart(2, "0");
        if (shift == 'Day') {
            query = "SELECT box, end FROM lottosale WHERE businessid = " + businessid + " AND shift = 'Night' AND date = '" + currentDate + "'- interval 1 day";
        } else if (shift == 'Night') {
            query = "SELECT box, end FROM lottosale WHERE businessid = " + businessid + " AND shift = 'Day' AND date = '" + currentDate + "'";
        }
    } else {
        query = "SELECT *, Date(CONVERT_TZ(date,'+00:00',@@SESSION.time_zone)) as date FROM lottosale WHERE businessid = " + businessid + " AND shift = '" + shift + "' AND date = '" + currentDate + "'";
    }
    
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

module.exports = router;