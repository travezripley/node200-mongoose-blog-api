// Imports mongoose and extracts Schema into it's own variable
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creates a new Mongoose Schema with two properties
const UserSchema = new Schema({
  firstName: { type: String, required: true }, // firstName property is a string and required
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  social: {
      facebook: { type: String, required: false },
      twitter: { type: String, required: false },
      linkedIn: { type: String, required: false }
  }
});

module.exports = mongoose.model("User", UserSchema);
