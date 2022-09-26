const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },

  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please use a valid email address",
    ],
  },

  role: {
    type: String,
    enum: ["user", "publisher", "admin"],
    default: "user",
  },

  password: {
    type: String,
    required: [true, "Please add a password"],
    minLength: 6,
    select: false,
  },

  resetPasswordToken: String,

  resetPasswordExpire: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//sign jwt and return
UserSchema.methods.getSignedWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//match password to hashed password
UserSchema.methods.matchPassword = async function (matchedPassword) {
  return await bcrypt.compare(matchedPassword, this.password);
};

//generate and hash reset token
UserSchema.methods.getResetToken = function () {
  //get token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //hash token and set to resetPassword field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //set resetPasswordExpire field
  this.resetPasswordExpire = Date.now() + 10 * 60 * 60;
};

module.exports = mongoose.model("User", UserSchema);
