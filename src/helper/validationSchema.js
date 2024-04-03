const db = require("../config/db");

const validationSchema = {};

validationSchema.findByUsername = async (userName) => {
  try {
    console.log("called function findByUsername.....");
    const [rows] = await db.query("SELECT * FROM users WHERE username= ?", [
      userName,
    ]);
    if (rows.length > 0) {
      console.log("user models....rows...", rows);
      return rows[0];
    }
    return null;
  } catch (error) {
    throw error;
  }
};

validationSchema.findByEmail = async (email) => {
  try {
    console.log("called function findByEmail.....");
    const [rows] = await db.query("SELECT * FROM users WHERE Email= ?", [email]);
    if (rows.length > 0) {
      console.log("user models....rows...", rows);
      return rows[0];
    }
    return null;
  } catch (error) {
    throw error;
  }
};

validationSchema.findByNIC = async (nic) => {
  try {
    console.log("called function findByNIC.....");
    const [rows] = await db.query("SELECT * FROM users WHERE Nic= ?", [nic]);
    if (rows.length > 0) {
      console.log("user models....rows...", rows);
      return rows[0];
    }
    return null;
  } catch (error) {
    throw error;
  }
};

validationSchema.findByEmpId = async (empId) => {
  try {
    console.log("called function findByEmpId.....");
    const [rows] = await db.query("SELECT * FROM users WHERE employee_id= ?", [empId]);
    if (rows.length > 0) {
      console.log("user models....rows...", rows);
      return rows[0];
    }
    return null;
  } catch (error) {
    throw error;
  }
};

module.exports = validationSchema;
