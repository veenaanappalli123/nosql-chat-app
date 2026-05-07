const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017");

let db;

async function connectMongo() {
  await client.connect();
  db = client.db("messaging_app");
  console.log("MongoDB connected");
}

function getDb() {
  return db;
}

module.exports = {
  connectMongo,
  getDb
};