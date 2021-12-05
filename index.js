const express = require("express");
const app = express();
const consign = require("consign");
const database = require("./config/database");

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
app.database = database

consign()
    .then("./api")
    .then("./routes/routes.js")
    .into(app)
    
app.listen(3001);

