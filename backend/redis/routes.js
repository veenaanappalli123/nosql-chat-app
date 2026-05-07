const express = require("express");

const router = express.Router();

const { setOnline } = require("./controller");

router.post("/online", setOnline);

module.exports = router;
