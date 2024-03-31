const userModel = require("../models/userModel");

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

module.exports = { authonticateUser };
