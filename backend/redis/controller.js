const { client } = require("./db");

async function setOnline(req, res) {
  const { userId } = req.body;

  await client.set(`online:${userId}`, "true");

  res.json({
    message: `User ${userId} is online`,
  });
}

module.exports = {
  setOnline,
};
