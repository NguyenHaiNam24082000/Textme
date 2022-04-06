const httpStatus = require("http-status");
const { channelService } = require("../../services");
const catchAsync = require("../../utils/catchAsync");

const getOrCreateDMChannel = catchAsync(async (req, res) => {
  // console.log(req.user, req.body, "aaaaaaaaaa");
  const channel = await channelService.createDMChannel(req.user, req.body);
  res.status(httpStatus.CREATED).send(channel);
});

const getDMChannels = catchAsync(async (req, res) => {
  const channels = await channelService.getAllDMChannels(req.user);
  res.status(httpStatus.OK).send(channels);
});

const getGroupChannels = catchAsync(async (req, res) => {
  const channels = await channelService.getAllGroupChannels(req.user);
  res.status(httpStatus.OK).send(channels);
});

const createGroupChannel = catchAsync(async (req, res) => {
  const channel = await channelService.createGroupChannel(req.user, req.body);
  res.status(httpStatus.CREATED).send(channel);
});

// const getAllDMChannels = catchAsync(async (req, res) => {
//   const channels = await getAllDMChannels(req.user);
//   res.status(httpStatus.OK).send(channels);
// })

const getExistingGroupChannels = catchAsync(async (req, res) => {
  const channels = await channelService.alreadyInGroupChannel(
    req.user,
    req.body
  );
  res.status(httpStatus.OK).send(channels);
});

const getPinnedMessage = catchAsync(async (req, res, next) => {
  const { channelId } = req.params;
  const messages = await channelService.getPinnedMessage(req.user, channelId);
  res.status(httpStatus.OK).send(messages);
});

const pinnedMessage = catchAsync(async (req, res, next) => {
  const result = await channelService.pinnedMessage(req.user, req.params);
  res.status(httpStatus.OK).send(result);
});

const reactionMessage = catchAsync(async (req, res, next) => {
  const result = await channelService.reactionMessage(req.user, req.params);
  res.status(httpStatus.OK).send(result);
});

module.exports = {
  getOrCreateDMChannel,
  getDMChannels,
  getGroupChannels,
  getExistingGroupChannels,
  createGroupChannel,
  getPinnedMessage,
  pinnedMessage,
  reactionMessage,
};
