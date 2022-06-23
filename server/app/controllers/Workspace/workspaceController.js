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
  const workspaces = await workspaceService.getDiscoverServers(req.user);
  res.status(httpStatus.OK).send(workspaces);
});

const sendJoinServerRequest = catchAsync(async (req, res, next) => {
  const workspaces = await workspaceService.sendJoinServerRequest(
    req.user,
    req.params
  );
  res.status(httpStatus.OK).send(workspaces);
});

const cancelJoinServerRequest = catchAsync(async (req, res, next) => {
  const workspace = await workspaceService.cancelJoinServerRequest(
    req.user,
    req.params
  );
  res.status(httpStatus.OK).send(workspace);
});

const getAllInviteMembers = catchAsync(async (req, res, next) => {
  const workspace = await workspaceService.getAllInviteMembers(req, res, next);
  res.status(httpStatus.OK).send(workspace);
});

const getAllPendingMembers = catchAsync(async (req, res, next) => {
  const workspace = await workspaceService.getAllPendingMembers(req, res, next);
  res.status(httpStatus.OK).send(workspace);
});

const getAllBlockedMembers = catchAsync(async (req, res, next) => {
  const workspace = await workspaceService.getAllBlockedMembers(req, res, next);
  res.status(httpStatus.OK).send(workspace);
});

module.exports = {
  createServer,
  getAllWorkspaces,
  createWorkspaceChannel,
  inviteMember,
  getDiscoverServers,
  sendJoinServerRequest,
  cancelJoinServerRequest,
  getAllInviteMembers,
  getAllPendingMembers,
  getAllBlockedMembers,
};
