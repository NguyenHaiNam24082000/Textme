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
    role: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Role",
      default: [],
      required: [true, "Role must be required"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamp: true }
);

const WorkspaceMember = mongoose.model("WorkspaceMember", workspaceMemberSchema);

module.exports = WorkspaceMember;