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
  const filter = pick(req.body, ["username", "discriminator", "role"]);
  const options = pick(req.body, ["sortBy", "limit", "page"]);
  const users = await userService.queryUsers(filter, options);
  res.status(httpStatus.OK).send(users);
});

module.exports = {
  allUsers,
  getUsers,
};
