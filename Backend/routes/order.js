const express = require("express");
const connection = require("../connection");
const router = express.Router();
require("dotenv").config();
var auth = require("../services/authentication");
const PDFDocument = require('pdfkit');


router.post("/entry", (req, res) => {
    let data = req.body;
    businessidnum = req.session.user.business.idnum;
    let itemBarcode = data.barcode;
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

                    query = "SELECT barcode FROM orderlist where businessid = ? AND orderid = ? AND barcode = ?";
                    connection.query(query, [businessidnum, orderidnum, itemBarcode], (err, result) => {
                        if (!err) {
                            if (result.length == 0) {
                                query = "INSERT INTO orderlist (businessid,orderid, serialnum, barcode, name, quantity) VALUES (?,?,?,?,?,?)";
                                connection.query(query, [businessidnum, orderidnum, serialNum, itemBarcode, itemName, quantity], (err, result) => {
                                    if (!err) {
                                        return res
                                            .status(200)
                                            .json({ message: "Item Inserted!" });
                                    } else {
                                        console.log(err);
                                        return res.status(500).json(err);
                                    }
                                });
                            } else {
                                query = "UPDATE orderlist SET name = ?, quantity = ? WHERE businessid = ? AND orderid = ? AND barcode = ?";
                                connection.query(query, [itemName, quantity, businessidnum, orderidnum, itemBarcode], (err, result) => {
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
                query = "SELECT * from orderlist where businessid = ? AND orderid = ?";
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

router.delete("/delete/:barcode", (req, res) => {
    let itemBarcode = req.params.barcode;
    businessidnum = req.session.user.business.idnum;

    query = "SELECT name FROM orderlist where businessid = ? AND datecompleted IS NULL AND barcode = ?";
    connection.query(query, [businessidnum, itemBarcode], (err, result) => {
        if (!err) {
            if (result.length != 0) {
                query = "DELETE FROM orderlist where businessid = ? AND datecompleted IS NULL AND barcode = ?";
                connection.query(query, [businessidnum, itemBarcode], (err, result) => {
                    if (!err) {
                        return res.status(200).json({ message: "Item Deleted!" });
                    } else {
                        return res.status(500).json(err);
                    }
                });
            } else {
                return res.status(400).json({ message: "Item is not on current orderlist!" });
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

router.post("/itemRegistry", (req, res) => {
    let barcode = req.body.barcode;
    let name = req.body.name;

    query = "SELECT barcode FROM itemregistry WHERE barcode = ?";
    connection.query(query, [barcode], (err, result) => {
        if (!err) {
            if (result.length == 0) {
                query = "INSERT INTO itemregistry (barcode, name) VALUES (?,?)";
                connection.query(query, [barcode, name], (err, result) => {
                    if (!err) {
                        return res
                            .status(200)
                            .json({ message: "Item Inserted!" });
                    } else {
                        return res.status(500).json(err);
                    }
                });
            } else {
                query = "UPDATE itemregistry SET name = ? WHERE barcode = ?";
                connection.query(query, [name, barcode], (err, result) => {
                    if (!err) {
                        return res
                            .status(200)
                            .json({ message: "Item Name Updated!" });
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

router.get("/getItems", (req, res) => {

    query = "SELECT barcode,name FROM itemregistry ORDER BY name";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

router.get("/getSpecificItem/:barcode", (req, res) => {
    let barcode = req.params.barcode;

    query = "SELECT name FROM itemregistry WHERE barcode = ?";
    connection.query(query, [barcode], (err, result) => {
        if (!err) {
            if (result.length != 0) {
                return res.status(200).json(result[0]);
            } else {
                return res
                    .status(400)
                    .json({ message: "Barcode not in registry. Enter name!" });
            }
        } else {
            return res.status(500).json(err);
        }
    });
});

router.delete("/deleteItem/:barcode", (req, res) => {
    let barcode = req.params.barcode;

    query = "SELECT barcode FROM itemregistry WHERE barcode = ?";
    connection.query(query, [barcode], (err, result) => {
        if (!err) {
            if (result.length != 0) {
                query = "DELETE FROM itemregistry WHERE barcode = ?";
                connection.query(query, [barcode], (err, result) => {
                    if (!err) {
                        return res.status(200).json({ message: "Item Deleted!" });
                    } else {
                        return res.status(500).json(err);
                    }
                });
            } else {
                return res.status(400).json({ message: "Item is not in item registry!" });
            }
        } else {
            return res.status(500).json(err);
        }
    });
});

module.exports = router;