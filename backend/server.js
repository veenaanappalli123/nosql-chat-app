const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Load Neo4j routes
const neoRoutes = require("./neo4j/routes");
app.use("/neo", neoRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
