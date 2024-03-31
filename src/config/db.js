const mysql = require('mysql2/promise');
//import dotenv from "otenv";

const db = mysql.createPool({
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  host: "localhost",
  user: "root",
  password: "",
  database: "abccollege",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// db.connect((error) => {
//   if (error) {
//     return console.error("Error connecting to the database: ", error);
//   }
//   console.log("Connected to the MySQL database ABC College.");
// });
// Immediately-invoked function expression to check connection

(async () => {
  try {
    const [rows] = await db.query('SELECT 1');
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = db;
