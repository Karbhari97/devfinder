const jwt = require("jsonwebtoken");
const User = require("../model/user");
const userAuth = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(200).json({ message: "Missing auth token" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET || "SachinJWTSign");
    const user = await User.findById(data._id);
    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Auth middleware error", error);
    return res.status(200).json({ message: "Invalid or expired token" });
  }
};

module.exports = {
  userAuth,
};
