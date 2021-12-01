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
require("dotenv").config();
//custom error handle
const notFound = require("./middlewares/not-found.js");
const errorHandlerMiddleware = require("./middlewares/error-handler");

// logger middleware
const morgan = require("morgan");
// cors fix for local
const cors = require("cors");
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(cors());

//middlewares
//puts data in req.body

app.use(express.json());

//routes
app.use(morgan("tiny"));
app.use("/api/v1/users", users);
app.use("/api/v1/watchlists", watchlists);
app.use("/api/v1/stocks", stocks);
app.use(notFound);
app.use(errorHandlerMiddleware);

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

const wakeUp = () => {
  setInterval(() => {
    http.get("http://floating-lowlands-36240.herokuapp.com");
    console.log("Wake Up Heroku!");
  }, 300000);
};

wakeUp();
