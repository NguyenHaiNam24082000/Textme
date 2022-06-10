const httpStatus = require("http-status");
const { userService } = require("../../services");
const catchAsync = require("../../utils/catchAsync");
const pick = require("../../utils/pick");

const allUsers = catchAsync(async (req, res, next) => {
  const users = await userService.getAllUsers();
  res.status(httpStatus.OK).send(users);
});

const getUsers = catchAsync(async (req, res) => {
  // console.log("aaaaaa",req);
  // const [name, discriminator] = req.params.split("#");
  // const filter = {
  //   username: name,
  //   discriminator: discriminator,
  // };
  // const options = pick(req.body, ["sortBy", "limit", "page"]);
  // const users = await userService.queryUsers(filter, options);
  const { q } = req.query;
  const [name, discriminator] = q.split("#");
  const filter = {
    username: name,
    discriminator: discriminator,
  };
  const users = await userService.queryUsers(req.user, filter);
  res.status(httpStatus.OK).send(users);
});

const getMutualUserIds = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userIds = await userService.getMutualUserIds(req.user.id, id);
  res.status(httpStatus.OK).send(userIds);
});

const getMutualChannelIds = catchAsync(async (req, res) => {
  const { id } = req.params;
  const channelIds = await userService.getMutualChannelIds(req.user.id, id);
  res.status(httpStatus.OK).send(channelIds);
});

const getMutualServerIds = catchAsync(async (req, res) => {
  const { id } = req.params;
  const serverIds = await userService.getMutualServerIds(req.user.id, id);
  res.status(httpStatus.OK).send(serverIds);
});

const getMutual = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await userService.getMutualUserIds(req.user.id, id);
  const channel = await userService.getMutualChannelIds(req.user.id, id);
  const server = await userService.getMutualServerIds(req.user.id, id);
  res.status(httpStatus.OK).send({ user, channel, server });
});

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  res.status(httpStatus.OK).send(user);
};

const editUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.updateUserById(id, req.body);
  res.status(httpStatus.OK).send(user);
};

module.exports = {
  allUsers,
  getUsers,
  getMutualUserIds,
  getMutualChannelIds,
  getMutualServerIds,
  getMutual,
  getUserById,
  editUserById,
};
