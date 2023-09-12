const { Client } = require("pg");

const client = new Client({
    user: "",
    host: "localhost",
    database: "timer",
    password: "/9oVerLord9/",
    port: 5432,
});

// Connect to the database
client.connect();

// Perform database operations
client.query("SELECT * FROM sentence", (err, res) => {
    if (err) {
        console.error(err);
    } else {
        console.log(res.rows);
    }
    // Close the database connection
    client.end();
});
