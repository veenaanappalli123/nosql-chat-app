const express = require("express");
const router = express.Router();
const neoController = require("./controller");

// Add friend
router.post("/add-friend", neoController.addFriend);

// Check friend relationship
router.post("/check-friend", neoController.checkFriend);

module.exports = router;
