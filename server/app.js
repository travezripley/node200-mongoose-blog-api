const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = Promise;

const app = express();

app.use(morgan("dev"));

app.use(bodyParser.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

app.get("/", (req, res) => {
  res.status(200).send();
});

module.exports = app;
