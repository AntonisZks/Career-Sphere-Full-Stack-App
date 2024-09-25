const mysql = require("mysql2");
const dotenv = require('dotenv');

dotenv.config();


// Define the database connection data
const database_connection_data = {

    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE

};

// Create the connection pool
const db_pool = mysql.createPool({

    ...database_connection_data,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

});

const executeQuery = (sqlQuery, params) => {
    return new Promise((resolve, reject) => {
        db_pool.query(sqlQuery, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}

module.exports = { db_pool, executeQuery };
