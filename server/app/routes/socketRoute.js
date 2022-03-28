const { getConnection } = require("../lib/redisConnection");
const redis = getConnection();
const userService = require("../services/userService");
const {CHANNEL_SOCKET, ME_SOCKET} = require("../configs/socketKeys");

const SOCKET_ID_IN_ROOM = "socketIdInRoom-";
const USER = "user-";
const ONLINE_USER = "online-user-";
const USERS_IN_ROOM = "usersInRoom-";

module.exports = [
  {
    name: ME_SOCKET.ONLINE,
    controller: async (socket, { userId, onlineUser }) => {
      await redis.set(`${ONLINE_USER}${socket.id}`, userId);
      socket.join(userId);
    },
  },
  {
    name: CHANNEL_SOCKET.JOIN_CHANNEL,
    controller: async (socket, { userId, roomId }) => {
      const userObject = await userService.getUserById(userId);
      if (!userObject) {
        throw new Error("User not found");
      }
      await Promise.all([
        redis.set(`${SOCKET_ID_IN_ROOM}${socket.id}`, roomId),
        redis.set(`${USER}${socket.id}`, JSON.stringify(userObject)),
        redis.hSet(`${USERS_IN_ROOM}${roomId}`, userId, socket.id),
      ]);

      socket.join(roomId);
    },
  },
  {
    name: CHANNEL_SOCKET.CHANNEL_SEND_MESSAGE,
    controller: async (socket, { msg, receiverId }) => {
      const [roomId, userObject] = await Promise.all([
        redis.get(`${SOCKET_ID_IN_ROOM}${socket.id}`),
        redis.get(`${USER}${socket.id}`),
      ]);

      const newMessage = msg;
      newMessage.senderId = JSON.parse(userObject);

      if (roomId) socket.to(roomId).emit("roomNewMessage", newMessage);

      const totalUsers = await redis.hGetAll(`${USERS_IN_ROOM}${roomId}`);

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
      console.log(receiverId,"receiverId");
      if (receiverId) {
        socket.to(receiverId).emit("friendAcceptRequest");
      }
    },
  },
  {
    name: CHANNEL_SOCKET.CHANNEL_SEND_DELETE_MESSAGE,
    controller: async (socket, { roomId, messageId }) => {
      if (roomId) {
        socket.to(roomId).emit("roomDeleteMessage", { messageId, roomId });
      }
    },
  },
  {
    name: CHANNEL_SOCKET.CHANNEL_SEND_EDIT_MESSAGE,
    controller: async (socket, message) => {
      if (message) {
        socket.to(message.roomId).emit("roomEditMessage", message);
      }
    },
  },
  {
    name: CHANNEL_SOCKET.LEAVE_CHANNEL,
    controller: async (socket, roomId) => {
      redis.del(`${SOCKET_ID_IN_ROOM}${socket.id}`);
      socket.leave(roomId);
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
