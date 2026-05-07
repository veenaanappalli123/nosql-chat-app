const express = require("express");

const {
  registerUser,
  loginUser,
  getUsers,
  sendMessage,
  getMessages,
  createGroupChat,
  getGroupChats,
  recentChatsAggregation,
  mostActiveUsersAggregation
} = require("./controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/users", getUsers);

router.post("/messages", sendMessage);
router.get("/messages", getMessages);

router.post("/groups", createGroupChat);
router.get("/groups", getGroupChats);

router.get("/aggregations/recent-chats", recentChatsAggregation);
router.get("/aggregations/most-active-users", mostActiveUsersAggregation);

module.exports = router;