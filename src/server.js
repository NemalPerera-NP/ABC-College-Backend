import express from "express";
import cros from "cors";
import mysql from "mysql";
import dotenv from "dotenv";
import dbConnection from "./config/db.js";

const app = express();
app.use(cros());
app.use(express.json());

const PORT = process.env.PORT || 8080; //define a port for the server

//Data Base connection
app.get("/reg-key", (req, res) => {
  const sql = "SELECT * FROM regkey";
  dbConnection.query(sql, (err, result) => {
    if (err) {
      return res.json({ Message: "Error inside server" });
    } else {
      return res.json(result);
    }
  });
  //return res.json("From Backend Side Nemal");
});
app.get("/", (req, res) => {
  return res.json("From Backend Side Nemal");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
