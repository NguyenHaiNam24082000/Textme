const httpStatus = require("http-status");
const { User, Friend } = require("../models");
const { FRIEND_STATUS } = require("../configs/friendStatus");
const ApiError = require("../utils/ApiError");

/**
 * Create a friend request
 * @param {Object} user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createFriendRequest = async (user, userBody) => {
  const { username, discriminator } = userBody;

  const foundUser = await User.findOne({ username, discriminator });

  if (!foundUser) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Hm, didn't work. Double check that the capitalization, spelling, any spaces, and numbers are correct.`
    );
  }

  if (foundUser._id.toString() === user.id.toString()) {
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      `You cannot invite yourself!`
    );
  }

  const alreadyRequest = await Friend.findOne({
    sender: user.id,
    receiver: foundUser._id,
  });

  if (alreadyRequest) {
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      "You already send the request"
    );
  }

  const friendRequest = await Friend.create({
    sender: user.id,
    receiver: foundUser._id,
  });

  return friendRequest;
};

/**
 * get pending friend requests
 * @param {Object} user
 * @returns {Promise<User>}
 */
const pendingFriendRequests = async (user) => {
  const friendRequest = await Friend.find({
    receiver: user.id,
    status: FRIEND_STATUS.PENDING,
  })
    .populate({ path: "receiver" })
    .populate({ path: "sender" });

  return friendRequest;
};

/**
 * get outgoing friend requests
 * @param {Object} user
 * @returns {Promise<User>}
 */
const outGoingRequests = async (user) => {
  const friendRequest = await Friend.find({
    sender: user.id,
    status: FRIEND_STATUS.PENDING,
  })
    .populate({ path: "receiver" })
    .populate({ path: "sender" });

  return friendRequest;
};

/**
 * accept friend request
 * @param {ObjectId} requestId
 * @returns {Promise<User>}
 */
const cancelPendingRequest = async (requestId) => {
  const deletedRequest = await Friend.findByIdAndRemove({ _id: requestId });

  return deletedRequest;
};

/**
 * accept friend request
 * @param {ObjectId} requestId
 * @returns {Promise<User>}
 */
const acceptPendingRequest = async (user, requestId) => {
  const friendRequest = await Friend.findById({ _id: requestId });

  if (friendRequest.status !== FRIEND_STATUS.PENDING) {
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      "Request status is not correct"
    );
  }

  if (user.id.toString() !== friendRequest.receiver.toString()) {
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      "You cant accept friend request"
    );
  }

  friendRequest.status = FRIEND_STATUS.FRIEND;
  const result = await friendRequest.save();

  return result;
};

/**
 * get all friends
 * @param {ObjectId} requestId
 * @returns {Promise<User>}
 */
const getAllFriends = async (user) => {
  const friends = await Friend.find({
    $or: [{ receiver: user.id }, { sender: user.id }],
    status: FRIEND_STATUS.FRIEND,
  })
    .populate({ path: "receiver" })
    .populate({ path: "sender" });

  return friends;
};

const getPendingRequests = async (user) => {
  const pendingRequests = await Friend.find({
    receiver: user.id,
    status: FRIEND_STATUS.PENDING,
  })
    .populate({ path: "receiver" })
    .populate({ path: "sender" });

  return pendingRequests;
};

module.exports = {
  createFriendRequest,
  pendingFriendRequests,
  outGoingRequests,
  cancelPendingRequest,
  acceptPendingRequest,
  getAllFriends,
  getPendingRequests,
};
