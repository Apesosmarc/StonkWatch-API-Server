const mongoose = require("mongoose");

// Schema Describes data type of document and it's data types
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    // validators
    required: [true, "must provide name"],
    trim: true,
  },
  watchlists: {
    type: Array,
  },
});

module.exports = mongoose.model("User", UserSchema);
