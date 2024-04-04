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
StudentModel.findStudentByIndex = async (id) => {
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
};

//delete a specific student data in the students table
StudentModel.deleteStudentData = async (id) => {
  try {
    const sql = `DELETE FROM students WHERE id = ?`;
    const [result] = await db.query(sql, [id]);
    return result;
  } catch (error) {
    throw error;
  }
};

StudentModel.updateStudentData = async (id, studentData ) => {
  try {
    console.log("body>>>>>>>>>>>>>", id, studentData);

    if (!studentData || typeof studentData !== "object" || !Object.keys(studentData).length) {
      throw new Error("Invalid or empty student data provided");
    }

    const fieldsToUpdate = Object.entries(studentData)
      .map(([key, value]) => `${key} = ?`)
      .join(", ");
    const sql = `UPDATE students SET ${fieldsToUpdate} WHERE id = ?`;

    await db.query(sql, [...Object.values(studentData), id]);

    // Directly use StudentModel.findStudentById without relying on `this`
    return StudentModel.findStudentByIndex(id);
  } catch (error) {
    throw error;
  }
};

StudentModel.addStudent = async (studentData) => {
  try {
    const sql = `INSERT INTO students (name_with_initials, address, date_of_birth, gender, nic, student_id, email, contact_number, parent_number, enrolled_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    return db.query(sql, Object.values(studentData));
  } catch (error) {
    throw error;
  }
};

//fwtch data for a particular item from the students table
StudentModel.findByElement = async (colName, element) => {
  const validColumns = ["nic", "student_id", "email", "contact_number"];
  if (!validColumns.includes(colName)) {
    throw new Error(`Invalid column name: ${colName}`);
  }
  try {
    console.log("called function findByElement.....", colName, element);
    const [rows] = await db.query(
      `SELECT * FROM students WHERE ${colName} = ?`,
      [element]
    );
    if (rows.length > 0) {
      console.log("user models....rows...", rows);
      return rows[0];
    }
    return null;
  } catch (error) {
    throw error;
  }
};
module.exports = StudentModel;
