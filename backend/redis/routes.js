const express = require("express");

const router = express.Router();

const {
  setOnline,
  getOnline,
  setTyping,
  getOnlineUsers,
  addRecentChat,
  getRecentChats,
  createSession,
  logoutUser,
} = require("./controller");



// FEATURE 1 — Set Online Status
router.post("/online", setOnline);



// FEATURE 2 — Get Online Status
router.get("/online/:userId", getOnline);



// FEATURE 3 — Typing Indicator
router.post("/typing", setTyping);



// FEATURE 4 — Get All Online Users
router.get("/online-users", getOnlineUsers);



// FEATURE 5 — Add Recent Chat
router.post("/recent-chat", addRecentChat);



// FEATURE 5 — Get Recent Chats
router.get("/recent-chats", getRecentChats);



// FEATURE 6 — Create Session
router.post("/session", createSession);



// FEATURE 7 — Logout User
router.post("/logout", logoutUser);


module.exports = router;
