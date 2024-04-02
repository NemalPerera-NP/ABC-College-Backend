const { authonticateUser, registerUser } = require("../service/authService");

// const userRegisterController = async (req, res) => {
//   try {
//     const signUpUser = await registerUser(req.body);
//     console.log("signUpUser.....", signUpUser.success);

//     if (signUpUser.success) {
//       return res.status(201).json({
//         success: true,
//         message: "Registration successful, please login.",
//         data: signUpUser.result, // Assuming you want to return some result
//       });
//     } else {
//       // If signUpUser.success is false
//       return res.status(400).json({ message: signUpUser.message });
//     }

//   } catch (error) {
//     console.error("Registration controller error:", error);
//     res.status(500).json({ message: "Internal server error" });  }
// };

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
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await authonticateUser(username);
    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = { login, userRegisterController };
