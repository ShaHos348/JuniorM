const express = require("express");
var cors = require("cors");
const connection = require("./connection");
const businessUserRoute = require("./routes/businessUser");
const employeeUserRoute = require("./routes/employeeUser");
const reportRoute = require("./routes/report");
const orderRoute = require("./routes/order");
const lottoRoute = require("./routes/lotto");
const managerRoute = require("./routes/managerUser");
const adminRoute = require("./routes/adminUser");
const app = express();
const session = require("express-session");
const mysqlStore = require("express-mysql-session")(session);

const IN_PROD = process.env.NODE_ENV === "production";
const MAX_AGE = 1000 * 60 * 60 * 24 * 365;
const options = {
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  createDatabaseTable: true,
};

const sessionStore = new mysqlStore(options);

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    name: "Login-Sessions",
    store: sessionStore,
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: IN_PROD,
      maxAge: MAX_AGE,
      sameSite: true,
    },
  })
);

app.use("/businessUser", businessUserRoute);
app.use("/managerUser", managerRoute);
app.use("/adminUser", adminRoute);
app.use("/employeeUser", employeeUserRoute);
app.use("/report", reportRoute);
app.use("/order", orderRoute);
app.use("/lotto", lottoRoute);

module.exports = app;
