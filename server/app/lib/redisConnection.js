const redisObject = require("redis");

let subConnection;
let con;

const createConnection = () => {
  //production
  // const redis = redisObject.createClient({
  //   url: process.env.REDIS_HOST,
  // });

  //development
  const redis = redisObject.createClient();

  redis.on("connect", () => {
    console.log("Redis connected");
  });

  redis.on("error", (err) => {
    console.log("Redis error", err);
  });

  redis.connect();

  return redis;
};

const createSubConnection = async () => {
  //production
  // const redis = redisObject.createClient({
  //   url: process.env.REDIS_HOST,
  // });

  //development
  const redis = redisObject.createClient();

  redis.on("connect", () => {
    console.log("Redis connected");
  });

  redis.on("error", (err) => {
    console.log("Redis error", err);
  });

  await redis.connect();

  return redis;
};

module.exports.getSubConnection = async () => {
  if (!subConnection) {
    subConnection = await createSubConnection();
  }
  return subConnection;
};

module.exports.getConnection = () => {
  if (!con) con = createConnection();
  return con;
};
