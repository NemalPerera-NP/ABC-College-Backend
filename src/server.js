const express = require("express");
const cros = require("cors");
const dotenv = require("dotenv");
const dbConnection = require("./config/db");
const router = require("./routes/authRoutes");
//import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(cros());
app.use(express.json());

const PORT = process.env.PORT || 8080; //define a port for the server


//Data Base connection
// app.get("/reg-key", (req, res) => {
//   const sql = "SELECT * FROM regkey";
//   dbConnection.query(sql, (err, result) => {
//     if (err) {
//       return res.json({ Message: "Error inside server" });
//     } else {
//       return res.json(result);
//     }
//   });
//   //return res.json("From Backend Side Nemal");
// });

app.get("/", (req, res) => {
  return res.json("From Backend Side Nemal");
});

app.use("/api/auth", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
