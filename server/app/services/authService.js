const httpStatus = require("http-status");
const tokenService = require("./tokenService");
const userService = require("./userService");
const ApiError = require("../utils/ApiError");
const { tokenTypes } = require("../configs/tokens");
const Token = require("../models/Token");
// exports.register = async (req, res, next) => {
//   try {
//     const { name, username, email, password } = req.body;
//     const user = new User({
//       name,
//       username,
//       email,
//       password,
//     });
//     await user.save((err, user) => {
//       if (err) {
//         return res.status(clientErrorResponses.BadRequest.code).json({
//           status: `Error - ${clientErrorResponses.BadRequest.code} ${clientErrorResponses.BadRequest.status}`,
//           error: err,
//         });
//       }
//       const token = jwt.sign({ _id: user._id }, process.env.APP_SECRET, {
//         expiresIn: "7d",
//       });
//       return res.status(successResponses.Created.code).json({
//         status: `Success - ${successResponses.Created.code} ${successResponses.Created.status}`,
//         data: {
//           message: "User created successfully",
//           user,
//           token,
//         },
//       });
//     });
//   } catch (error) {
//     return res.status(serverErrorResponses.InternalServerError.code).json({
//       status: `Error - ${serverErrorResponses.InternalServerError.code} ${serverErrorResponses.InternalServerError.status}`,
//       error: error.message,
//     });
//   }
//   // res.status(200).json({
//   //   status: "success",
//   //   data: {
//   //     message: "User registered successfully",
//   //   },
//   // });
// };

// exports.login = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       //Error: Email not found
//       return res.status(clientErrorResponses.NotFound.code).json({
//         status: `Error - ${clientErrorResponses.NotFound.code} ${clientErrorResponses.NotFound.status}`,
//         error: "Email not found",
//       });
//     }
//     if (bcrypt.compareSync(req.body.password, user.password)) {
//       const token = jwt.sign({ _id: user._id }, process.env.APP_SECRET, {
//         expiresIn: "7d",
//       });
//       return res.status(successResponses.OK.code).json({
//         status: `Success - ${successResponses.OK.code} ${successResponses.OK.status}`,
//         data: {
//           message: "User logged in successfully",
//           user,
//           token,
//         },
//       });
//     } else {
//       //Error: Password incorrect
//       return res.status(clientErrorResponses.BadRequest.code).json({
//         status: `Error - ${clientErrorResponses.BadRequest.code} ${clientErrorResponses.BadRequest.status}`,
//         error: "Password incorrect",
//       });
//     }
//   } catch (error) {
//     return res.status(serverErrorResponses.InternalServerError.code).json({
//       status: `Error - ${serverErrorResponses.InternalServerError.code} ${serverErrorResponses.InternalServerError.status}`,
//       error: error.message,
//     });
//   }
//   // res.status(200).json({
//   //   status: "success",
//   //   data: {
//   //     message: "User logged in successfully",
//   //   },
//   // });
// };
/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    let error = {
      email: "Incorrect email or password",
      password: "Incorrect email or password",
    };
    throw new ApiError(httpStatus.UNAUTHORIZED, JSON.stringify(error));
  }
  return user;
};

const loginUserWithUsernameAndPassword = async (username, password) => {
  const user = await userService.getUserByUsername(username);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Incorrect username or password"
    );
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found");
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH
    );
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(
      resetPasswordToken,
      tokenTypes.RESET_PASSWORD
    );
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password reset failed");
  }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(
      verifyEmailToken,
      tokenTypes.VERIFY_EMAIL
    );
    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
    await userService.updateUserById(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Email verification failed");
  }
};

const changePassword = async (userId, oldPassword, newPassword) => {
  try {
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new Error();
    }
    if (!(await user.isPasswordMatch(oldPassword))) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        JSON.stringify({ password: "Incorrect password" })
      );
    }
    await userService.updateUserById(user.id, { password: newPassword });
  } catch (error) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      JSON.stringify({ password: "Password change failed" })
    );
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
  changePassword,
};
