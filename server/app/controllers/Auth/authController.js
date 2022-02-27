const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  clientErrorResponses,
  successResponses,
  serverErrorResponses,
} = require("../../configs/statusCodes");

const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  const userInfo = JSON.parse(JSON.stringify(user));
  delete userInfo.password;
  res.send({ user: userInfo, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  res.status(httpStatus.NO_CONTENT).send(resetPasswordToken);
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

// const sendVerificationEmail = catchAsync(async (req, res) => {
//   console.log(req);
//   const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
//   res.status(httpStatus.NO_CONTENT).send(verifyEmailToken);
// });

const sendVerificationEmail = catchAsync(async (req, res) => {
  console.log(req,"req");
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  console.log("hahah",verifyEmailToken);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};