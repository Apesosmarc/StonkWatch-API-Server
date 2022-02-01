const express = require("express");
const http = require("http");
const app = express();
const PORT = process.env.PORT || 5000;

// ROUTES
const users = require("./routes/users");
const watchlists = require("./routes/watchlists");
const stocks = require("./routes/stocks");

// DB
const connectDB = require("./db/connect");

//dotenv
require("dotenv").config();

//custom error handle
const notFound = require("./middlewares/not-found.js");
const errorHandlerMiddleware = require("./middlewares/error-handler");

// logger middleware
const morgan = require("morgan");

// cors fix for local -- allows server to be accessed by other domains
const cors = require("cors");

//middlewares
app.use(cors());

//puts data in req.body
app.use(express.json());

//logger
app.use(morgan("tiny"));

// adding to avoid CORS error
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//routes

app.use("/api/v1/users", users);
app.use("/api/v1/watchlists", watchlists);
app.use("/api/v1/stocks", stocks);

// custom error handlers
app.use(notFound);
app.use(errorHandlerMiddleware);

// start func -- waits for db connect then listens to port
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening to port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

//function that keeps heroku from auto sleeping free account apps
// const wakeUp = () => {
//   setInterval(() => {
//     http.get("http://floating-lowlands-36240.herokuapp.com");
//     console.log("Wake Up Heroku!");
//   }, 174000);
// };

// wakeUp();
