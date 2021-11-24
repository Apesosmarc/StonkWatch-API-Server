const express = require("express");
const http = require("http");
const app = express();
const PORT = process.env.PORT || 5000;
const users = require("./routes/users");
// DB
const connectDB = require("./db/connect");
require("dotenv").config();

//middlewares
//puts data in req.body
app.use(express.json());
//routes
app.use("/api/v1/users", users);

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

app.get("/", (req, res) => {
  res.send("welcome to home");
});

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

const wakeUp = () => {
  setInterval(() => {
    http.get("http://floating-lowlands-36240.herokuapp.com");
    console.log("Wake Up Heroku!");
  }, 300000);
};

wakeUp();
