require("dotenv").config();

const app = require("./app");

const { client } = require("./redis/db");

const PORT = 3000;

async function startServer() {
  await client.connect();

  console.log("Redis connected");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
