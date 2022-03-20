import {
  createDMChannel,
  createTextChannel,
  createVoiceChannel,
} from "../../services/channelService";

const getOrCreateDMChannel = async (user, friend) => {
  const channel = await createDMChannel(user, friend);
  return channel;
};

module.exports = {
    getOrCreateDMChannel,
};
