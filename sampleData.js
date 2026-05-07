require("dotenv").config();

const redis = require("redis");

async function loadSampleData() {
  const client = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  });

  await client.connect();

  console.log("Connected to Redis");

  // Online users
  await client.set("online:u1", "true");
  await client.set("online:u2", "true");

  // Online users set
  await client.sAdd("onlineUsers", ["u1", "u2"]);

  // Typing status
  await client.set("typing:u1:u2", "true");

  // Recent chats
  await client.lPush("recentChats", "Hello everyone");
  await client.lPush("recentChats", "Redis sample message");

  // Session
  await client.set("session:u1", "active");

  // Unread messages
  await client.set("unread:u1", 3);

  console.log("Sample Redis data inserted successfully");

  await client.quit();
}

loadSampleData();

