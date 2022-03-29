const socketIo = require("socket.io");
const { createAdapter } = require("@socket.io/redis-adapter");
const { getSubConnection, getConnection } = require("../lib/redisConnection");
const passport = require("passport");
const { jwtStrategy } = require("../configs/passport");
const routes = require("../routes/socketRoute");
const { getUserById } = require("../services/userService");

// https://philenius.github.io/web%20development/2021/03/31/use-passportjs-for-authentication-in-socket-io.html
// authenticate socket.io connection using passport jwt strategy
passport.use("jwt", jwtStrategy);
passport.serializeUser(function (user, done) {
  if (user) done(null, user);
});

passport.deserializeUser(function (_id, done) {
  getUserById(_id).then((user) => {
    console.log("deserializeUser", user);
    done(null, user);
  });
});
const wrapMiddlewareForSocketIo = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

let io;

const getSocketIo = async () => {
  if (!io) {
    throw new Error("socket not available");
  }

  return io;
};

const setup = async (server, cors) => {
  // const subClient = await getSubConnection()
  // const pubClient = await getConnection()

  // const socketIo = new Server();
  // socketIo.adapter(createAdapter(pubClient, subClient));
  io = socketIo(server, {
    cors: cors,
  })
    // .use(wrapMiddlewareForSocketIo(passport.initialize()))
    // .use(wrapMiddlewareForSocketIo(passport.session()))
    .use(wrapMiddlewareForSocketIo(passport.authenticate(["jwt"])))
    .on("connection", (socket) => {
      console.log("socket connected", socket.id);
      socket.emit("connected", "hello");
      // init routes
      routes.map((route) =>
        socket.on(route.name, (data) => route.controller(socket, data))
      );
      socket.on("disconnect", () => {
        console.log("socket disconnected", socket.id);
      });
    });
  return io;
};
module.exports = {
  setup,
  getSocketIo,
};
