const StudentModel = require("../models/students");

const createNewStudent = async (studentData ) => {
  try {
    
    const [result, _] = await StudentModel.addStudent(studentData); // Destructure to get the result
    console.log("result Service....", result);

    // Correctly assess operation success
    if (result && result.affectedRows > 0) {
      return { success: true, data: { insertId: result.insertId, ...studentData } };
    } else {
      return { success: false, message: "Failed to create new student", statusCode: 500 };
    }
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500; // Ensures there is a default error code
    throw error;
  }
};

module.exports = { createNewStudent };
