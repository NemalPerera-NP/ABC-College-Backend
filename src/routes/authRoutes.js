const express = require("express");
const {
  login,
  userRegisterController,
} = require("../controllers/authController");

const router = express.Router();

//router.post("login", userLogin);
//router.post("/reg-key",userVerificationRegKey)
router.post("/login", login);
router.post("/signup", userRegisterController);

module.exports = router;
