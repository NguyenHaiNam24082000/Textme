const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema(
  {
    savedMessages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    savedLinks: [
      {
        type: String,
      },
    ],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    name: {
      type: String,
      required: [true, "Name must be required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    position: {
      type: Number,
      min: [0, "Position must be greater than 0"],
    },
    type: {
      type: String,
      enum: ["TEXT", "VOICE", "DM", "GROUP"],
      required: [true, "Type must be required"],
      validate: [
        /^(TEXT|VOICE|DM|GROUP)$/,
        "Type must be TEXT, VOICE, DM or GROUP",
      ],
    },
    avatar: {
      type: String,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
    },
    nsfw: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamp: true }
);

const Channel = mongoose.model("Channel", channelSchema);

module.exports = Channel;