const jwt = require("jsonwebtoken");
const User = require("../model/user");
const userAuth = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: "Missing auth token" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET || "SachinJWTSign");
    console.log("data ------------>", data);

    const user = await User.findById(data._id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Auth middleware error", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = {
  userAuth,
};
