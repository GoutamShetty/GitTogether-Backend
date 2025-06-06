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
  throw "error";
  res.send("user list");
});

app.use("/", (err, req, res, next) => {
  //error will be first parameter if we have 4 params, if we have 2, then only req, res ,if we have 3 then req,res and next
  res.status(500).send("Something went wrong!!");
});

app.listen(7777, () => {
  console.log("Server is running on port 3000");
});
