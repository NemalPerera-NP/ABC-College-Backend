const { createNewStudent,getStudents } = require("../service/studentService");

const studentCreateController = async (req, res) => {
  try {
    console.log("Student create controller req.body......", req.body);
    const newStudent = await createNewStudent(req.body);
    console.log("Student create controller .newStudent......", newStudent);

    if (newStudent.success) {
      return res.status(201).json({
        success: true,
        message: "New Student added successful..",
        data: newStudent.data,
      });
    } else {
      // newStudent.success is false, handle according to newStudent.statusCode
      return res
        .status(newStudent.statusCode || 400)
        .json({ message: newStudent.message });
    }
  } catch (error) {
    console.error("New Student Creation controller error:", error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getallStudentController = async (req, res) => {
  try {
    console.log("req.body...", req.body);
    const allStudents = await getStudents();

    if (allStudents.success) {
      return res.status(200).json({
        success: true,
        message: "fetch successful.",
        data: allStudents,
      });
    } else {
      // signUpUser.success is false, handle according to signUpUser.statusCode
      return res
        .status(loginUser.statusCode || 400)
        .json({ message: loginUser.message });
    }
  } catch (error) {
    console.error("New Student Creation controller error:", error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
module.exports = { studentCreateController, getallStudentController };
