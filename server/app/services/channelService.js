const httpStatus = require("http-status");
const { Channel,Friend } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a channel
 * @param {Object} user
 * @param {Object} body
 * @returns {Promise<User>}
 */
const createChannel = async (options) => {
  const channel = await Channel.create({
    ...options,
  });

  return channel;
};

const createTextChannel = async (user, body) => {
  return await createChannel({
    name: body.name,
    type: "TEXT",
    owner: user.id,
    members: [],
  });
};

const createVoiceChannel = async (user, body) => {
  return await createChannel({
    name: body.name,
    type: "VOICE",
    owner: user.id,
    members: [],
  });
};

const createDMChannel = async (user, body) => {
  const { friendId } = body;
  const alreadyInChannel = await alreadyInDMChannel(user, friendId);
  if (alreadyInChannel) {
    return alreadyInChannel;
  }
  const DMChannel = await createChannel({
    type: "DM",
    members: [user.id, friendId],
  }).populate("members");
  const friend = Friend.findOne({
    $or: [
      { sender: user.id, receiver: friendId },
      { sender: friendId, receiver: user.id },
    ],
  });
  if (friend) {
    friend.channel = DMChannel._id;
    friend.save();
  }
  return DMChannel;
};

const alreadyInDMChannel = async (user, friend) => {
  const channel = await Channel.findOne({
    $or: [
      { owner: user._id, members: friend._id },
      { owner: friend._id, members: user._id },
    ],
  }).populate("members");
  return channel;
};

const alreadyInGroupChannel = async (user, members) => {
  const channel = await Channel.findOne({
    $and: [{ owner: user._id }, { members: { $in: members } }],
  });
  return channel;
};

const createGroupChannel = async (user, body) => {
  const { name, members } = body;
  const alreadyInChannel = await alreadyInGroupChannel(user, members);
  if (alreadyInChannel) {
    return alreadyInChannel;
  }
  const groupChannel = await createChannel({
    name,
    type: "GROUP",
    members,
  });
  return groupChannel;
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

// const getDMByUsers = async (users) => {
//   const query = Channel.find({
//     $or: [
//       { owner: users[0]._id, members: users[1]._id },
//       { owner: users[1]._id, members: users[0]._id },
//     ],
//   });

//   const channel = await query;

//   return channel;
// };

const getAllDMChannels = async (user) => {
  const query = Channel.find({
    $and: [{ members: user }, { type: "DM" }],
  }).populate("members").populate("lastMessage");

  const channels = await query;

  return channels;
};

const getAllGroupChannels = async (user) => {
  const query = Channel.find({
    $and: [{ members: user }, { type: "GROUP" }],
  }).populate("members").populate("lastMessage");

  const channels = await query;

  return channels;
};

module.exports = {
  createDMChannel,
  createTextChannel,
  createVoiceChannel,
  queryChannels,
  // getDMByUsers,
  getAllDMChannels,
  getAllGroupChannels,
};
