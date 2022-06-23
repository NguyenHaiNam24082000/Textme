const markAsRead = async (user, channelId) => {
  const channel = await Channel.findById(channelId);
  if (!channel) {
    throw new ApiError(httpStatus.NOT_FOUND, `there is no such a channel!`);
  }

  const userIndex = channel.members.findIndex(
    (member) => member.toString() === user._id.toString()
  );
  if (userIndex === -1) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `you are not a member of this channel!`
    );
  }

  channel.members[userIndex].lastReadMessage = new Date();
  channel.markModified("members");
  await channel.save();
  return channel;
};

const isIgnored = async (user, channelId) => {
  const channel = await Channel.findById(channelId);
  if (!channel) {
    throw new ApiError(httpStatus.NOT_FOUND, `there is no such a channel!`);
  }

  const userIndex = channel.members.findIndex(
    (member) => member.toString() === user._id.toString()
  );
  if (userIndex === -1) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `you are not a member of this channel!`
    );
  }

  return channel.members[userIndex].ignored;
};
