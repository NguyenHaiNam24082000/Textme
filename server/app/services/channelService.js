const httpStatus = require("http-status");
const { Channel, Friend, Message } = require("../models");
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

const createCategoryChannel = async (user, body) => {
  const { name, members } = body;
  const categoryChannel = await createChannel({
    name,
    owner: user.id,
    type: "CATEGORY",
    members,
  });
  return categoryChannel;
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
  });
  await Friend.findOneAndUpdate(
    {
      $or: [
        { sender: user.id, receiver: friendId },
        { sender: friendId, receiver: user.id },
      ],
    },
    {
      channel: DMChannel.id,
    },
    {
      upsert: true,
      new: true,
    }
  );
  // if (friend) {
  //   friend.channel = DMChannel._id;
  //   friend.save();
  // }
  return DMChannel.populate("members");
};

const alreadyInDMChannel = async (user, friendId) => {
  const channel = await Channel.findOne({
    $or: [
      {
        $and: [{ owner: user._id }, { members: friendId }],
      },
      {
        $and: [{ owner: friendId }, { members: user._id }],
      },
      { members: [user._id, friendId] },
    ],
    type: "DM",
  }).populate("members");
  console.log(channel, "channel");
  return channel;
};

const alreadyInGroupChannel = async (user, members) => {
  // const channel = await Channel.findOne({
  //   $and: [{ owner: user._id }, { members: { $in: members } }],
  // });
  const channel = await Channel.find({
    $or: [
      {
        $and: [{ owner: user._id }, { members: members }],
      },
      {
        $and: [
          { owner: { $in: members } },
          { members: [user._id, { $in: members }] },
        ],
      },
    ],
    type: "GROUP",
  });
  return channel;
};

const createGroupChannel = async (user, body) => {
  const { name, members } = body;
  // const alreadyInChannel = await alreadyInGroupChannel(user, members);
  // if (alreadyInChannel) {
  //   return alreadyInChannel;
  // }
  const groupChannel = await createChannel({
    name,
    owner: user.id,
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
  })
    .populate("members")
    .populate("lastMessage");

  const channels = await query.exec();
  const results = Promise.all(
    Array.from(channels).map(async (channel) => {
      let with_status = "";
      const friend = await Friend.findOne({
        $or: [
          {
            sender: user.id,
            receiver:
              channel.members[0].id === user.id
                ? channel.members[1].id
                : channel.members[0].id,
          },
          {
            sender:
              channel.members[0].id === user.id
                ? channel.members[1].id
                : channel.members[0].id,
            receiver: user.id,
          },
        ],
      });
      with_status = friend.status;

      return { ...JSON.parse(JSON.stringify(channel)), with_status };
    })
  ).then((results) => {
    return results;
  });

  return await results;
};

const getAllGroupChannels = async (user) => {
  const query = Channel.find({
    $and: [
      { $or: [{ owner: user._id }, { members: user._id }] },
      { type: "GROUP" },
    ],
  })
    .populate("members")
    .populate("lastMessage")
    .populate("owner");

  const channels = await query;
  const results = Promise.all(
    Array.from(channels).map(async (channel) => {
      return { ...JSON.parse(JSON.stringify(channel)), with_status: null };
    })
  ).then((results) => {
    return results;
  });

  return await results;
};

const pinnedMessage = async (user, data) => {
  const { messageId, channelId } = data;
  // const oldChannel = await Channel.findOne({
  //   $or: [{ owner: user._id }, { members: user._id }],
  //   _id: channelId,
  // });
  const message = await Message.findOne({ _id: messageId, senderId: user._id });
  if (!message) {
    throw new ApiError(httpStatus.NOT_FOUND, `there is no such a message!`);
  }
  const pinned = !message.pinned;
  message.pinned = pinned;
  let channel = null;
  if (pinned) {
    channel = await Channel.findOneAndUpdate(
      {
        _id: channelId,
        $or: [{ owner: user._id }, { members: user._id }],
      },
      {
        $push: {
          savedMessages: [messageId],
        },
      }
      // { upsert: true, new: true }
    );
  } else {
    channel = await Channel.findOneAndUpdate(
      {
        _id: channelId,
        $or: [{ owner: user._id }, { members: user._id }],
        // savedMessages: [messageId],
      },
      {
        $pull: {
          savedMessages: messageId,
        },
      }
      // { upsert: true, new: true }
    );
  }
  if (!channel) {
    throw new ApiError(httpStatus.NOT_FOUND, `there is no such a channel!`);
  }
  await message.save();
  const systemMessage = await Message.create({
    content: "",
    channel: channelId,
    messageReference: {
      channel: channelId,
      message: messageId,
    },
    sender: user._id,
    systemMessage: true,
    systemMessageType: pinned
      ? "CHANNEL_PINNED_MESSAGE"
      : "CHANNEL_UNPINNED_MESSAGE",
  });
  return systemMessage.populate("sender");
};

