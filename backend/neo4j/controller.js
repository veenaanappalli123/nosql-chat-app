const { session } = require("./db");

// ----------------------
// Add Friend
// ----------------------
exports.addFriend = async (req, res) => {
    const { user1, user2 } = req.body;

    try {
        const query = `
            MERGE (a:User {id: $user1})
            MERGE (b:User {id: $user2})
            MERGE (a)-[:FRIEND]->(b)
            MERGE (b)-[:FRIEND]->(a)
            RETURN a, b
        `;

        const result = await session.run(query, { user1, user2 });

        res.json({
            message: "Friend relationship created",
            data: result.records.length
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ----------------------
// Check Friend
// ----------------------
exports.checkFriend = async (req, res) => {
    const { user1, user2 } = req.body;

    try {
        const query = `
            MATCH (a:User {id: $user1})-[r:FRIEND]-(b:User {id: $user2})
            RETURN COUNT(r) AS isFriend
        `;

        const result = await session.run(query, { user1, user2 });

        const isFriend = result.records[0].get("isFriend").toInt() > 0;

        res.json({
            friends: isFriend
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ----------------------
// Mutual Friends
// ----------------------
exports.mutualFriends = async (req, res) => {
    const { user1, user2 } = req.body;

    try {
        const result = await session.run(
            `
            MATCH (a:User {id: $user1})-[:FRIEND]-(mutual)-[:FRIEND]-(b:User {id: $user2})
            RETURN DISTINCT mutual.id AS mutualFriend
            `,
            { user1, user2 }
        );

        const mutuals = result.records.map(r => r.get("mutualFriend"));

        res.json({ mutualFriends: mutuals });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching mutual friends" });
    }
};

// ----------------------
// Remove Friend
// ----------------------
exports.removeFriend = async (req, res) => {
    const { user1, user2 } = req.body;

    try {
        const query = `
            MATCH (a:User {id: $user1})-[r:FRIEND]-(b:User {id: $user2})
            DELETE r
        `;

        await session.run(query, { user1, user2 });

        res.json({
            message: "Friend relationship removed"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ----------------------
// Get All Friends
// ----------------------
exports.getAllFriends = async (req, res) => {
    const { user } = req.body;

    try {
        const query = `
            MATCH (a:User {id: $user})-[:FRIEND]-(friend)
            RETURN friend.id AS friendId
        `;

        const result = await session.run(query, { user });

        const friends = result.records.map(r => r.get("friendId"));

        res.json({ friends });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
