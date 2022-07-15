var express = require("express");
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var accommodationRouter = require("./routes/accommodation");
var oaccomodateNeedsRouter = require("./routes/accomodateNeeds");
var petsRouter = require("./routes/pets");
var needsRouter = require("./routes/needs");
var authRouter = require("./routes/auth");
var userRouter = require("./routes/users");
// var pets_needsRouter = require("./routes/pets_needs");
// var hosts_needsRouter = require("./routes/accommodation_needs");

var app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/accommodation", accommodationRouter);
app.use("/accomodateNeeds", oaccomodateNeedsRouter);
app.use("/pets", petsRouter);
app.use("/needs", needsRouter);
app.use("/", authRouter);
app.use("/users", userRouter);
// app.use("/pets_needs", pets_needsRouter);
// app.use("/accommodation_needs", hosts_needsRouter);

module.exports = app;
