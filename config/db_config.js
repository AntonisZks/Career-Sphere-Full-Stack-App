const mysql = require("mysql2");


// Define the database connection data
const database_connection_data = {
    host: "localhost",
    user: "root",
    password: "",
    database: "careersphere"
};

/**
 * Creates a connection pool for the database according to
 * the database connection data.
 * 
 * @returns the pool created
 */
function createConnectionPool() {
    
    // Create a connection pooland return it
    const pool = mysql.createPool({

        ...database_connection_data,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    
    });

    return pool;

}

module.exports = { 
    createConnectionPool 
};
