const { client } = require("./db");


// FEATURE 1 — Set Online Status
async function setOnline(req, res) {
  const { userId } = req.body;

  // Store online status
  await client.set(`online:${userId}`, "true");

  // Add user to online users set
  await client.sAdd("onlineUsers", userId);

  res.json({
    message: `User ${userId} is online`,
  });
}



// FEATURE 2 — Get Online Status
async function getOnline(req, res) {
  const { userId } = req.params;

  const status = await client.get(`online:${userId}`);

  res.json({
    userId,
    online: status,
  });
}



// FEATURE 3 — Typing Indicator
async function setTyping(req, res) {
  const { fromUser, toUser } = req.body;

  await client.set(`typing:${fromUser}:${toUser}`, "true");

  res.json({
    message: `${fromUser} is typing to ${toUser}`,
  });
}


// FEATURE 4 — Get All Online Users
async function getOnlineUsers(req, res) {
  const users = await client.sMembers("onlineUsers");

  res.json({
    onlineUsers: users,
  });
}



// FEATURE 5 — Cache Recent Chats
async function addRecentChat(req, res) {
  const { message } = req.body;

  await client.lPush("recentChats", message);

  res.json({
    message: "Chat added to recent chats cache",
  });
}



// FEATURE 5 — Get Recent Chats
async function getRecentChats(req, res) {
  const chats = await client.lRange("recentChats", 0, 9);

  res.json({
    recentChats: chats,
  });
}


module.exports = {
  setOnline,
  getOnline,
  setTyping,
  getOnlineUsers,
  addRecentChat,
  getRecentChats,
};
