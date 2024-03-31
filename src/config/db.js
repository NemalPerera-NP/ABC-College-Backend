import mysql from "mysql";
//import dotenv from "dotenv";



const dbConnection = mysql.createConnection({
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  host: "localhost",
  user: "root",
  password: "",
  database: "abccollege",
});

dbConnection.connect((error) => {
  if (error) {
    return console.error("Error connecting to the database: ", error);
  }
  console.log("Connected to the MySQL database ABC College.");
});

export default dbConnection;
