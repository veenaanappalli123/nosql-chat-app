const express = require("express");
const router = express.Router();
const neoController = require("./controller");

// Add Friend
router.post("/add-friend", neoController.addFriend);

// Check Friend
router.post("/check-friend", neoController.checkFriend);

// Mutual Friends
router.post("/mutual-friends", neoController.mutualFriends);

// Remove Friend
router.post("/remove-friend", neoController.removeFriend);

// Get All Friends
router.post("/get-all-friends", neoController.getAllFriends);

module.exports = router;
