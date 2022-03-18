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
      default: "https://i.imgur.com/X2JhY8y.png",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    banner: {
      type: String,
      default: "https://i.imgur.com/X2JhY8y.png",
    },
    tags: [
      {
        type: String,
      },
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamp: true }
);

// workspaceSchema.virtual("membersCount", {
//     ref: "User",
//     localField: "_id",
//     foreignField: "workspaces",
//     count: true
// });

const Workspace = mongoose.model("Workspace", workspaceSchema);

module.exports = Workspace;
