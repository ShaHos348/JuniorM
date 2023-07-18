const express = require("express");
const connection = require("../connection");
const router = express.Router();
require("dotenv").config();
var auth = require("../services/authentication");
const PDFDocument = require('pdfkit');


router.post("/entry", (req, res) => {
    let data = req.body;
    businessidnum = req.session.user.business.idnum;
    let itemName = data.name;
    let quantity = data.quantity;
    let orderidnum = 1;
    let serialNum = 1;
    let query = "SELECT orderid,datecompleted FROM orderlist where businessid = ? order by orderid desc limit 0,1";
    connection.query(query, [businessidnum], (err, result) => {
        if (!err) {
            if (result.length != 0) {
                orderidnum = result[0].orderid;
                let completed = result[0].datecompleted;
                if (completed != null) {
                    orderidnum++;
                }
            }

            query = "SELECT serialnum FROM orderlist where businessid = ? AND orderid = ? order by serialnum desc limit 0,1";
            connection.query(query, [businessidnum, orderidnum], (err, result) => {
                if (!err) {
                    if (result.length != 0) {
                        serialNum = result[0].serialnum + 1;
                    }

                    query = "SELECT name FROM orderlist where businessid = ? AND orderid = ? AND name = ?";
                    connection.query(query, [businessidnum, orderidnum, itemName], (err, result) => {
                        if (!err) {
                            if (result.length == 0) {
                                query = "INSERT INTO orderlist (businessid,orderid, serialnum, name, quantity) VALUES ('"
                                    + businessidnum + "','" + orderidnum + "','" + serialNum + "','" + itemName + "','" + quantity + "')";
                                connection.query(query, (err, result) => {
                                    if (!err) {
                                        return res
                                            .status(200)
                                            .json({ message: "Item Inserted!" });
                                    } else {
                                        return res.status(500).json(err);
                                    }
                                });
                            } else {
                                query = "UPDATE orderlist SET quantity = '" + quantity + "' WHERE businessid = '" + businessidnum + "' AND orderid = '" + orderidnum + "' AND name = '" + itemName + "'";
                                connection.query(query, (err, result) => {
                                    if (!err) {
                                        return res
                                            .status(200)
                                            .json({ message: "Item Quantity Updated!" });
                                    } else {
                                        return res.status(500).json(err);
                                    }
                                });
                            }
                        } else {
                            return res.status(500).json(err);
                        }
                    });
                } else {
                    return res.status(500).json(err);
                }
            });
        } else {
            return res.status(500).json(err);
        }
    });
});

router.get("/getOrder", (req, res) => {
    businessidnum = req.session.user.business.idnum;

    query = "SELECT orderid FROM orderlist where businessid = ? AND datecompleted IS NULL order by orderid desc limit 0,1";
    connection.query(query, [businessidnum], (err, result) => {
        if (!err) {
            if (result.length != 0) {
                let orderid = result[0].orderid;
                query = "SELECT serialnum, name, quantity from orderlist where businessid = ? AND orderid = ?";
                connection.query(query, [businessidnum, orderid], (err, results) => {
                    if (!err) {
                        if (!err) {
                            return res.status(200).json(results);
                        } else {
                            return res.status(500).json(err);
                        }
                    } else {
                        return res.status(500).json(err);
                    }
                });
            } else {
                return res.status(200).json(result);
            }
        } else {
            return res.status(500).json(err);
        }
    });
});

