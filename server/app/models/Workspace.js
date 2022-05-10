const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name must be required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      // default: "https://i.imgur.com/X2JhY8y.png",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    banner: {
      type: String,
      // default: "https://i.imgur.com/X2JhY8y.png",
    },
    type: {
      type: String,
      enum: ["PUBLIC", "PRIVATE", "SECRET"],
      default: "PUBLIC",
    },
    nsfw_level: {
      type: String,
      enum: ["DEFAULT", "EXPLICIT", "SAFE", "AGE_RESTRICTED"],
      default: "DEFAULT",
    },
    max_members: {
      type: Number,
      default: 100,
    },
    channels: [
      {
        _id: false,
        channel: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Channel",
        },
        position: {
          type: Number,
          min: [0, "Position must be greater than 0"],
        },
      },
    ],
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WorkspaceMember",
      },
    ],
    verification_level: {
      type: String,
      enum: ["DEFAULT", "LOW", "MEDIUM", "HIGH", "VERY_HIGH"],
      default: "DEFAULT",
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// workspaceSchema.virtual("membersCount", {
//     ref: "User",
//     localField: "_id",
//     foreignField: "workspaces",
//     count: true
// });

const Workspace = mongoose.model("Workspace", workspaceSchema);

module.exports = Workspace;
