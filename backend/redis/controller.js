const { client } = require("./db");



// FEATURE 1 — Set Online Status
async function setOnline(req, res) {
  const { userId } = req.body;

  // Store online status with expiry
  await client.set(`online:${userId}`, "true", {
    EX: 300,
  });

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

  // Typing expires automatically
  await client.set(`typing:${fromUser}:${toUser}`, "true", {
    EX: 10,
  });

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



// FEATURE 6 — Create User Session
async function createSession(req, res) {
  const { userId } = req.body;

  await client.set(`session:${userId}`, "active", {
    EX: 3600,
  });

  res.json({
    message: `Session created for ${userId}`,
  });
}



// FEATURE 7 — Logout User
async function logoutUser(req, res) {
  const { userId } = req.body;

  // Remove online status
  await client.del(`online:${userId}`);

  // Remove from online users set
  await client.sRem("onlineUsers", userId);

  // Remove session
  await client.del(`session:${userId}`);

  // Store last seen timestamp
  await client.set(`lastSeen:${userId}`, new Date().toISOString());

  res.json({
    message: `User ${userId} logged out`,
  });
}



// FEATURE 8 — Increment Unread Messages
async function incrementUnread(req, res) {
  const { userId } = req.body;

  await client.incr(`unread:${userId}`);

  const unreadCount = await client.get(`unread:${userId}`);

  res.json({
    userId,
    unreadMessages: unreadCount,
  });
}



// FEATURE 9 — Get Last Seen Timestamp
async function getLastSeen(req, res) {
  const { userId } = req.params;

  const lastSeen = await client.get(`lastSeen:${userId}`);

  res.json({
    userId,
    lastSeen,
  });
}


module.exports = {
  setOnline,
  getOnline,
  setTyping,
  getOnlineUsers,
  addRecentChat,
  getRecentChats,
  createSession,
  logoutUser,
  incrementUnread,
  getLastSeen,
};
