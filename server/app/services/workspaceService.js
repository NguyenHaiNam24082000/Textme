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
    status: "JOINED",
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
  const position =
    Math.max(
      workspace.channels.map((channel) =>
        Number(channel.position.split("-")[0])
      )
    ) + 1;
  workspace.channels.push({
    channel: channel._id,
    position: `${position}`,
  });
  await workspace.save();
  return channel;
};

const getDiscoverServers = async (user) => {
  //join workspace with status workspace member pending
  const servers = await Workspace.aggregate([
    {
      $match: {
        type: { $in: ["PUBLIC", "PRIVATE"] },
      },
    },
    {
      $lookup: {
        from: "workspacemembers",
        localField: "_id",
        foreignField: "workspace",
        as: "members",
      },
    },
    {
      $addFields: {
        totalMembers: { $size: "$members" },
        //get all status from status of members where user is current user
        me: {
          $filter: {
            input: "$members",
            as: "member",
            cond: { $eq: ["$$member.user", user._id] },
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        avatar: 1,
        type: 1,
        owner: 1,
        tags: 1,
        totalMembers: 1,
        // members: {
        //   $filter: {
        //     input: "$members",
        //     as: "member.id",

        //     // cond: { $eq: ["$$member.status", "PENDING"] },
        //   },
        // },
        meStatus: {
          $cond: {
            if: { $eq: ["$me", []] },
            then: "NOT_MEMBER",
            else: {
              $arrayElemAt: ["$me.status", 0],
            },
          },
        },
      },
    },
  ]);

  // const servers = await Workspace.find({
  //   type: { $in: ["PUBLIC", "PRIVATE"] },
  // })
  //   .sort({ membersCount: -1 })
  //   .limit(24);
  return servers;
};

const searchDiscoverServers = async () => {
  const servers = await Workspace.find({});
  return servers;
};

const inviteMember = async (user, params, body) => {
  const { workspaceId } = params;
  const { receiver } = body;
  const workspace = await Workspace.findOne({
    _id: workspaceId,
    $or: [{ owner: user.id }, { members: user.id }],
  });
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, "Workspace not found");
  }
  const alreadyMember = await WorkspaceMember.findOne({
    workspace: workspaceId,
    user: receiver,
  });
  let member;
  if (!alreadyMember) {
    member = await WorkspaceMember.create({
      workspace: workspace._id,
      user: receiver,
      roles: "MEMBER",
      status: "INVITED",
    });
  } else {
    member = alreadyMember;
    return member;
  }

  return member;
};

const sendJoinServerRequest = async (user, params, body) => {
  const { workspaceId } = params;
  const { sender } = body;
  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, "Workspace not found");
  }
  const alreadyMember = await WorkspaceMember.findOne({
    workspace: workspaceId,
    user: receiver,
  });
  let member;
  if (!alreadyMember) {
    member = await WorkspaceMember.create({
      workspace: workspace._id,
      user: receiver,
      roles: "MEMBER",
      status: "PENDING",
    });
  } else {
    member = alreadyMember;
    // return member;
  }
  return member;
};

const acceptJoinServerRequest = async (user, params, body) => {
  const { workspaceId } = params;
  const { sender } = body;
  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, "Workspace not found");
  }
  const member = await WorkspaceMember.findOne({
    workspace: workspace._id,
    user: sender,
    status: "PENDING",
  });
  if (!member) {
    throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
  }
  member.status = "ACCEPTED";
  await member.save();
  return member;
};

const leftServer = async (user, params) => {
  const { workspaceId } = params;
  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, "Workspace not found");
  }
  const member = await WorkspaceMember.findOne({
    workspace: workspace._id,
    user: user.id,
  });
  if (!member) {
    throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
  }
  member.status = "LEFT";
  await member.save();
  return member;
};

const kickMember = async (user, params, body) => {
  const { workspaceId } = params;
  const { receiver } = body;
  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, "Workspace not found");
  }
  const member = await WorkspaceMember.findOne({
    workspace: workspace._id,
    user: receiver,
  });
  if (!member) {
    throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
  }
  member.status = "KICKED";
  await member.save();
  return member;
};

const blockedMember = async (user, params, body) => {
  const { workspaceId } = params;
  const { receiver } = body;
  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, "Workspace not found");
  }
  const member = await WorkspaceMember.findOne({
    workspace: workspace._id,
    user: receiver,
  });
  if (!member) {
    throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
  }
  member.status = "BLOCKED";
  await member.save();
  return member;
};

const bannedMember = async (user, params, body) => {
  const { workspaceId } = params;
  const { receiver } = body;
  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, "Workspace not found");
  }
  const member = await WorkspaceMember.findOne({
    workspace: workspace._id,
    user: receiver,
  });
  if (!member) {
    throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
  }
  member.status = "BANNED";
  await member.save();
  return member;
};

const setupRoles = async (user, params, body) => {
  const { workspaceId } = params;
  const { receiver, roles } = body;
  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, "Workspace not found");
  }
  const member = await WorkspaceMember.findOne({
    workspace: workspace._id,
    user: receiver,
  });
  if (!member) {
    throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
  }
  member.roles = roles;
  await member.save();
  return member;
};

module.exports = {
  createWorkspace,
  getAllWorkspaces,
  createWorkspaceChannel,
  inviteMember,
  getDiscoverServers,
  sendJoinServerRequest,
};
