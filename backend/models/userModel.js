const crypto = require("crypto"); //built-in module for generating token
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please entered the name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please entered the email"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "pls entered valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "pls entered the password "],
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  confirmPassword: {
    type: String,
    required: [true, "pls entered the same password as the password"],
    minlength: 8,
    validate: {
      //// this only work on create and save
      validator: function (val) {
        return this.password === val;
      },
      message: "Passwords are not the same",
    },
  },
});

// / creating the encryption of the password
userSchema.pre("save", async function (next) {
  // only run in the case when the password was actully modified
  if (!this.isModified("password")) return next();
  // hashing the password with the cpy cost 12
  this.password = await bcrypt.hash(this.password, 12);
  // delete the password confirm field
  this.confirmPassword = undefined;
  next();
});
/// creating the decryption of the password
// this method is instance method its mean its available in whole file
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
