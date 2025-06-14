const express = require("express");

const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Error: " + error);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit request");
    }
    const user = req.user;

    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));

    await user.save();
    res.send({
      message: `${user.firstName}, your profile updated successfully!`,
      data: user,
    });
  } catch (error) {
    res.status(400).send("Error: " + error);
  }
});

module.exports = profileRouter;
