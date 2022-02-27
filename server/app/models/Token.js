const mongoose = require("mongoose");
const { toJSON } = require("./plugins");
const { tokenTypes } = require("../configs/tokens");

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [
        tokenTypes.REFRESH,
        tokenTypes.RESET_PASSWORD,
        tokenTypes.VERIFY_EMAIL,
      ],
      required: true,
    },
    expiresAt: {
      type: Date,
      // required: true,
    },
    maxUsages: {
      type: Number,
      default: 1,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamp: true,
  }
);

// add plugin that converts mongoose to json
// tokenSchema.plugin(toJSON);

/**
 * @typedef Token
 */
const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
