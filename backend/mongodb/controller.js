const { getDb } = require("./db");

async function registerUser(req, res) {
  const db = getDb();

  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    createdAt: new Date()
  };

  const result = await db.collection("users").insertOne(user);

  res.status(201).json({
    message: "User registered",
    userId: result.insertedId
  });
}

async function loginUser(req, res) {
  const db = getDb();

  const user = await db.collection("users").findOne({
    email: req.body.email,
    password: req.body.password
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  res.json({
    message: "Login successful",
    user
  });
}

async function getUsers(req, res) {
  const db = getDb();

  const users = await db.collection("users").find().toArray();

  res.json(users);
}

async function sendMessage(req, res) {
  const db = getDb();

  const message = {
    sender: req.body.sender,
    receiver: req.body.receiver,
    content: req.body.content,
    createdAt: new Date()
  };

  const result = await db.collection("messages").insertOne(message);

  res.status(201).json({
    message: "Message sent",
    messageId: result.insertedId
  });
}

async function getMessages(req, res) {
  const db = getDb();

  const messages = await db.collection("messages").find().toArray();

  res.json(messages);
}

async function createGroupChat(req, res) {
  const db = getDb();

  const group = {
    name: req.body.name,
    members: req.body.members,
    createdAt: new Date()
  };

  const result = await db.collection("groups").insertOne(group);

  res.status(201).json({
    message: "Group chat created",
    groupId: result.insertedId
  });
}

async function getGroupChats(req, res) {
  const db = getDb();

  const groups = await db.collection("groups").find().toArray();

  res.json(groups);
}

async function recentChatsAggregation(req, res) {
  const db = getDb();

  const result = await db.collection("messages").aggregate([
    {
      $sort: { createdAt: -1 }
    },
    {
      $group: {
        _id: {
          sender: "$sender",
          receiver: "$receiver"
        },
        lastMessage: { $first: "$content" },
        lastMessageDate: { $first: "$createdAt" }
      }
    }
  ]).toArray();

  res.json(result);
}

async function mostActiveUsersAggregation(req, res) {
  const db = getDb();

  const result = await db.collection("messages").aggregate([
    {
      $group: {
        _id: "$sender",
        totalMessages: { $sum: 1 }
      }
    },
    {
      $sort: { totalMessages: -1 }
    }
  ]).toArray();

  res.json(result);
}

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  sendMessage,
  getMessages,
  createGroupChat,
  getGroupChats,
  recentChatsAggregation,
  mostActiveUsersAggregation
};