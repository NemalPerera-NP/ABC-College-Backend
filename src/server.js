const express = require("express");
const dotenv = require("dotenv");
const cros = require("cors");
const mysql = require("mysql");
const dbConnection = require("./config/db");

const app = express();
app.use(cros());
app.use(express.json());

const PORT = process.env.PORT || 8080; //define a port for the server

//Data Base connection
app.get("/", (req, res) => {
  return res.json("From Backend Side Nemal");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
