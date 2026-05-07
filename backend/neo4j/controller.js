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
