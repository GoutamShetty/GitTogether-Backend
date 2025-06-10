const mongoose = require("mongoose");

const url =
  "mongodb+srv://goutamshetty1:Goma18is@node.zkf4rb4.mongodb.net/devTinder";

const connectDB = async () => {
  await mongoose.connect(url);
};

module.exports = connectDB;
