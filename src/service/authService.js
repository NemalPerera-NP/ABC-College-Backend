const userModel = require("../models/userModel");
const { hashPassword } = require("../helper/hashPassword");
const dbConnection = require("../config/db");

const registerUser = async ({
  Name,
  Nic,
  Username,
  Email,
  EmpId,
  password,
}) => {
  try {
    console.log(".....", Name, Nic, Username, Email, EmpId, password);
    if (!Name || !Nic || !Email || !Username || !EmpId || !password) {
      const error = new Error("All the fields must be filled");
      error.statusCode = 400; // Bad Request
      throw error;
      //working corectly
    }
    const usernameExsist = await userModel.findByUsername(Username);
    if (usernameExsist) {
      // throw new Error("Username Already Exists");
      //working corectly
      const error = new Error("Username already exists");
      error.statusCode = 409; // Conflict
      throw error;
    }

    const emailExsist = await userModel.findByEmail(Email);
    if (emailExsist) {
      //throw new Error("User Already Registered with This Email");
      //working corectly
      const error = new Error("User Already Registered with This Email");
      error.statusCode = 409; // Conflict
      throw error;
    }
    const nicExsist = await userModel.findByNIC(Nic);
    if (nicExsist) {
      //throw new Error("User Already Registered with This NIC");
      //working corectly
      const error = new Error("User Already Registered with This NIC");
      error.statusCode = 409; // Conflict
      throw error;
    }
    const empIdExsist = await userModel.findByEmpId(EmpId);
    if (empIdExsist) {
      console.log("empIdExsist", empIdExsist);
      // throw new Error("User Already Registered with This Employee ID");
      //working corectly
      const error = new Error("User Already Registered with This Employee ID");
      error.statusCode = 409; // Conflict
      throw error;
    }

    console.log("pass........", password);
    const hashPass = await hashPassword(password);
    console.log("pass........", hashPass, password);

    const sql =
      "INSERT INTO `user`(`Name`, `Nic`, `Username`, `Email`, `EmpId`, `password`) VALUES (?,?,?,?,?,?)";

    const [result] = await dbConnection.query(
      sql,
      [Name, Nic, Username, Email, EmpId, hashPass]
  );
  console.log("result", result);

   // Proceed with your logic after the successful execution
    // For example, checking result or result.affectedRows depending on your operation
    if (result.affectedRows > 0) {
      console.log("result.....inside if", result);

      return { success: true, result };
  } else {
      // Handle the case where the query doesn't affect any rows as needed
      return { success: false, message: "User not saved successfully", statusCode: 500 };  }
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500; // Ensures there is a default error code
    throw error;
  }
};

const authonticateUser = async (username) => {
  const user = await userModel.findByUsername(username);
  if (!user) {
    console.log("user<<<", user);
    // return {
    //   sucsess: false,
    //   message: "user not Found",
    // };
    throw new Error("User Not Found");
  }
  // return {
  //   sucsess: true,
  //   user,
  // };
  console.log("user>>>>>>>", user);
  return user;
};

module.exports = { authonticateUser, registerUser };
