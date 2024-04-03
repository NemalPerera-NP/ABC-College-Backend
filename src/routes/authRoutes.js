const express = require("express");
const {
  loginUserControle,
  userRegisterController,
} = require("../controllers/authController");

const router = express.Router();

//router.post("login", userLogin);
//router.post("/reg-key",userVerificationRegKey)
router.post("/login", loginUserControle);
router.post("/signup", userRegisterController);

module.exports = router;
