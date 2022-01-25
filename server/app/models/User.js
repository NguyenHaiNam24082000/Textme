const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name must be required"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Username must be required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email must be required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password must be required"],
      trim: true,
      minlength: [8, "Password must be at least 8 characters"],
    },
  },
  { timestamp: true }
);

userSchema.pre("save", async function (next) {
  try {
    let user = this;
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
