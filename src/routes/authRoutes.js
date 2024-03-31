const express = require("express");
const {login} = require("../controllers/authController");

const router = express.Router();

//router.post("login", userLogin);
//router.post("/reg-key",userVerificationRegKey)
router.post('/login', login);

module.exports = router;
