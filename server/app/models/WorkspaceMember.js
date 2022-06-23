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
        type: String,
        default: "MEMBER",
        enum: [
          "MEMBER",
          "OWNER",
          "MANAGE_CHANNEL",
          "MANAGE_SERVER",
          "MANAGE_ROLES",
          "KICK_MEMBER",
          "BAN_MEMBER",
          "INVITE_MEMBER",
        ],
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
