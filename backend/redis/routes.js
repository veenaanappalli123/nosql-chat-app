const express = require("express");

const router = express.Router();

const { setOnline, getOnline } = require("./controller");

router.post("/online", setOnline);
router.get("/online/:userId", getOnline);

module.exports = router;
