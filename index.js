const express = require("express");
const http = require("http");
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("welcome to home");
});

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(PORT, () => {
  console.log("server is listening on port 5000....");
});

const wakeUp = () => {
  setInterval(() => {
    http.get("http://floating-lowlands-36240.herokuapp.com");
    console.log("Wake Up Heroku!");
  }, 300000);
};

wakeUp();
