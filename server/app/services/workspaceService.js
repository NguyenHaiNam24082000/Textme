const httpStatus = require("http-status");
const { Channel, Workspace, WorkspaceMember } = require("../models");

const createWorkspace = async (user, body) => {
  const channel = await Channel.create({
    name: "general",
    type: "TEXT",
    owner: user.id,
  });
  console.log(channel);
  const workspace = await Workspace.create({
    name: body.name,
    description: body.description,
    avatar: body.avatar,
    type: body.type,
    owner: user.id,
    tags: body.tags,
    channels: {
      channel: channel.id,
      position: 0,
    },
  });
  console.log(workspace);
  await WorkspaceMember.create({
    workspace: workspace.id,
    user: user.id,
    roles: "OWNER",
  });

  return workspace;
};

const getAllWorkspaces = async (user) => {
  const workspaces = await Workspace.find({
    $or: [{ owner: user.id }, { members: user.id }],
  }).populate([
    {
      path: "channels",
      populate: {
        path: "channel",
      },
    },
  ]);
  return workspaces;
};

const createWorkspaceChannel = async (user, params, body) => {
  const channel = await Channel.create({
    name: body.name,
    type: body.type,
    owner: user.id,
  });
  const workspace = await Workspace.findById(params.serverId);
  workspace.channels.push({
    channel: channel._id,
    position: workspace.channels.length,
  });
  await workspace.save();
  return channel;
};

module.exports = {
  createWorkspace,
  getAllWorkspaces,
  createWorkspaceChannel,
};
