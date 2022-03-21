const httpStatus = require("http-status");
const {
  createDMChannel,
  createTextChannel,
  createVoiceChannel,
  getAllDMChannels,
  getAllGroupChannels,
} = require("../../services/channelService");
const catchAsync = require("../../utils/catchAsync");

const getOrCreateDMChannel = catchAsync(async (req, res) => {
  // console.log(req.user, req.body, "aaaaaaaaaa");
  const channel = await createDMChannel(req.user, req.body);
  res.status(httpStatus.CREATED).send(channel);
});

const getDMChannels = catchAsync(async (req, res) => {
  const channels = await getAllDMChannels(req.user);
  res.status(httpStatus.OK).send(channels);
});

const getGroupChannels = catchAsync(async (req, res) => {
  const channels = await getAllGroupChannels(req.user);
  res.status(httpStatus.OK).send(channels);
})

// const getAllDMChannels = catchAsync(async (req, res) => {
//   const channels = await getAllDMChannels(req.user);
//   res.status(httpStatus.OK).send(channels);
// })

module.exports = {
  getOrCreateDMChannel,
  getDMChannels,
  getGroupChannels,
};
