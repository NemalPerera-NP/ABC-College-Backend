const express = require("express");
const cros = require("cors");
const dotenv = require("dotenv");
const dbConnection = require("./config/db");
const router = require("./routes/authRoutes");

dotenv.config();

const app = express();
app.use(cros());
app.use(express.json());

const PORT = process.env.PORT || 8080;



app.get("/", (req, res) => {
  return res.json("From Backend Side Nemal");
});

app.use("/api/auth", router);
app.use("/api/register", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
