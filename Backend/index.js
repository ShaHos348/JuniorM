const express = require("express");
var cors = require("cors");
const connection = require("./connection");
const businessUserRoute = require("./routes/businessUser");
const app = express();
const sess = require("express-session");

app.use(cors({
    origin:'http://localhost:4200',
    credentials:true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(sess({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60,
    }
}));

app.use("/businessUser", businessUserRoute);

module.exports = app;
