const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

// DB_NAME=database_name
// DB_USER=username
// DB_PASSWORD=password
// DB_HOST=localhost:3306

const db = mysql.createConnection({
  host:process.env.DB_HOST,
  user: process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(error => {
    if (error) {
      return console.error('Error connecting to the database: ', error);
    }
    console.log('Connected to the MySQL database ABC College.');
  });
  
  module.exports = db;