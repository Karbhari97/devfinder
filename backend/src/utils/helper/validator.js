const validator = require("validator");

const signupValidator = (req, res) => {
  let { firstName, lastName, emailId, password, age, gender } = req.body;

  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter strong password");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("please enter valid email address");
  } else if (firstName.trim() ==="" || lastName.trim() === "") {
    console.log(firstName)
     console.log(lastName)
    throw new Error("user name can not be empty");
  } else if (age < 18) {
    throw new Error("please enter valid email addres");
  } else if (gender !== "Female" && gender !== "Male" && gender !== "Other") {
    throw new Error("Gender can be Male Female & Others only");
  } else {
    return true;
  }
};

module.exports = {
  signupValidator,
};
