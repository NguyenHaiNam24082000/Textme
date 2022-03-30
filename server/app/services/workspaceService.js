const httpStatus = require("http-status");
const { Channel, Friend, Workspace,WorkspaceMember } = require("../models");

const createWorkspace = async (user,body) => {
  const workspace = await Workspace.create({
    name: body.name,
    description: body.description,
    avatar: body.avatar,
    type: body.type,
    owner: user.id,
    tags: body.tags,
  });

  return workspace;
};

