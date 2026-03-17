const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const ConnectionRequestModel = require("../model/request");
const userRequestRouter = express.Router();

//Get All received requests
userRequestRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: loggedInUser,
      status: "intrested",
    }).populate("fromUserId", "firstName lastName age gender about photoUrl");

    if (connectionRequests) {
      return res.status(200).json({
        message: "connection requests",
        data: connectionRequests,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = userRequestRouter;
