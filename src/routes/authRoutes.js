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
const authenticateToken = require("../midleware/authToken");
const router = express.Router();

router.post("/login", loginUserControle);
router.post("/signup", userRegisterController);
router.post("/reg-key", userRegistrationKeyCreationControle);
router.post("/student", studentCreateController);
router.get("/get-setudents", authenticateToken, getallStudentController);
router.get("/get-setudents/:id", authenticateToken, getStudentByIdController);
router.put("/update-setudents/:id", authenticateToken, updateStudentController);
router.delete(
  "/delete-setudents/:id",
  authenticateToken,
  deleteStudentController
);
module.exports = router;
