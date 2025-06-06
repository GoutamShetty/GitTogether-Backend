const express = require("express");

const { adminAuth, userAuth } = require("./middleware/auth");

const app = express();

app.use("/admin", adminAuth);

app.get("/admin/list", (req, res) => {
  res.send("sending list");
});

app.post("/admin/list", (req, res) => {
  res.send("added list");
});

app.get("/user/login", (req, res) => {
  res.send("login page");
}); //for login not required auth

app.get("/user/list", userAuth, (req, res) => {
  res.send("user list");
});

app.listen(7777, () => {
  console.log("Server is running on port 3000");
});
