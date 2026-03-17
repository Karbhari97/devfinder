const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require('validator')

const JWT_SECRET = process.env.JWT_SECRET || "SachinJWTSign";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 10,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 10,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(value)) {
          throw new Error("not a valid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    about:{
      type :String
    },
    photoUrl:{
      type:String,
      required:true,
      validate(value){
        if(!validator.isURL(value)){
            throw new Error(`${value} is not a valide URL`)
        }
      }
    },
    age: {
      type: Number,
      required: true,
      min: 10,
      maxLength: 20,
    },
    gender: {
      type: String,
      required: true,
      enum: {
        values: ["Male", "Female","Other"],
        message: "{value} is not supported",
      },
    },
  },
  { timestamps: true },
);

userSchema.methods.getJWT = async function () {
  const token = jwt.sign({ _id: this._id }, "SachinJWTSign", {
    expiresIn: "1h",
  });
  return token;
};

userSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
