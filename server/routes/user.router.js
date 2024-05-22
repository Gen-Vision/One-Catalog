const express = require("express");
const User = require("../model/user.Schema");
const router = express.Router();
const { getToken, verifyToken } = require("../utils/tokenUtils");

const { handleError } = require("../utils/errorUtils.js");


router
  .get("/refreshLogin", verifyToken, async (req, res, next) => {
    try {
      let userId = req.decoded.data;
      const user = await User.findById(userId);
      if (!user) next(handleError(404, "User does not exist"));
      const token = getToken(userId);
      res.status(200).json({ message: "Logged In", token: token, _id: userId });
    } catch (error) {
      next(error);
    }
  })
  .post("/login", async (req, res, next) => {
    try {
      let { username, password } = req.body;
      if (!username || !password) next(handleError(400, "Invalid Data"));

      const user = await User.findOne({ username: username });

      if (!user) next(handleError(404, "User does not exist"));
      if (user.password !== password)
        next(handleError(400, "Wrong password or username"));
      const token = getToken(user._id);

      res
        .status(200)
        .json({ message: "Logged In", token: token, _id: user._id });
    } catch (error) {
      next(error);
    }
  })
  .post("/register", async (req, res, next) => {
    try {
      let { username, password, name } = req.body;
      if (!username || !password)
        next(handleError(400, "Invalid Username or password"));

      const existingUser = await User.findOne({ username: username });
      if (existingUser) next(handleError(400, "User Already exist"));

      const body = {
        username: username,
        password: password,
        name,
      };

      const newUser = await User.create({ ...body });

      res.status(200).json({
        statusCode: 200,
        message: "User Created",
        token: getToken(newUser._id),
        _id: newUser._id,
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