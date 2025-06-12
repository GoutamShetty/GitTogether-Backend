const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate: (value) => {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password" + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://imgs.search.brave.com/0EObu-tREBt9zvCDD-cecDdm-koQ0Zk36aXcKsxrCwM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzExLzkxLzc2Lzgy/LzM2MF9GXzExOTE3/NjgyMTJfaVZ1MXNn/TzFLVUxYd3hSZDI0/SnhtUHA1d3F6bzJK/ckcuanBn",
      validate: (value) => {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo URL: " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is default value",
    },
    skills: {
      type: [String],
      validate: (value) => {
        if (value.length > 10) {
          throw new Error("Skills cannot be more than 10");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = function () {
  //never use arrow fn
  const user = this;

  const token = jwt.sign({ id: user._id }, "DEV@Tinder$123", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = function (inputPassword) {
  //never use arrow fn
  const user = this;

  const isPasswordValid = bcrypt.compare(inputPassword, user.password);
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
