const express = require("express");

const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const userRouter = express.Router();

const USER_REQ_DATA = [
  "firstName",
  "lastName",
  "gender",
  "skills",
  "about",
  "photoUrl",
];

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const data = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_REQ_DATA);

    res.json({
      message: "Data fetched successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error" + error,
    });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const allData = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_REQ_DATA)
      .populate("toUserId", USER_REQ_DATA);

    const data = allData.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      } else {
        return row.fromUserId;
      }
    });

    res.json({
      message: "Data fetched successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error" + error,
    });
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) ?? 1;
    let limit = parseInt(req.query.limit) ?? 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const user = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_REQ_DATA)
      .skip(skip)
      .limit(limit);

    res.json({
      message: "Data fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error" + error,
    });
  }
});

module.exports = userRouter;
