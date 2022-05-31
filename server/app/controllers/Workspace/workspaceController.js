const httpStatus = require("http-status");
const { workspaceService } = require("../../services");
const catchAsync = require("../../utils/catchAsync");
const pick = require("../../utils/pick");

const createServer = catchAsync(async (req, res, next) => {
  const workspace = await workspaceService.createWorkspace(req.user, req.body);
  res.status(httpStatus.CREATED).send(workspace);
});

const getAllWorkspaces = catchAsync(async (req, res, next) => {
  const workspaces = await workspaceService.getAllWorkspaces(req.user);
  res.status(httpStatus.OK).send(workspaces);
});

const createWorkspaceChannel = catchAsync(async (req, res, next) => {
  const channel = await workspaceService.createWorkspaceChannel(
    req.user,
    req.params,
    req.body
  );
  res.status(httpStatus.CREATED).send(channel);
});

const inviteMember = catchAsync(async (req, res, next) => {
  const workspace = await workspaceService.inviteMember(
    req.user,
    req.params,
    req.body
  );
  res.status(httpStatus.CREATED).send(workspace);
});

const getDiscoverServers = catchAsync(async (req, res, next) => {
  const workspaces = await workspaceService.getDiscoverServers();
  res.status(httpStatus.OK).send(workspaces);
});

module.exports = {
  createServer,
  getAllWorkspaces,
  createWorkspaceChannel,
  inviteMember,
  getDiscoverServers,
};
