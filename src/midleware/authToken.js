const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token is missing or invalid",
    });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Token is not valid",
    });
  }
};

module.exports = authenticateToken;
