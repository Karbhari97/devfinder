const express = require("express");
const { signupValidator } = require("../utils/helper/validator");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const userAuth = require("../middlewares/userAuth");

const userAuthRouter = express.Router();

userAuthRouter.post("/signUp", async (req, res) => {
  try {
    const isValidData = signupValidator(req);

    if (isValidData) {
      const {
        firstName,
        lastName,
        emailId,
        password,
        about,
        photoUrl,
        age,
        gender,
      } = req.body;

      const passwordHash = await bcrypt.hash(password, 10);

      const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
        about,
        photoUrl,
        age,
        gender,
      });
      await user.save();
      res.status(200).json(`Hi ${firstName} you have signed up succesfully !!`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

userAuthRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId: emailId });
    if (user) {
      const isValidPassword = await user.validatePassword(password);
      if (isValidPassword) {
        const token = await user.getJWT();
        res.cookie("token", token);
        res.status(200).json({ message: "login success", user });
      } else {
        return res.status(200).json({ message: "invalid credentials" });
      }
    } else {
      return res.status(200).json({ message: "user not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

userAuthRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("logout succesfully");
});

userAuthRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const isValidData = signupValidator(req);
    const loggedInUser = req.user;

    if (isValidData) {
      Object.keys(req.body).forEach((key) => {
        loggedInUser[key] = req.body[key];
      });

      await loggedInUser.save();

      res.status(200).json({
        message: `${loggedInUser.firstName} your profile updated succesfully`,
        data: loggedInUser,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", data: error });
  }
});

module.exports = {
  userAuthRouter,
};
