// Imports mongoose and extracts Schema into it's own variable
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creates a new Mongoose Schema with two properties
const BlogSchema = new Schema({
  title: { type: String, required: true }, // title property is a string and required
  article: { type: String, required: true }, // article property is a string and required
  published: { type: Date, required: true }, // published property is a Date and required
  featured: { type: Boolean, required: true }, // featured property is a Boolean and required
  author: { type: Schema.Types.ObjectId, ref: 'User' } // author property is an ObjectId and required
});

module.exports = mongoose.model("Blog", BlogSchema);
