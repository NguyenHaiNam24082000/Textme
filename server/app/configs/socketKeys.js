const CHANNEL_SOCKET = {
  CHANNEL_SEND_MESSAGE: "channelSendMessage",
  CHANNEL_NEW_MESSAGE: "channelNewMessage",
  JOIN_CHANNEL: "joinChannel",
  SEND_CHANNEL_DELETE_MESSAGE: "sendChannelDeleteMessage",
  CHANNEL_DELETE_MESSAGE: "channelDeleteMessage",
  CHANNEL_SEND_EDIT_MESSAGE: "channelSendEditMessage",
  CHANNEL_EDIT_MESSAGE: "channelEditMessage",
  LEAVE_CHANNEL: "leaveChannel",
  CALL: "call",
};

const ME_SOCKET = {
  ONLINE: "online",
  SEND_FRIEND_REQUEST: "sendFriendRequest",
  SEND_ACCEPT_FRIEND_REQUEST: "sendFriendAcceptRequest",
  SEND_CANCEL_FRIEND_REQUEST: "sendCancelFriendRequest",
  LOGOUT: "logOut",
};

module.exports = {
  CHANNEL_SOCKET,
  ME_SOCKET,
};
