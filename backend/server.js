const app = require("./app");

const { connectMongo } = require("./mongodb/db");
const { connectRedis } = require("./redis/db");

const PORT = 3000;

async function startServer() {
  try {
    await connectMongo();
    await connectRedis();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server startup failed:", error);
  }
}

startServer();
