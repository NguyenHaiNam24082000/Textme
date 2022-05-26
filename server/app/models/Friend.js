const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const friendSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: [
        "PENDING",
        "BLOCKED",
        "FRIEND",
        "BLOCKED_BY_SENDER",
        "BLOCKED_BY_RECEIVER",
      ],
      default: "PENDING",
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// add plugin that converts mongoose to json
friendSchema.plugin(toJSON);
friendSchema.plugin(paginate);

const Friend = mongoose.model("Friend", friendSchema);

module.exports = Friend;
