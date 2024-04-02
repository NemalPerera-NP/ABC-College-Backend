const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    console.log("came to hashPassword....");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    //console.log("hash,,,,,,",hash)
    return hash;
  } catch (error) {
    console.log("error....", err);
    throw err;
  }
};

module.exports = { hashPassword };
