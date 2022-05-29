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

module.exports = {
  allUsers,
  getUsers,
};
