const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const ConnectionRequestModel = require("../model/request");
const user = require("../model/user");
const mongoose = require("mongoose");

const connectionRouter = express.Router();

// This post api take responsibility of sending or rejecting the user profile.
connectionRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowed_status = ["intrested", "ignored"];

      if (!allowed_status.includes(status)) {
        return res
          .status(400)
          .json({ message: `${status} status not allowed` });
      }

      if (!mongoose.Types.ObjectId.isValid(toUserId)) {
        return res.status(400).json({ message: "Invalid toUserId" });
      }

      const toUser = await user.findById(toUserId);

      if (!toUser) {
        return res.status(404).json({ message: "user not found" });
      }

      if (fromUserId.toString() === toUserId) {
        return res
          .status(400)
          .json({ message: "Cannot send connection request to yourself" });
      }

      let isRequestPresent = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (isRequestPresent) {
        return res
          .status(200)
          .json({ message: "connection request already exists." });
      }

      let connectionRequest = new ConnectionRequestModel({
        toUserId,
        status,
        fromUserId,
      });

      const data = await connectionRequest.save();

      if (status === "intrested") {
        return res.json({
          message: "Connection request sent successfully",
          data,
        });
      } else {
        return res.json({ message: "Person ignored succesfully", data });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
);

//Accept or reject request
connectionRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;
      const allowed_status = ["accepted", "rejected"];
      const loggedInUser = req.user._id;
      console.log("logged", loggedInUser);
      if (!allowed_status.includes(status)) {
        return res
          .status(400)
          .json({ message: `bad request ${status} not allowed` });
      }

      const isRequestPresent = await ConnectionRequestModel.findOne({
        _id: requestId,
      });

      if (!isRequestPresent) {
        return res.status(404).json({ message: "Request not found" });
      }

      const connectionRequest = await ConnectionRequestModel.findOne({
        toUserId: loggedInUser,
        _id: requestId,
        status: "intrested",
      });

      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Request not found or not pending" });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.status(200).json({ message: `Request ${status} succesfully.`, data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong !!" });
    }
  },
);

module.exports = {
  connectionRouter,
};
