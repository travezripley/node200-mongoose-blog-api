const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect('mongodb://localhost/my-blog', { useMongoClient: true });
mongoose.Promise = Promise;

const app = express();
const morgan = require('morgan');

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api/users', require('./routes/users'));

app.get('/', (req, res) => {
    console.log("whats good player")
    res.status(200).send("hello");
});

module.exports = app;
