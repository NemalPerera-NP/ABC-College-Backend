const db = require("../config/db");

const userModel = {};

userModel.findByUsername = async (userName) => {
  try {
    console.log("called function findByUsername.....");
    const [rows] = await db.query("SELECT * FROM user WHERE Username= ?", [
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

userModel.findByEmail = async (email) => {
  try {
    console.log("called function findByEmail.....");
    const [rows] = await db.query("SELECT * FROM user WHERE Email= ?", [email]);
    if (rows.length > 0) {
      console.log("user models....rows...", rows);
      return rows[0];
    }
    return null;
  } catch (error) {
    throw error;
  }
};

userModel.findByNIC = async (nic) => {
  try {
    console.log("called function findByNIC.....");
    const [rows] = await db.query("SELECT * FROM user WHERE Nic= ?", [nic]);
    if (rows.length > 0) {
      console.log("user models....rows...", rows);
      return rows[0];
    }
    return null;
  } catch (error) {
    throw error;
  }
};
userModel.findByEmpId = async (empId) => {
  try {
    console.log("called function findByEmpId.....");
    const [rows] = await db.query("SELECT * FROM user WHERE EmpId= ?", [empId]);
    if (rows.length > 0) {
      console.log("user models....rows...", rows);
      return rows[0];
    }
    return null;
  } catch (error) {
    throw error;
  }
};
module.exports = userModel;
