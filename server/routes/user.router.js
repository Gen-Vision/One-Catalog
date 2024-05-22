const express = require("express");
const User = require("../model/user.Schema");
const router = express.Router();
const { getToken, verifyToken } = require("../utils/tokenUtils");

const { handleError } = require("../utils/errorUtils.js");
const { isValidEmail, encryptPassword, checkPassword } = require("../utils/AuthUtils.js");


router
  .get("/refreshLogin", verifyToken, async (req, res, next) => {
    try {
      let userId = req.decoded.data;
      const user = await User.findById(userId);
      if (!user) next(handleError(404, "User does not exist"));
      const token = getToken(userId);
      var userName = user.username.split('@');
      res.status(200).json({ message: "Logged In", token: token,user : userName[0]  });
    } catch (error) {
      next(error);
    }
  })
  .post("/login", async (req, res, next) => {
    try {
      let { username, password } = req.body;
      if (!username || !password || !isValidEmail(username)) next(handleError(400, "Invalid Username or password"));

      const user = await User.findOne({ username: username });

      if (!user) next(handleError(404, "User does not exist"));
      if (!checkPassword(password,user.password))
        next(handleError(401, "Wrong password"));
      const token = getToken(user._id);
      var userName = username.split('@');
      res
        .status(200)
        .json({ message: "Logged In", token: token, user : userName[0] });
    } catch (error) {
      next(error);
    }
  })
  .post("/register", async (req, res, next) => {
    try {
      let { username, password, name } = req.body;
      if (!username || !password || !isValidEmail(username))
        next(handleError(400, "Invalid Username or password"));

      const existingUser = await User.findOne({ username: username });
      if (existingUser) next(handleError(400, "User Already exist"));

      const body = {
        username: username,
        password: encryptPassword(password),
        name,
      };

      const newUser = await userModel.create({ ...body });
      var userName = username.split('@');
      res.status(200).json({
        statusCode: 200,
        message: "User Created",
        token: getToken(newUser._id),
        user : userName[0]
      });
    } catch (error) {
      next(error);
    }
  })
  .get("/getUser", verifyToken, (req, res, next) => {
    let userId = req.decoded.data;
    User
      .findById(userId)
      .then((foundUser) => res.status(200).send(foundUser))
      .catch((err) => next(err));
  });

module.exports = router;