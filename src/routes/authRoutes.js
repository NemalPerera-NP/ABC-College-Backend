const express = require("express");
const {
  loginUserControle,
  userRegisterController,
  userRegistrationKeyCreationControle,
} = require("../controllers/authController");

const {
  studentCreateController,
  getallStudentController,
  getStudentByIdController,
  updateStudentController,
  deleteStudentController,
} = require("../controllers/studentController");

const router = express.Router();

//router.post("login", userLogin);
//router.post("/reg-key",userVerificationRegKey)
router.post("/login", loginUserControle);
router.post("/signup", userRegisterController);
router.post("/reg-key", userRegistrationKeyCreationControle);
router.post("/student", studentCreateController);
router.get("/get-setudents", getallStudentController);
router.get("/get-setudents:id", getStudentByIdController);
router.put("/update-setudents:id", updateStudentController);
router.delete("/delete-setudents:id", deleteStudentController);
module.exports = router;
