const db = require("../config/db");

const StudentModel = {};

//fetch all the data from students table
StudentModel.getAllStudents = async () => {
  try {
    console.log("called function getAllStudents.....");
    const sql = `SELECT * FROM students`;
    const [students] = await db.query(sql);
    if (students.length > 0) {
      console.log("user models....rows...", students);
      return students;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

//fetching data about a specific student
StudentModel.findStudentByIndex=async()=>{
    try {
        console.log("called function findStudentByIndex.....");
        const sql = `SELECT * FROM students WHERE id = ?`;
        const [student] = await db.query(sql, [id]);
        if (student.length > 0) {
          console.log("user models....rows...", student);
          return student[0];
        }
        return null;
    } catch (error) {
        throw error;

    }
}

//delete a specific student data in the students table
StudentModel.deleteStudentData = async ({ id }) => {
  try {
    const sql = `DELETE FROM students WHERE id = ?`;
    return db.query(sql, [id]);
  } catch (error) {
    throw error;
  }
};

module.exports = StudentModel;
