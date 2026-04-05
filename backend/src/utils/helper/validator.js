const validator = require("validator");

const signupValidator = (req, res) => {
  let { firstName, lastName, emailId, password, age, gender } = req.body;

  if (password && !validator.isStrongPassword(password)) {
    throw new Error("Please enter strong password");
  }
  if (emailId && !validator.isEmail(emailId)) {
    throw new Error("please enter valid email address");
  } else if (firstName && lastName && firstName.trim() ==="" || lastName.trim() === "") {
    throw new Error("user name can not be empty");
  } else if (age && age < 18) {
    throw new Error("please enter valid age ");
  } else if (gender && gender !== "Female" && gender !== "Male" && gender !== "Other") {
    throw new Error("Gender can be Male Female & Others only");
  } else {
    return true;
  }
};




module.exports = {
  signupValidator,
};
