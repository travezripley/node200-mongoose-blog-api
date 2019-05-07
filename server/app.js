const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect('mongodb://localhost:27017/node200-mongoose-blog-api', { useMongoClient: true });
mongoose.Promise = Promise;

const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    console.log("whats good player")
    res.status(200).send("hello");
});

app.use('/api/users', require('./routes/users'));

module.exports = app;
