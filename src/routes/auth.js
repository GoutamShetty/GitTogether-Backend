const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("Invalid credential");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 3600000),
      });

      res.send("Login Successful!");
    } else {
      throw new Error("Invalid credential");
    }
  } catch (error) {
    res.status(400).send("error while login" + error);
  }
});

authRouter.post("/logout", (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .send("Logged out successfully!");
});

module.exports = authRouter;
