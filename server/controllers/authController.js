const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

async function authenticate(username, password) {
  const user = await User.findOne({ username });
  if (!user) {
    return false;
  }
  const fetchedPassword = user.password;
  const auth = await bcrypt.compare(password, fetchedPassword);
  if (auth == true) {
    return user.username;
  } else {
    return false;
  }
}

const register = async (req, res) => {
  const { username, password } = req.body;
  if (await User.findOne({ username: username })) {
    res.json({ error: "User already exists" });
  } else if (!username || !password) {
    res.json({ error: "Empty body received" });
  } else {
    try {
      const encryptedPassword = await bcrypt.hash(password, 10);
      await User.create({
        username: username,
        password: encryptedPassword,
      });

      const jwtToken = jwt.sign(
        { username, password },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        Success: "Added successfully",
        user: username,
        token: jwtToken,
      });
    } catch (err) {
      res.json({ error: err });
    }
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.json({ error: "Add Information" });
  } else {
    const isAuthenticated = await authenticate(username, password);
    if (isAuthenticated) {
      try {
        const jwtToken = jwt.sign({ username }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.json({
          authentication: true,
          status: "SUCCESS",
          Success: "Logged in successfully",
          token: jwtToken,
          user: username,
        });
      } catch (err) {
        res.json({
          error: err,
        });
      }
    } else {
      res.json({
        authentication: false,
        status: "FAIL",
        message: "Invalid Credentials",
        error: "Failed",
      });
    }
  }
};

const validateToken = async (req, res) => {
  return res.status(200).json({
    message: "Token validated",
  });
};
module.exports = {
  register,
  login,
  authenticate,
  validateToken,
};
