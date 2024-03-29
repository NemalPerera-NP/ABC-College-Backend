const express = require("express");
const dotenv = require("dotenv");
const cros = require("cors");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080; //define a port for the server
