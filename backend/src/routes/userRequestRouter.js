const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const ConnectionRequestModel = require("../model/request");
const userRequestRouter = express.Router();
const Allowed_Field_String = "firstName lastName age gender about photoUrl";

//Get All received requests
userRequestRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: loggedInUser,
      status: "intrested",
    }).populate("fromUserId", Allowed_Field_String);

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

userRequestRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequestModel.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", Allowed_Field_String)
      .populate("toUserId", Allowed_Field_String);

    const data = connectionRequest.map((item) => {
      if (loggedInUser._id.toString() === item.fromUserId._id.toString()) {
        return item.toUserId;
      } else {
        return item.fromUserId;
      }
    });
    res.json({
      message: "requests fetched succesfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

module.exports = userRequestRouter;
