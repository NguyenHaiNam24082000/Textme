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
      enum: ["PENDING", "BLOCKED", "FRIEND"],
      default: "PENDING",
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
friendSchema.plugin(toJSON);
friendSchema.plugin(paginate);

const Friend = mongoose.model("Friend", friendSchema);

module.exports = Friend;
