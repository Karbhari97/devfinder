const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/userAuth");
const { userAuthRouter } = require("./routes/userRoute");
const { connectionRouter } = require("./routes/connectionRouter");
const userRequestRouter = require("./routes/userRequestRouter");

const app = express();
const PORT = 3000;

(async () => {
  try {
    await connectDB();
    console.log("Succesfully connected to the db");
    app.listen(PORT, () => {
      console.log(`Server is runing on port ${PORT}...`);
    });
  } catch (err) {
    console.log("Error while connceting to the DB", err);
  }
})();

app.use(express.json());
app.use(cookieParser());
app.use("/", userAuthRouter);
app.use("/", connectionRouter);
app.use("/", userRequestRouter);

app.patch("/useremailid/:emailId", async (req, res) => {
  const param = req.params.emailId;
  const data = req.body;
  try {
    await User.findOneAndUpdate({ emailId: param }, data, {
      runValidators: true,
    });
    res.status(200).send("User updated succesfully");
  } catch (error) {
    console.log(error);
    res.send(error._message);
  }
});

app.get("/user", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userEmailId = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmailId });
    if (Object.keys(user).length === 0) {
      res.status(404).send("User not found");
    } else {
      try {
        await User.deleteOne(user._id);
        res.status(200).send("User deleted succesfully");
      } catch (error) {
        console.log(error);
        res.send("Error while deleting");
      }
    }
  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
});
