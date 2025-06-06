const express = require("express");

const app = express();

app.get(
  "/test",
  (req, res, next) => {
    next();
    // res.send("Hello World 1!");
  },
  (req, res, next) => {
    next();
    // res.send("Hello World 2!");
  },
  (req, res) => {
    res.send("Hello World 3!");
  }
);

app.listen(7777, () => {
  console.log("Server is running on port 3000");
});
