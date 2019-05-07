const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/node200-mongoose-blog-api", {
  useMongoClient: true
});
mongoose.Promise = Promise;

const app = express();

const morgan = require("morgan");

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use("/api/users", require("./routes/users"));
app.use("/api/blogs", require("./routes/blogs"));

app.get("/", (req, res) => {
  res.status(200).send();
});

module.exports = app;
