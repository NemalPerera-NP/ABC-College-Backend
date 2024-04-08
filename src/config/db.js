const mysql = require('mysql2/promise');
//import dotenv from "otenv";

const db = mysql.createPool({
 
  host: "localhost",
  user: "root",
  password: "",
  database: "abccollege",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


(async () => {
  try {
    const [rows] = await db.query('SELECT 1');
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = db;
