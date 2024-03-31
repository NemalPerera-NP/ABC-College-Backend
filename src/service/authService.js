const userLogin = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await veriFyUser(username, password);
      return res.status(200).json({
        message: "Login Sucessful",
        user,
      });
    } catch (error) {
      return res.status(401).json({
        message: error.message,
      });
    }
  };
  
  export{userLogin}