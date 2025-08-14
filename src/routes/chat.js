const express = require("express");
const { userAuth } = require("../middleware/auth");
const { Chat } = require("../models/chat");
const chatRouter = express.Router();

chatRouter.get("/chats/:targetUserId", userAuth, async (req, res) => {
  try {
    const { targetUserId } = req.params;
    const userId = req.user._id;

    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate({
      path: "messages.senderId",
      select: "firstName lastName photoUrl",
    });
    if (!chat) {
      chat = await new Chat({
        participants: [userId, targetUserId],
        messages: [],
      });
    }
    await chat.save();
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = chatRouter;
