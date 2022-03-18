const httpStatus = require("http-status");
const { userService } = require("../../services");
const catchAsync = require("../../utils/catchAsync");

const allUser = catchAsync(async (req, res, next) => {
  const users = await userService.getAllUsers();
  res.status(httpStatus.OK).send(users);
});

module.exports = {
  allUser,
};
