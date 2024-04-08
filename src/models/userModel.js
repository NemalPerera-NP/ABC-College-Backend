const db = require("../config/db");

const UserModel = {};

UserModel.findByUsername = async (userName) => {
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

UserModel.findByEmail = async (email) => {
  try {
    console.log("called function findByEmail.....");
    const [rows] = await db.query("SELECT * FROM users WHERE Email= ?", [
      email,
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

UserModel.findByNIC = async (nic) => {
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

UserModel.findByEmpId = async (empId) => {
  try {
    console.log("called function findByEmpId.....");
    const [rows] = await db.query("SELECT * FROM users WHERE employee_id= ?", [
      empId,
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

UserModel.create = async ({ Name, Nic, Username, Email, EmpId, password }) => {
  try {
    const sql =
      "INSERT INTO users (name, nic, username, email, employee_id, password) VALUES (?, ?, ?, ?, ?, ?)";
    const [result] = await db.query(sql, [
      Name,
      Nic,
      Username,
      Email,
      EmpId,
      password,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

UserModel.getRegKey = async () => {
  try {
    console.log("called function getRegKey.....");
    const [rows] = await db.query("SELECT * FROM `registration_key` WHERE 1");
    if (rows.length > 0) {
      console.log("user models....rows...", rows);
      return rows[0];
    }
    return null;
  } catch (error) {
    throw error;
  }
};

UserModel.upsertKey = async (newKeyHash) => {
  try {
    // Check if there's already a row in the table
    const checkSql = `SELECT id FROM registration_key LIMIT 1;`;
    const [rows] = await db.query(checkSql);
    console.log("rows...", rows);

    if (rows.length > 0) {
      console.log("row exsits....");

      // row exists, update it
      const updateSql = `UPDATE registration_key SET key_hash = ?, updated_at = NOW() WHERE id = ?;`;
      const result = await db.query(updateSql, [newKeyHash, rows[0].id]);
      console.log("row exsits...result...", result);

      return result;
    } else {
      // If no row exists, insert a new one
      const insertSql = `INSERT INTO registration_key (key_hash) VALUES (?);`;
      const result = await db.query(insertSql, [newKeyHash]);
      return result;
    }
  } catch (error) {
    throw new Error(`Error upserting registration key: ${error.message}`);
  }
};
module.exports = UserModel;
