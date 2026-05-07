const { client } = require("./db");



// FEATURE 1 — Set Online Status
async function setOnline(req, res) {
  const { userId } = req.body;

  await client.set(`online:${userId}`, "true");

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

  console.log(fromUser, toUser);

  await client.set(`typing:${fromUser}:${toUser}`, "true");

  res.json({
    message: `${fromUser} is typing to ${toUser}`,
  });
}

module.exports = {
  setOnline,
  getOnline,
  setTyping,
};
