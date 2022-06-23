const { getConnection } = require("../lib/redisConnection");
const redis = getConnection();
const userService = require("../services/userService");
const { CHANNEL_SOCKET, ME_SOCKET } = require("../configs/socketKeys");

const SOCKET_ID_IN_ROOM = "socketIdInRoom-";
const USER = "user-";
const ONLINE_USER = "online-user-";
const USERS_IN_ROOM = "usersInRoom-";
let listUsersCall = {};
let usersOnline = {};

module.exports = [
  {
    name: ME_SOCKET.ONLINE,
    controller: async (socket, io, { userId, onlineUser }) => {
      await redis.set(`${ONLINE_USER}${socket.id}`, userId);
      // usersOnline.push(userId);
      // socket.emit("userOnline", usersOnline);
      // console.log("user online", usersOnline);
      // socket.on("userConnected", (user) => {
      //   usersOnline[user.id] = { user: user, socketId: socket.id };
      //   console.log("user connected", usersOnline);
      //   io.emit("updateUserStatus", usersOnline);
      // });
      const user = await userService.updateUserById(userId, {
        status: {
          ...this.status,
          online: true,
        },
      });
      console.log("user connected", user);
      let socketId = [];
      if (usersOnline[userId]) {
        socketId = usersOnline[userId].socketId;
      }
      usersOnline[user.id] = {
        user,
        socketId: [...socketId, socket.id],
      };
      io.emit("updateUserStatus", usersOnline);
      socket.join(userId);
    },
  },
  {
    name: CHANNEL_SOCKET.JOIN_CHANNEL,
    controller: async (socket, io, { userId, channelId }) => {
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
    controller: async (socket, io, { msg, receiverId }) => {
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
    controller: async (socket, io, { receiverId }) => {
      if (receiverId) {
        socket.to(receiverId).emit("friendRequest");
      }
    },
  },
  {
    name: ME_SOCKET.SEND_CANCEL_FRIEND_REQUEST,
    controller: async (socket, io, { receiverId }) => {
      if (receiverId) {
        socket.to(receiverId).emit("cancelFriendRequest");
      }
    },
  },
  {
    name: ME_SOCKET.SEND_ACCEPT_FRIEND_REQUEST,
    controller: async (socket, io, { receiverId }) => {
      console.log(receiverId, "receiverId");
      if (receiverId) {
        socket.to(receiverId).emit("friendAcceptRequest");
      }
    },
  },
  {
    name: "start-call",
    controller: async (socket, io, { receiverId, channel }) => {
      console.log(usersOnline, "receiverId");
      if (receiverId) {
        receiverId.forEach((id) => {
          if (usersOnline[id]) {
            usersOnline[id].socketId.forEach((socketId) => {
              io.to(socketId).emit("startedCall", {
                call: true,
                channel,
              });
            });
          }
        });
      }
    },
  },
  {
    name: CHANNEL_SOCKET.CHANNEL_SEND_DELETE_MESSAGE,
    controller: async (socket, io, { channelId, messageId }) => {
      if (channelId) {
        socket
          .to(channelId)
          .emit("roomDeleteMessage", { messageId, channelId });
      }
    },
  },
  {
    name: CHANNEL_SOCKET.CHANNEL_SEND_EDIT_MESSAGE,
    controller: async (socket, io, message) => {
      if (message) {
        socket.to(message.channelId).emit("roomEditMessage", message);
      }
    },
  },
  {
    name: CHANNEL_SOCKET.CALL,
    controller: async (socket, io, { to, from }) => {
      if (to) {
        console.log(to, "aAaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        listUsersCall[socket.id] = { user: from, video: true, audio: true };
        const rooms = io.adapter.rooms;
        const isInRoom = rooms.get(to)?.has(socket.id);
        console.log(socket.id, "isInRoom");
        console.log(isInRoom, "isInRoom");
        console.log(rooms.get(to), "isInRoom");
        console.log(rooms, "rooms");
        if (!isInRoom) {
          socket.join(to);
        }
        // console.log(await io.in(to).fetchSockets(), "io.sockets.in(roomId)");
        try {
          console.log(to, "to");
          const users = [];
          console.log(rooms.get(to), "aaaa");
          rooms.get(to).forEach((client) => {
            if (listUsersCall[client]) {
              users.push({
                id: listUsersCall[client].user.id,
                info: listUsersCall[client],
              });
            }
          });
          console.log(from.id, "aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
          socket.to(to).emit("join-call", users);
        } catch (e) {
          socket.to(to).emit("error-join-call", { err: true });
        }
      }
    },
  },
  {
    name: "call-user",
    controller: async (socket, io, { to, from, signal }) => {
      console.log(
        {
          id: listUsersCall[from].user.id,
          // signal,
          from,
          info: listUsersCall[from],
        },
        "users-call-user"
      );
      socket.to(to).emit("receive-call", {
        id: listUsersCall[from].user.id,
        signal,
        from,
        info: listUsersCall[from],
      });
    },
  },
  {
    name: "accept-call",
    controller: async (socket, io, { signal, to, from }) => {
      console.log("accept-call");
      socket.to(to).emit("call-accepted", {
        id: listUsersCall[socket.id].user.id,
        signal,
        from,
        info: listUsersCall[socket.id],
      });
    },
  },
  {
    name: "leave-room",
    controller: async (socket, io, { channel, leaver }) => {
      console.log(channel, "channel");
      console.log(leaver, "leaver");
      socket.to(channel.id).emit("user-leave-call", {
        socketId: socket.id,
        userId: leaver,
      });
      socket.leave(channel.id);
    },
  },
  {
    name: CHANNEL_SOCKET.LEAVE_CHANNEL,
    controller: async (socket, io, channelId) => {
      redis.del(`${SOCKET_ID_IN_ROOM}${socket.id}`);
      socket.leave(channelId);
    },
  },
  {
    name: ME_SOCKET.LOGOUT,
    controller: async (socket, io, { userId }) => {
      redis.del(`${ONLINE_USER}${socket.id}`);
      redis.del(`${SOCKET_ID_IN_ROOM}${socket.id}`);
      await userService.updateUserById(userId, {
        status: {
          ...this.status,
          online: false,
          last_online: Date.now(),
        },
      });

      socket.leave(userId);
    },
  },
  {
    name: "disconnect",
    controller: async (socket, io) => {
      let userId = "";
      // Object.values(usersOnline).forEach((value) => {
      //   if (value.socketId === socket.id) {
      //     userId = value.user.id;
      //     console.log(userId, "userId");
      //     delete usersOnline[value.user.id];
      //   }
      // });
      // redis.del(`${ONLINE_USER}${socket.id}`);
      // redis.del(`${SOCKET_ID_IN_ROOM}${socket.id}`);
      if (userId) {
        await userService.updateUserById(userId, {
          status: {
            ...this.status,
            online: false,
            last_online: Date.now(),
          },
        });
      }
      io.emit("updateUserStatus", usersOnline);
      console.log("socket disconnected", socket.id);
      // socket.leave(userId);
    },
  },
];
