const httpStatus = require("http-status");
const Channel = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a channel
 * @param {Object} user
 * @param {Object} body
 * @returns {Promise<User>}
 */
const createChannel = async (user, body) => {
  const { name, description } = body;

  const channel = await Channel.create({
    name,
    description,
    owner: user._id,
  });

  return channel;
};

/**
 * Create a DM channel between a user and a friend
 * @param {Object} user
 * @param {Object} body
 * @returns {Promise<User>}
 */
const createDM = async (user, body) => {
  const { friendId, name, description } = body;
  const alreadyInChannel = await alreadyInDMChannel(user, friendId);
  if (alreadyInChannel) {
    return alreadyInChannel;
  }
  const channel = await Channel.create({
    name,
    description,
    owner: user._id,
    members: [user._id, friendId],
  });
  return channel;
};

const alreadyInDMChannel = async (user, friend) => {
  const channel = await Channel.findOne({
    $or: [
      { owner: user._id, members: friend._id },
      { owner: friend._id, members: user._id },
    ],
  });
  return channel;
};

/**
 * Query for Channel
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryChannels = async (filter, options) => {
  const { sortBy, limit, page } = options;

  const query = Channel.find(filter);

  if (sortBy) {
    const [sortField, sortOrder] = sortBy.split(":");
    query.sort({ [sortField]: sortOrder });
  }

  if (limit) {
    query.limit(limit);
  }

  if (page) {
    query.skip(limit * (page - 1));
  }

  const channels = await query;

  return channels;
};

const getDMByUsers = async (users) => {
  const query = Channel.find({
    $or: [
      { owner: users[0]._id, members: users[1]._id },
      { owner: users[1]._id, members: users[0]._id },
    ],
  });

  const channel = await query;

  return channel;
};

module.exports = {
  createChannel,
  createDM,
  queryChannels,
  getDMByUsers,
};
