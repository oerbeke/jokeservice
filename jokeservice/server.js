const express = require('express');
const mongoose = require("mongoose");

const app = express();
const hbs = require("hbs");
const config = require('./config');
const routes = require("./routes/api/api");
module.exports.app = app;
const controller = require("./controller/controller");

app.set("view engine", "hbs");
app.set("views", __dirname + "/templates");

app.use(express.static(__dirname + "/public"));
app.use(express.json());

const port = process.env.PORT || config.localPort;

app.use("/", routes);
app.listen(port);

console.log("Lytter på port 8000 ...");