const getPinnedMessage = async (user, channelId) => {
  const channel = await Channel.findOne({
    _id: channelId,
    $or: [{ owner: user._id }, { members: user._id }],
  });
  if (!channel) {
    throw new ApiError(httpStatus.NOT_FOUND, `there is no such a channel!`);
  }
  const messages = await Message.find({
    _id: { $in: channel.savedMessages },
    channel: channelId,
    pinned: true,
  }).populate("sender");
  return messages;
};

const reactionMessage = async (user, body) => {
  const { messageId, channelId, reaction } = body;
  const channel = await Channel.findOne({
    _id: channelId,
    $or: [{ owner: user._id }, { members: user._id }],
  });
  if (!channel) {
    throw new ApiError(httpStatus.NOT_FOUND, `there is no such a channel!`);
  }
  const message = await Message.findOne({
    _id: messageId,
    channel: channelId,
  });
  if (!message) {
    throw new ApiError(httpStatus.NOT_FOUND, `there is no such a message!`);
  }
  if (
    reaction.id &&
    message.reactions.find((r) => r._id === reaction.id && user.id === r.user)
  ) {
    message.reactions.pull(reaction.id);
  } else {
    message.reactions.push(reaction);
  }
  await message.save();
  return message.populate([
    "sender",
    "replies",
    {
      path: "replies",
      populate: {
        path: "sender",
      },
    },
  ]);
};

const getImagesGallery = async (user, channelId) => {
  const channel = await Channel.findOne({
    _id: channelId,
    $or: [{ owner: user._id }, { members: user._id }],
  });
  if (!channel) {
    throw new ApiError(httpStatus.NOT_FOUND, `there is no such a channel!`);
  }
  const messages = await Message.find({
    channel: channelId,
    image: { $ne: null },
  }).populate("sender");
};

const getLinks = async (user, channelId) => {
  const channel = await Channel.findOne({
    _id: channelId,
    $or: [{ owner: user._id }, { members: user._id }],
  });
  if (!channel) {
    throw new ApiError(httpStatus.NOT_FOUND, `there is no such a channel!`);
  }
  const messages = await Message.find({
    channel: channelId,
    message: { $regex: /(https?:\/\/[^\s]+)/g },
  });

  return messages;
};

const getFiles = async (user, channelId) => {
  const channel = await Channel.findOne({
    _id: channelId,
    $or: [{ owner: user._id }, { members: user._id }],
  });
  if (!channel) {
    throw new ApiError(httpStatus.NOT_FOUND, `there is no such a channel!`);
  }
  const messages = await Message.find({
    channel: channelId,
    file: { $ne: null },
  }).populate("sender");

  return messages;
};

const inviteMembersToChannel = async (user, params, data) => {
  const { members, type } = data;
  const channel = await Channel.findOne({
    _id: params.channelId,
    $or: [{ owner: user._id }, { members: user._id }],
    type: type,
  });
  if (!channel) {
    throw new ApiError(httpStatus.NOT_FOUND, `there is no such a channel!`);
  }
  const users = await User.find({
    _id: { $in: members },
  });
  if (users.length !== members.length) {
    throw new ApiError(httpStatus.NOT_FOUND, `there is no such a user!`);
  }
  const newMembers = users.map((user) => user._id);
  channel.members = [...channel.members, ...newMembers];
  await channel.save();
  return channel.populate("members");
};

module.exports = {
  createDMChannel,
  createTextChannel,
  createVoiceChannel,
  queryChannels,
  // getDMByUsers,
  getAllDMChannels,
  getAllGroupChannels,
  alreadyInGroupChannel,
  createGroupChannel,
  getPinnedMessage,
  pinnedMessage,
  reactionMessage,
  getLinks,
  getImagesGallery,
  getFiles,
  inviteMembersToChannel,
};
