const express = require("express");
const connection = require("../connection");
const router = express.Router();
require("dotenv").config();
var auth = require("../services/authentication");
const PDFDocument = require("pdfkit");

/**
 * HTTP Request for entering item into order
 */
router.post("/entry", auth.authenticateBusiness, (req, res) => {
  let data = req.body;
  businessidnum = req.session.user.business.idnum;
  let itemBarcode = data.barcode;
  let itemName = data.name;
  let quantity = data.quantity;
  let orderidnum = 1; // Defaults orderid to 1
  let serialNum = 1; // Defaults serial to 1
  // Finds the last orderid for business in the database.
  let query =
    "SELECT orderid,datecompleted FROM orderlist where businessid = ? order by orderid desc limit 0,1";
  connection.query(query, [businessidnum], (err, result) => {
    if (!err) {
      // Checks if order was completed, and orderid needs to increase
      if (result.length != 0) {
        orderidnum = result[0].orderid;
        let completed = result[0].datecompleted;
        if (completed != null) {
          orderidnum++;
        }
      }

      // Finds the last serial number in the order
      // TODO: Can removed serialnum column if wanted
      query =
        "SELECT serialnum FROM orderlist where businessid = ? AND orderid = ? order by serialnum desc limit 0,1";
      connection.query(query, [businessidnum, orderidnum], (err, result) => {
        if (!err) {
          // Checks if serial number needs to be increased
          if (result.length != 0) {
            serialNum = result[0].serialnum + 1;
          }

          // Searches for item barcode in current order
          query =
            "SELECT barcode FROM orderlist where businessid = ? AND orderid = ? AND barcode = ?";
          connection.query(
            query,
            [businessidnum, orderidnum, itemBarcode],
            (err, result) => {
              if (!err) {
                // Checks if item needs to be inserted or updated.
                if (result.length == 0) {
                  query =
                    "INSERT INTO orderlist (businessid,orderid, serialnum, barcode, name, quantity) VALUES (?,?,?,?,?,?)";
                  connection.query(
                    query,
                    [
                      businessidnum,
                      orderidnum,
                      serialNum,
                      itemBarcode,
                      itemName,
                      quantity,
                    ],
                    (err, result) => {
                      if (!err) {
                        return res
                          .status(200)
                          .json({ message: "Item Inserted!" });
                      } else {
                        return res.status(500).json(err);
                      }
                    }
                  );
                } else {
                  query =
                    "UPDATE orderlist SET name = ?, quantity = ? WHERE businessid = ? AND orderid = ? AND barcode = ?";
                  connection.query(
                    query,
                    [
                      itemName,
                      quantity,
                      businessidnum,
                      orderidnum,
                      itemBarcode,
                    ],
                    (err, result) => {
                      if (!err) {
                        return res
                          .status(200)
                          .json({ message: "Item Quantity Updated!" });
                      } else {
                        return res.status(500).json(err);
                      }
                    }
                  );
                }
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
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for getting currently opened orderlist for business.
 */
router.get("/getOrder", auth.authenticateBusiness, (req, res) => {
  businessidnum = req.session.user.business.idnum;

  // Finds the lastest orderlist that is not yet completed for business.
  query =
    "SELECT orderid FROM orderlist where businessid = ? AND datecompleted IS NULL order by orderid desc limit 0,1";
  connection.query(query, [businessidnum], (err, result) => {
    if (!err) {
      if (result.length != 0) {
        let orderid = result[0].orderid;
        // Selects all the items in the orderlist.
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

/**
 * HTTP Request getting all orderids for business
 */
router.get("/getOrders", auth.authenticateBusiness, (req, res) => {
  businessidnum = req.session.user.business.idnum;

  // Selects all orderid currently done or being completed for business.
  // TODO: Return only the last 10 orderids.
  query =
    "SELECT DISTINCT orderid,datecompleted FROM orderlist where businessid = ?";
  connection.query(query, [businessidnum], (err, result) => {
    if (!err) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for starting new orderlist.
 */
router.get("/new", auth.authenticateBusiness, (req, res) => {
  businessidnum = req.session.user.business.idnum;

  // Finds orderlist for business that is not complete.
  query =
    "SELECT orderid FROM orderlist WHERE businessid = ? AND datecompleted IS NULL";
  connection.query(query, [businessidnum], (err, result) => {
    if (!err) {
      // Checks if orderlist is empty.
      if (result.length != 0) {
        // Updates orderlist items to completed.
        query =
          "UPDATE orderlist SET datecompleted = now() WHERE businessid = ? AND datecompleted IS NULL";
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

/**
 * HTTP Request for deleting item from orderlist.
 */
router.delete("/delete/:barcode", auth.authenticateBusiness, (req, res) => {
  let itemBarcode = req.params.barcode;
  businessidnum = req.session.user.business.idnum;

  // Finds item in orderlist with given barcode.
  query =
    "SELECT name FROM orderlist where businessid = ? AND datecompleted IS NULL AND barcode = ?";
  connection.query(query, [businessidnum, itemBarcode], (err, result) => {
    if (!err) {
      // Checks if item with barcode exists in orderlist
      if (result.length != 0) {
        // Deletes item from current business orderlist.
        query =
          "DELETE FROM orderlist where businessid = ? AND datecompleted IS NULL AND barcode = ?";
        connection.query(query, [businessidnum, itemBarcode], (err, result) => {
          if (!err) {
            return res.status(200).json({ message: "Item Deleted!" });
          } else {
            return res.status(500).json(err);
          }
        });
      } else {
        return res
          .status(400)
          .json({ message: "Item is not on current orderlist!" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for printing orderlist.
 */
router.post("/print", auth.authenticateBusiness, (req, res) => {
  let orderid = req.body.orderid;
  businessidnum = req.session.user.business.idnum;

  // Retrieves all business information.
  query = "SELECT * FROM business WHERE idnum = ?";
  connection.query(query, [businessidnum], (err, business) => {
    if (!err) {
      business = business[0];
      // Selects orderlist for business with given orderid.
      query =
        "SELECT serialnum, name, quantity from orderlist where businessid = ? AND orderid = ?";
      connection.query(query, [businessidnum, orderid], (err, results) => {
        if (!err) {
          // Makes orderlist into pdf.
          let doc = new PDFDocument({
            margins: { top: 50, bottom: 50, left: 50, right: 50 },
          });

          let start = doc.y - 5;
          doc
            .font("Times-Bold")
            .text("Id: ", { continued: true })
            .font("Times-Roman")
            .text(businessidnum);
          doc
            .font("Times-Bold")
            .text("Name: ", { continued: true })
            .font("Times-Roman")
            .text(business.name);
          doc
            .font("Times-Bold")
            .text("Phone: ", { continued: true })
            .font("Times-Roman")
            .text(business.phone);
          doc
            .font("Times-Bold")
            .text("Address: ", { continued: true })
            .font("Times-Roman")
            .text(
              business.address +
                ", " +
                business.city +
                ", " +
                business.zipcode +
                ", " +
                business.state
            );

          let date = new Date();
          let currentDate =
            String(date.getMonth() + 1).padStart(2, "0") +
            "/" +
            String(date.getDate()).padStart(2, "0") +
            "/" +
            String(date.getFullYear());

          doc
            .font("Times-Bold")
            .text("Order Id: ", { continued: true })
            .font("Times-Roman")
            .text(orderid);
          doc
            .font("Times-Bold")
            .text("Date: ", { continued: true })
            .font("Times-Roman")
            .text(currentDate);

          let end = doc.y + 5;
          doc.rect(50 - 2.5, start, 522, end - start).stroke();
          doc.moveDown();

          doc.font("Times-Bold").text("Order:");

          doc.moveDown();
          let margin = doc.y;

          doc.text("Sl", 50, margin, {
            width: 25,
            align: "left",
            lineBreak: false,
          });
          doc.rect(50 - 2.5, margin - 5, 25 + 5, 20).stroke();
          doc.text("Name", 75, margin, {
            width: 200,
            align: "center",
            lineBreak: false,
          });
          doc.rect(50 - 2.5 + 25 + 5, margin - 5, 200 - 5, 20).stroke();
          doc.text("Quantity", 275, margin, { width: 50, align: "right" });
          doc
            .rect(50 - 2.5 + 25 + 5 + 200 - 5, margin - 5, 50 + 5, 20)
            .stroke();
          doc.font("Times-Roman");
          margin = margin + 20;

          for (var i in results) {
            doc.text(results[i].serialnum, 50, margin, {
              width: 25,
              align: "left",
              lineBreak: false,
            });
            doc.rect(50 - 2.5, margin - 5, 25 + 5, 20).stroke();
            doc.text(results[i].name, 75, margin, {
              width: 200,
              align: "center",
              lineBreak: false,
            });
            doc.rect(50 - 2.5 + 25 + 5, margin - 5, 200 - 5, 20).stroke();
            doc.text(results[i].quantity, 275, margin, {
              width: 50,
              align: "right",
            });
            doc
              .rect(50 - 2.5 + 25 + 5 + 200 - 5, margin - 5, 50 + 5, 20)
              .stroke();
            margin = margin + 20;
          }

          res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": "inline; filename=order.pdf",
          });

          doc.info.Title = "order.pdf";

          doc.pipe(res);

          doc.end();
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
 * HTTP Request for registering items.
 */
router.post("/itemRegistry", (req, res) => {
  let barcode = req.body.barcode;
  let name = req.body.name;

  // Finds barcode in itemRegistry.
  query = "SELECT barcode FROM itemregistry WHERE barcode = ?";
  connection.query(query, [barcode], (err, result) => {
    if (!err) {
      //Checks if item with given barcode exists in database.
      if (result.length == 0) {
        // Inserts item into registry.
        query = "INSERT INTO itemregistry (barcode, name) VALUES (?,?)";
        connection.query(query, [barcode, name], (err, result) => {
          if (!err) {
            return res.status(200).json({ message: "Item Inserted!" });
          } else {
            return res.status(500).json(err);
          }
        });
      } else {
        // Updates item in item registry.
        query = "UPDATE itemregistry SET name = ? WHERE barcode = ?";
        connection.query(query, [name, barcode], (err, result) => {
          if (!err) {
            return res.status(200).json({ message: "Item Name Updated!" });
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
 * HTTP Request to get items in registry.
 */
router.get("/getItems", auth.authenticateAdmin, (req, res) => {
  query = "SELECT barcode,name FROM itemregistry ORDER BY name";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request to get specific item in registry.
 */
router.get("/getSpecificItem/:barcode", (req, res) => {
  let barcode = req.params.barcode;

  // FInds item in registry.
  query = "SELECT name FROM itemregistry WHERE barcode = ?";
  connection.query(query, [barcode], (err, result) => {
    if (!err) {
      // Checks if item exists in registry.
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

/**
 * HTTP Request to delete items in registry.
 */
router.delete("/deleteItem/:barcode", auth.authenticateAdmin, (req, res) => {
  let barcode = req.params.barcode;

  // Finds item in registry.
  query = "SELECT barcode FROM itemregistry WHERE barcode = ?";
  connection.query(query, [barcode], (err, result) => {
    if (!err) {
      // Checks if item exists in registry.
      if (result.length != 0) {
        // Deletes item in registry.
        query = "DELETE FROM itemregistry WHERE barcode = ?";
        connection.query(query, [barcode], (err, result) => {
          if (!err) {
            return res.status(200).json({ message: "Item Deleted!" });
          } else {
            return res.status(500).json(err);
          }
        });
      } else {
        return res
          .status(400)
          .json({ message: "Item is not in item registry!" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
