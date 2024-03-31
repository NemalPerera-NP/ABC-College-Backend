const { authonticateUser } = require("../service/authService");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await authonticateUser(username);
    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = { login };
