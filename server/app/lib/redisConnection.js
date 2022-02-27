const redisObject = require("redis-om");

let subConnection;
let con;

const createConnection = () => {
  const redis = redisObject.createClient({
    url: process.env.REDIS_HOST,
  });

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
  const redis = redisObject.createClient({
    url: process.env.REDIS_HOST,
  });

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
