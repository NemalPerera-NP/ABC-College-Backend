const express = require("express");
const {
  loginUserControle,
  userRegisterController,
  userRegistrationKeyCreationControle,
} = require("../controllers/authController");

const {
  studentCreateController,
  getallStudentController,
} = require("../controllers/studentController");

const router = express.Router();

//router.post("login", userLogin);
//router.post("/reg-key",userVerificationRegKey)
router.post("/login", loginUserControle);
router.post("/signup", userRegisterController);
router.post("/reg-key", userRegistrationKeyCreationControle);
router.post("/student", studentCreateController);
router.get("/get-setudents", getallStudentController);
module.exports = router;
