const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authToken = req.headers.authorization;
  const token = authToken?.split(" ")[1];

  try {
    if (token == "null" || !token) {
      return res.status(401).json({ error: "Token is missing" });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.username = decoded.username;
    next();
  } catch (error) {
    res.json(error);
    return;
  }
};
module.exports = authMiddleware;
