const { session } = require("./db");

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
