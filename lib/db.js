// file: lib/db.js
import mysql from 'mysql2/promise';

// Create a connection pool (efficient for web apps)
// NOTICE: We use curly braces { } for the configuration object
const db = mysql.createPool({
    host: 'localhost',      // Your database is on your own computer
    user: 'root',           // Your MySQL username
    password: '7995437205Th', // Your MySQL password
    database: 'school_db',  // The database we created
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Export the pool so we can use it in our API routes
export default db;