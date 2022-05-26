const { getConnection } = require("../lib/redisConnection");
const redis = getConnection();
const userService = require("../services/userService");
const { CHANNEL_SOCKET, ME_SOCKET } = require("../configs/socketKeys");

const SOCKET_ID_IN_ROOM = "socketIdInRoom-";
const USER = "user-";
const ONLINE_USER = "online-user-";
const USERS_IN_ROOM = "usersInRoom-";

module.exports = [
  {
    name: ME_SOCKET.ONLINE,
    controller: async (socket, { userId, onlineUser }) => {
      await redis.set(`${ONLINE_USER}${socket.id}`, userId);
      // usersOnline.push(userId);
      // socket.emit("userOnline", usersOnline);
      // console.log("user online", usersOnline);
      socket.join(userId);
    },
  },
  {
    name: CHANNEL_SOCKET.JOIN_CHANNEL,
    controller: async (socket, { userId, channelId }) => {
      const userObject = await userService.getUserById(userId);
      if (!userObject) {
        throw new Error("User not found");
      }
      await Promise.all([
        redis.set(`${SOCKET_ID_IN_ROOM}${socket.id}`, channelId),
        redis.set(`${USER}${socket.id}`, JSON.stringify(userObject)),
        redis.hSet(`${USERS_IN_ROOM}${channelId}`, userId, socket.id),
      ]);

      const usersInRoom = await redis.get(`${SOCKET_ID_IN_ROOM}${socket.id}`);

      console.log(usersInRoom, "usersInRoom");

      socket.join(channelId);
    },
  },
  {
    name: CHANNEL_SOCKET.CHANNEL_SEND_MESSAGE,
    controller: async (socket, { msg, receiverId }) => {
      const [channelId, userObject] = await Promise.all([
        redis.get(`${SOCKET_ID_IN_ROOM}${socket.id}`),
        redis.get(`${USER}${socket.id}`),
      ]);

      console.log(channelId, userObject, "channelId, userObject");

      const newMessage = msg;
      newMessage.senderId = JSON.parse(userObject);

      if (channelId) socket.to(channelId).emit("channelNewMessage", newMessage);

      const totalUsers = await redis.hGetAll(`${USERS_IN_ROOM}${channelId}`);

      if (Object.keys(totalUsers).length === 1) {
        socket.to(receiverId).emit("roomOpened");
      }
    },
  },
  {
    name: ME_SOCKET.SEND_FRIEND_REQUEST,
    controller: async (socket, { receiverId }) => {
      if (receiverId) {
        socket.to(receiverId).emit("friendRequest");
      }
    },
  },
  {
    name: ME_SOCKET.SEND_CANCEL_FRIEND_REQUEST,
    controller: async (socket, { receiverId }) => {
      if (receiverId) {
        socket.to(receiverId).emit("cancelFriendRequest");
      }
    },
  },
  {
    name: ME_SOCKET.SEND_ACCEPT_FRIEND_REQUEST,
    controller: async (socket, { receiverId }) => {
      console.log(receiverId, "receiverId");
      if (receiverId) {
        socket.to(receiverId).emit("friendAcceptRequest");
      }
    },
  },
  {
    name: CHANNEL_SOCKET.CHANNEL_SEND_DELETE_MESSAGE,
    controller: async (socket, { channelId, messageId }) => {
      if (channelId) {
        socket
          .to(channelId)
          .emit("roomDeleteMessage", { messageId, channelId });
      }
    },
  },
  {
    name: CHANNEL_SOCKET.CHANNEL_SEND_EDIT_MESSAGE,
    controller: async (socket, message) => {
      if (message) {
        socket.to(message.channelId).emit("roomEditMessage", message);
      }
    },
  },
  {
    name: CHANNEL_SOCKET.CALL,
    controller: async (socket, { to, signalData, from }) => {
      console.log(to, signalData, from, "call");
      if (to) {
        socket.to(to).emit("callAccepted", { signalData, from });
      }
    },
  },
  {
    name: CHANNEL_SOCKET.LEAVE_CHANNEL,
    controller: async (socket, channelId) => {
      redis.del(`${SOCKET_ID_IN_ROOM}${socket.id}`);
      socket.leave(channelId);
    },
  },
  {
    name: ME_SOCKET.LOGOUT,
    controller: async (socket, userId) => {
      redis.del(`${ONLINE_USER}${socket.id}`);
      redis.del(`${SOCKET_ID_IN_ROOM}${socket.id}`);

      socket.leave(userId);
    },
  },
];
