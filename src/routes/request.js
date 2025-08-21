const express = require("express");

const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const sendEmail = require("../utils/sendEmail");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const toUserId = req.params.toUserId;
      const fromUserId = req.user._id;
      const status = req.params.status;

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res
          .status(400)
          .json({ message: `User doesn't exists: ${toUserId}` });
      }

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: `Invalid status type: ${status}` });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection request already exists!" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      const emailRes = await sendEmail.run(
        "A new frnd req from " + req.user.firstName,
        req.user.firstName + status + toUser.firstName
      );

      res.json({
        message: req.user.firstName + status + toUser.firstName,
        data,
      });
    } catch (error) {
      res.status(400).send("Error: " + error);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Status not allowed!" });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection request not found" });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();

      res.json({
        message: req.user.firstName + status,
        data,
      });
    } catch (error) {
      res.status(400).send("Error: " + error);
    }
  }
);

module.exports = requestRouter;
