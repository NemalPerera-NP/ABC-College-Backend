const { loginUserService, registerUser } = require("../service/authService");


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
module.exports = { loginUserControle, userRegisterController };
