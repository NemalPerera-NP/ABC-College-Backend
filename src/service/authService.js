const UserModel = require("../models/userModel");
const { hashPassword, comparePassword } = require("../helper/hashPassword");
const dbConnection = require("../config/db");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");

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
    const usernameExsist = await UserModel.findByUsername(Username);
    if (usernameExsist) {
      // throw new Error("Username Already Exists");
      //working corectly
      const error = new Error("Username already exists");
      error.statusCode = 409; // Conflict
      throw error;
    }

    const emailExsist = await UserModel.findByEmail(Email);
    if (emailExsist) {
      //throw new Error("User Already Registered with This Email");
      //working corectly
      const error = new Error("User Already Registered with This Email");
      error.statusCode = 409; // Conflict
      throw error;
    }
    const nicExsist = await UserModel.findByNIC(Nic);
    if (nicExsist) {
      //throw new Error("User Already Registered with This NIC");
      //working corectly
      const error = new Error("User Already Registered with This NIC");
      error.statusCode = 409; // Conflict
      throw error;
    }
    const empIdExsist = await UserModel.findByEmpId(EmpId);
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

    const result = await UserModel.create({
      Name,
      Nic,
      Username,
      Email,
      EmpId,
      password: hashPass,
    });
    console.log("result", result);

    // Proceed with your logic after the successful execution
    // For example, checking result or result.affectedRows depending on your operation
    if (result.affectedRows > 0) {
      console.log("result.....inside if", result);

      return { success: true, result };
    } else {
      // Handle the case where the query doesn't affect any rows as needed
      return {
        success: false,
        message: "User not saved successfully",
        statusCode: 500,
      };
    }
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500; // Ensures there is a default error code
    throw error;
  }
};

//User Login validation
//check the status codes later
const loginUserService = async ({ username, password }) => {
  try {
    const loginUser = await UserModel.findByUsername(username);
    if (!loginUser) {
      //working corectly
      const error = new Error("Username Doesn't exists");

      error.statusCode = 409; // Conflict
      throw error;
    }
    console.log("usernameExsist....", loginUser.password);
    const isPasswordMatch = await comparePassword(password, loginUser.password);
    if (!isPasswordMatch) {
      //working corectly
      const error = new Error("Invalid Password");
      console.log("isPasswordMatch....", isPasswordMatch);

      error.statusCode = 409; // Conflict
      throw error;
    }
    // const token = "nemalllllll";

    const token = JWT.sign({ Nic: loginUser.Nic }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("isPasswordMatch....", token);

    return { success: true, loginUser, token };
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500; // Ensures there is a default error code
    throw error;
  }
};

const regKeyValidation = async ({ regkey }) => {
  try {
    const RegistrationKey = await UserModel.getRegKey();
    console.log("RegistrationKey......",regkey,RegistrationKey)
    const isRegKeyMatch = await comparePassword(
      regkey,
      RegistrationKey.key_hash
    );
    if (!isRegKeyMatch) {
      //working corectly
      const error = new Error("Invalid Registration Key");
      console.log("isPasswordMatch....", isRegKeyMatch);

      error.statusCode = 409; // Conflict
      throw error;
    }

    return { success: true, isRegKeyMatch };
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500; // Ensures there is a default error code
    throw error;
  }
};
module.exports = { loginUserService, registerUser,regKeyValidation };
