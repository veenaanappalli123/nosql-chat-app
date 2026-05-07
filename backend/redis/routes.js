const express = require("express");

const router = express.Router();

const {
  setOnline,
  getOnline,
  setTyping,
} = require("./controller");



// FEATURE 1 — Set Online Status
router.post("/online", setOnline);



// FEATURE 2 — Get Online Status
router.get("/online/:userId", getOnline);



// FEATURE 3 — Typing Indicator
router.post("/typing", setTyping);


module.exports = router;
