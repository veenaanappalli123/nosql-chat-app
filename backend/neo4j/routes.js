const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Neo4j routes working");
});

module.exports = router;
