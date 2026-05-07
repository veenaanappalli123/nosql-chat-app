const redis = require("redis");

const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
  },
});

client.on("error", (err) => {
  console.log("Redis Error", err);
});

async function connectRedis() {
  await client.connect();
  console.log("Redis connected");
}

module.exports = {
  client,
  connectRedis,
};