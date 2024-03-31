const db = require("../config/db");

const userModel = {};

userModel.findByUsername = async (userName) => {
  try {
    console.log("username.....", userName);
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

module.exports = userModel;
