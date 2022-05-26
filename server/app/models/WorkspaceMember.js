const mongoose = require("mongoose");

const workspaceMemberSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
    },
    roles: [
      {
        type: mongoose.Schema.Types.Mixed,
        default: "MEMBER",
      },
    ],
    status: {
      type: String,
      enum: [
        "PENDING",
        "INVITED",
        "JOINED",
        "BLOCKED",
        "LEFT",
        "BANNED",
        "KICKED",
      ],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const WorkspaceMember = mongoose.model(
  "WorkspaceMember",
  workspaceMemberSchema
);

module.exports = WorkspaceMember;
