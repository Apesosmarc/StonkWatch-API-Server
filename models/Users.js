const mongoose = require("mongoose");

const WatchlistSchema = new mongoose.Schema({
  title: {
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
  },
  OAuthId: {
    type: Number,
  },
  watchlists: [WatchlistSchema],
});

module.exports = {
  User: mongoose.model("User", UserSchema),
  Watchlist: mongoose.model("Watchlist", WatchlistSchema),
};
