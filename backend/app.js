const express = require("express");
const cors = require("cors");

const mongoRoutes = require("./mongodb/routes");
const neoRoutes = require("./neo4j/routes");
const redisRoutes = require("./redis/routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/mongo", mongoRoutes);
app.use("/neo", neoRoutes);
app.use("/redis", redisRoutes);

app.get("/", (req, res) => {
  res.send("NoSQL Chat App API Running");
});

module.exports = app;
