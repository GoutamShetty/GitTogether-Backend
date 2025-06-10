const express = require("express");
const bcrypt = require("bcrypt");

const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(400).send("error while saving" + error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("Invalid credential");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid, password, user);
    if (isPasswordValid) {
      res.send("Login Successful!");
    } else {
      throw new Error("Invalid credential");
    }
  } catch (error) {
    res.status(400).send("error while login" + error);
  }
});

app.get("/user", async (req, res) => {
  try {
    const userEmail = req.body.emailId;
    const user = await User.find({ emailId: userEmail });
    if (user.length === 0) {
      res.status(400).send("No user found");
    }
    res.send(user);
  } catch (error) {
    res.status(500).send("Something went wrong " + error);
  }
});

app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully!");
  } catch (error) {
    res.status(500).send("Something went wrong " + error);
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;

  try {
    const data = req.body;
    const ALLOWED_UPDATES = [
      "emailId",
      "photoUrl",
      "about",
      "skills",
      "age",
      "gender",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("User updated Successfully!");
  } catch (error) {
    res.status(500).send("Update failed: " + error);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (error) {
    res.status(500).send("Something went wrong" + error);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(7777, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => console.log("DB cannot be connected", err));
