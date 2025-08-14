const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");
const ConnectionRequestModal = require("../models/connectionRequest");

const generateRoomId = ({ userId, targetUserId }) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", (data) => {
      const { userId, targetUserId } = data;
      const roomId = generateRoomId({ userId, targetUserId });
      socket.join(roomId);
    });
    socket.on("sendMessage", async (data) => {
      const {
        firstName,
        lastName,
        userId,
        targetUserId,
        text,
        createdAt,
        photoUrl,
      } = data;

      try {
        const roomId = generateRoomId({ userId, targetUserId });

        const connectionRequest = await ConnectionRequestModal.findOne({
          $or: [
            { fromUserId: userId, toUserId: targetUserId },
            { fromUserId: targetUserId, toUserId: userId },
          ],
          status: "accepted",
        });
        if (!connectionRequest) {
          return;
        }

        let chat = await Chat.findOne({
          participants: { $all: [userId, targetUserId] },
        });
        if (!chat) {
          chat = await new Chat({
            participants: [userId, targetUserId],
            messages: [],
          });
        }

        chat.messages.push({
          senderId: userId,
          text,
        });

        await chat.save();

        io.to(roomId).emit("messageReceived", {
          firstName,
          lastName,
          text,
          userId,
          createdAt,
          photoUrl,
        });
      } catch (error) {
        console.log(error);
      }
    });
    socket.on("disconnect", (data) => {
      socket.leave(data.roomId);
      socket.broadcast.emit("userLeft", data.username);
    });
  });
};

module.exports = initializeSocket;
