var express = require("express");
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var hostsRouter = require("./routes/hosts");
var ownersRouter = require("./routes/owners");
var petsRouter = require("./routes/pets");
var needsRouter = require("./routes/needs");
// var pets_needsRouter = require("./routes/pets_needs");
// var hosts_needsRouter = require("./routes/hosts_needs");

var app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/hosts", hostsRouter);
app.use("/owners", ownersRouter);
app.use("/pets", petsRouter);
app.use("/needs", needsRouter);
// app.use("/pets_needs", pets_needsRouter);
// app.use("/hosts_needs", hosts_needsRouter);

module.exports = app;
