const httpStatus = require("http-status");

const friendService = require("../../services/friendService");
const catchAsync = require("../../utils/catchAsync");

const getAllFriends = catchAsync(async (req, res, next) => {
  const friends = await friendService.getAllFriends(req.user);
  res.status(httpStatus.OK).send(friends);
});

const getPendingRequests = catchAsync(async (req, res, next) => {
  const pendingRequests = await friendService.getPendingRequests(req.user);
  res.status(httpStatus.OK).send(pendingRequests);
});

const outGoingRequests = catchAsync(async (req, res, next) => {
  const outGoingRequests = await friendService.outGoingRequests(req.user);
  res.status(httpStatus.OK).send(outGoingRequests);
});

const createFriendRequest = catchAsync(async (req, res, next) => {
  const friendRequest = await friendService.createFriendRequest(
    req.user,
    req.body
  );
  res.status(httpStatus.CREATED).send(friendRequest);
});

const cancelPendingRequest = catchAsync(async (req, res, next) => {
  const friendRequest = await friendService.cancelPendingRequest(req.body.id);
  res.status(httpStatus.OK).send(friendRequest);
});

const acceptPendingRequest = catchAsync(async (req, res, next) => {
  const friendRequest = await friendService.acceptPendingRequest(
    req.user,
    req.body.id
  );
  res.status(httpStatus.OK).send(friendRequest);
});

const blockFriendRequest = catchAsync(async (req, res, next) => {
  const friendRequest = await friendService.blockFriendRequest(
    req.user,
    req.body.id
  );
  res.status(httpStatus.OK).send(friendRequest);
});

const getAllBlockedFriends = catchAsync(async (req, res, next) => {
  const blockedFriends = await friendService.getAllBlockedFriends(req.user);
  res.status(httpStatus.OK).send(blockedFriends);
});

const unblockFriendRequest = catchAsync(async (req, res, next) => {
  const friendRequest = await friendService.unblockFriendRequest(
    req.user,
    req.body.id
  );
  res.status(httpStatus.OK).send(friendRequest);
});

module.exports = {
  getAllFriends,
  getPendingRequests,
  outGoingRequests,
  createFriendRequest,
  cancelPendingRequest,
  acceptPendingRequest,
  blockFriendRequest,
  getAllBlockedFriends,
  unblockFriendRequest,
};
