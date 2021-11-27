const mongoose = require("mongoose");

const WatchlistSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  stocks: {
    type: Array,
  },
});

// Schema Describes data type of document and it's data types
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    // validators
    required: [true, "must provide name"],
    trim: true,
  },
  watchlists: [WatchlistSchema],
});

module.exports = {
  User: mongoose.model("User", UserSchema),
  Watchlist: mongoose.model("Watchlist", WatchlistSchema),
};