router.get("/getOrders", (req, res) => {
    businessidnum = req.session.user.business.idnum;

    query = "SELECT DISTINCT orderid,datecompleted FROM orderlist where businessid = ?";
    connection.query(query, [businessidnum], (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
});

router.get("/new", (req, res) => {
    businessidnum = req.session.user.business.idnum;

    query = "SELECT orderid FROM orderlist WHERE businessid = ? AND datecompleted IS NULL";
    connection.query(query, [businessidnum], (err, result) => {
        if (!err) {
            if (result.length != 0) {
                query = "UPDATE orderlist SET datecompleted = now() WHERE businessid = ? AND datecompleted IS NULL";
                connection.query(query, [businessidnum], (err, result) => {
                    if (!err) {
                        return res.status(200).json({ message: "New Order Created" });
                    } else {
                        return res.status(500).json(err);
                    }
                });
            } else {
                return res.status(200).json({ message: "Current Order Empty" });
            }
        } else {
            return res.status(500).json(err);
        }
    });
});

router.post('/print', (req, res) => {
    let orderid = req.body.orderid;
    businessidnum = req.session.user.business.idnum;

    query = "SELECT * FROM business WHERE idnum = ?";
    connection.query(query, [businessidnum], (err, business) => {
        if (!err) {
            business = business[0];
            query = "SELECT serialnum, name, quantity from orderlist where businessid = ? AND orderid = ?";
            connection.query(query, [businessidnum, orderid], (err, results) => {
                if (!err) {
                    let doc = new PDFDocument({ margins: { top: 50, bottom: 50, left: 50, right: 50 } });

                    let start = doc.y - 5;
                    doc.font('Times-Bold').text("Id: ", { continued: true }).font('Times-Roman').text(businessidnum);
                    doc.font('Times-Bold').text("Name: ", { continued: true }).font('Times-Roman').text(business.name);
                    doc.font('Times-Bold').text("Phone: ", { continued: true }).font('Times-Roman').text(business.phone);
                    doc.font('Times-Bold').text("Address: ", { continued: true }).font('Times-Roman').text(
                        business.address + ", " + business.city + ", " + business.zipcode + ", " + business.state);

                    let date = new Date();
                    let currentDate =
                        String(date.getMonth() + 1).padStart(2, "0") + "/" +
                        String(date.getDate()).padStart(2, "0") + "/" +
                        String(date.getFullYear());

                    doc.font('Times-Bold').text("Order Id: ", { continued: true }).font('Times-Roman').text(orderid);
                    doc.font('Times-Bold').text("Date: ", { continued: true }).font('Times-Roman').text(currentDate);

                    let end = doc.y + 5;
                    doc.rect(50 - 2.5, start, 522, end - start).stroke();
                    doc.moveDown();

                    doc.font('Times-Bold').text("Order:");

                    doc.moveDown();
                    let margin = doc.y;

                    doc.text("Sl", 50, margin, { width: 25, align: 'left', lineBreak: false });
                    doc.rect(50 - 2.5, margin - 5, 25 + 5, 20).stroke();
                    doc.text("Name", 75, margin, { width: 200, align: 'center', lineBreak: false });
                    doc.rect(50 - 2.5 + 25 + 5, margin - 5, 200 - 5, 20).stroke();
                    doc.text("Quantity", 275, margin, { width: 50, align: 'right' });
                    doc.rect(50 - 2.5 + 25 + 5 + 200 - 5, margin - 5, 50 + 5, 20).stroke();
                    doc.font('Times-Roman');
                    margin = margin + 20;

                    for (var i in results) {
                        doc.text(results[i].serialnum, 50, margin, { width: 25, align: 'left', lineBreak: false });
                        doc.rect(50 - 2.5, margin - 5, 25 + 5, 20).stroke();
                        doc.text(results[i].name, 75, margin, { width: 200, align: 'center', lineBreak: false });
                        doc.rect(50 - 2.5 + 25 + 5, margin - 5, 200 - 5, 20).stroke();
                        doc.text(results[i].quantity, 275, margin, { width: 50, align: 'right' });
                        doc.rect(50 - 2.5 + 25 + 5 + 200 - 5, margin - 5, 50 + 5, 20).stroke();
                        margin = margin + 20;
                    }

                    res.writeHead(200, {
                        'Content-Type': 'application/pdf',
                        'Content-Disposition': 'inline; filename=order.pdf',
                    });

                    doc.info.Title = "order.pdf";

                    doc.pipe(res);

                    doc.end()

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