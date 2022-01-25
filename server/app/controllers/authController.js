const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  clientErrorResponses,
  successResponses,
  serverErrorResponses,
} = require("../configs/statusCodes");

exports.register = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    const user = new User({
      name,
      username,
      email,
      password,
    });
    await user.save((err, user) => {
      if (err) {
        return res.status(clientErrorResponses.BadRequest.code).json({
          status: `Error - ${clientErrorResponses.BadRequest.code} ${clientErrorResponses.BadRequest.status}`,
          error: err,
        });
      }
      const token = jwt.sign({ _id: user._id }, process.env.APP_SECRET, {
        expiresIn: "7d",
      });
      return res.status(successResponses.Created.code).json({
        status: `Success - ${successResponses.Created.code} ${successResponses.Created.status}`,
        data: {
          message: "User created successfully",
          user,
          token,
        },
      });
    });
  } catch (error) {
    return res.status(serverErrorResponses.InternalServerError.code).json({
      status: `Error - ${serverErrorResponses.InternalServerError.code} ${serverErrorResponses.InternalServerError.status}`,
      error: error.message,
    });
  }
  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     message: "User registered successfully",
  //   },
  // });
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      //Error: Email not found
      return res.status(clientErrorResponses.NotFound.code).json({
        status: `Error - ${clientErrorResponses.NotFound.code} ${clientErrorResponses.NotFound.status}`,
        error: "Email not found",
      });
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ _id: user._id }, process.env.APP_SECRET, {
        expiresIn: "7d",
      });
      return res.status(successResponses.OK.code).json({
        status: `Success - ${successResponses.OK.code} ${successResponses.OK.status}`,
        data: {
          message: "User logged in successfully",
          user,
          token,
        },
      });
    } else {
      //Error: Password incorrect
      return res.status(clientErrorResponses.BadRequest.code).json({
        status: `Error - ${clientErrorResponses.BadRequest.code} ${clientErrorResponses.BadRequest.status}`,
        error: "Password incorrect",
      });
    }
  } catch (error) {
    return res.status(serverErrorResponses.InternalServerError.code).json({
      status: `Error - ${serverErrorResponses.InternalServerError.code} ${serverErrorResponses.InternalServerError.status}`,
      error: error.message,
    });
  }
  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     message: "User logged in successfully",
  //   },
  // });
};
