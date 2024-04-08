const StudentModel = require("../models/students");

const createNewStudent = async (studentData) => {
  try {
    const nic_Exsits = await StudentModel.findByElement("nic", studentData.nic);
    if (nic_Exsits) {
      const error = new Error("Student has Already used This NIC");
      error.statusCode = 409; // Conflict
      throw error;
    }

    const studentId_Exsits = await StudentModel.findByElement(
      "student_id",
      studentData.student_id
    );
    if (studentId_Exsits) {
      const error = new Error("Student has Already used This student Id");
      error.statusCode = 409; // Conflict
      throw error;
    }

    const email_Exsits = await StudentModel.findByElement(
      "email",
      studentData.email
    );
    if (email_Exsits) {
      const error = new Error("Student has Already used This Email");
      error.statusCode = 409; // Conflict
      throw error;
    }
    const contactNumber_Exsits = await StudentModel.findByElement(
      "contact_number",
      studentData.contact_number
    );
    if (contactNumber_Exsits) {
      const error = new Error("Student has Already used This Contact Number");
      error.statusCode = 409; // Conflict
      throw error;
    }

    const [result, _] = await StudentModel.addStudent(studentData); 
    console.log("result Service....", result);

    if (result && result.affectedRows > 0) {
      return {
        success: true,
        data: { insertId: result.insertId, ...studentData },
      };
    } else {
      return {
        success: false,
        message: "Failed to create new student",
        statusCode: 500,
      };
    }
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500; 
    throw error;
  }
};

const getStudents = async () => {
  try {
    const students = await StudentModel.getAllStudents();
    return { success: true, students };
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500; 
    throw error;
  }
};

const getStudentById = async (id) => {
  try {
    const students = await StudentModel.findStudentByIndex(id);
    return { success: true, students };
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500; 
    throw error;
  }
};

const updateStudent = async (id, studentData) => {
  try {
    console.log("body...../////////", id, studentData);

    const students = await StudentModel.updateStudentData(id, studentData);
    return { success: true, students };
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500; 
    throw error;
  }
};

const deleteStudent = async (id) => {
  try {
    const students = await StudentModel.deleteStudentData(id);
    if (students.affectedRows === 0) {
      return {
        success: false,
        message: "No student found with the provided ID",
      };
    }
    return { success: true, message: "Student deleted successfully" };
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500; 
    throw error;
  }
};

module.exports = {
  createNewStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
