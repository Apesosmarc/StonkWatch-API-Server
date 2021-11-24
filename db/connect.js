const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose.connect(url);
  console.log("db connected");
};

module.exports = connectDB;
