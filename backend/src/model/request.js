const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref:'User'
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref:'User'
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "intrested", "rejected", "accepted"],
        message: "{VALUE} is not a valid parameter",
      },
    },
  },
  { timestamps: true },
);

const ConnectionRequestModel = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema,
);
module.exports = ConnectionRequestModel;
