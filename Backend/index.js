const express = require("express");
var cors = require("cors");
const connection = require("./connection");
const businessUserRoute = require("./routes/businessUser");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/businessUser", businessUserRoute);

module.exports = app;
