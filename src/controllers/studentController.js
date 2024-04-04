const {
  createNewStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../service/studentService");

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

const getStudentByIdController = async (req, res) => {
  try {
    const student = await getStudentById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    console.error("New Student Creation controller error:", error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const updateStudentController = async (req, res) => {
  try {
    console.log("body.....",req.body)
    const student = await updateStudent(req.params.id, req.body);
    res.json({ message: "Student updated successfully", student });
  } catch (error) {
    console.error("New Student Creation controller error:", error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const deleteStudentController = async (req, res) => {
  try {
    console.log("req.params.id", req.params.id);
    const response = await deleteStudent(req.params.id);
    if (!response.success) {
      return res.status(404).json({ message: response.message });
    }
    res.json({ message: response.message });
  } catch (error) {
    console.error("New Student Creation controller error:", error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
module.exports = {
  studentCreateController,
  getallStudentController,
  getStudentByIdController,
  updateStudentController,
  deleteStudentController,
};
