const {
  loginUserService,
  registerUser,
  regKeyValidation,
  regKeyupdate,
} = require("../service/authService");

const userRegisterController = async (req, res) => {
  try {
    const signUpUser = await registerUser(req.body);

    if (signUpUser.success) {
      return res.status(201).json({
        success: true,
        message: "Registration successful, please login.",
        data: signUpUser.result,
      });
    } else {
      // signUpUser.success is false, handle according to signUpUser.statusCode
      return res
        .status(signUpUser.statusCode || 400)
        .json({ message: signUpUser.message });
    }
  } catch (error) {
    console.error("Registration controller error:", error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

//controller for user login and validation
const loginUserControle = async (req, res) => {
  try {
    console.log("req.body...", req.body);
    const loginUser = await loginUserService(req.body);

    if (loginUser.success) {
      return res.status(200).json({
        success: true,
        message: "Login successful.",
        data: loginUser.loginUser,
        token: loginUser.token,
      });
    } else {
      // signUpUser.success is false, handle according to signUpUser.statusCode
      return res
        .status(loginUser.statusCode || 400)
        .json({ message: loginUser.message });
    }
  } catch (error) {
    console.error("Registration controller error:", error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

//controller for registration key management
const userRegistrationKeyCreationControle = async (req, res) => {
  try {
    console.log("req.body...", req.body);
    const RegKey = await regKeyValidation(req.body);

    if (RegKey.success) {
      return res.status(200).json({
        success: true,
        message: "Registration Key Matched Sucessfully",
        data: RegKey.isRegKeyMatch,
      });
    } else {
      // signUpUser.success is false, handle according to signUpUser.statusCode
      return res
        .status(loginUser.statusCode || 400)
        .json({ message: loginUser.message });
    }
  } catch (error) {
    console.error("Registration controller error:", error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

//controller for update Registration Key
const regKeyupdateController = async (req, res) => {
  try {
    console.log("req.body...", req.body);
    const RegKeyupdate = await regKeyupdate(req.body);

    if (RegKeyupdate.success) {
      return res.status(201).json({
        success: true,
        message: RegKeyupdate.message,
      });
    } else {
      return res
        .status(RegKeyupdate.statusCode || 400)
        .json({ message: RegKeyupdate.message });
    }
  } catch (error) {
    console.error("Registration Key Update controller error:", error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
module.exports = {
  loginUserControle,
  userRegisterController,
  userRegistrationKeyCreationControle,
  regKeyupdateController,
};
