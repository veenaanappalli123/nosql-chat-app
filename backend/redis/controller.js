

//setonline -feature 1
const { client } = require("./db");

async function setOnline(req, res) {
  const { userId } = req.body;

  await client.set(`online:${userId}`, "true");

  res.json({
    message: `User ${userId} is online`,
  });
}


//get online -feature2
async function getOnline(req, res) {
  const { userId } = req.params;

  const status = await client.get(`online:${userId}`);

  res.json({
    userId,
    online: status,
  });
}



module.exports = {
  setOnline,
  getOnline,
};




