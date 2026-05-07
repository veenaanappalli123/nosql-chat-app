require("dotenv").config();

const app = require("./app");
const { connectMongo } = require("./mongodb/db");

const PORT = 3000;

connectMongo()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });