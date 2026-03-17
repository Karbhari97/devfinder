const mongoose = require("mongoose");

//bad way
// mongoose.connect("mongodb+srv://karbharigadekar706_db_user:Fbr2IR1L8pmHljzY@devfinder.uksazbr.mongodb.net/");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://karbharigadekar706_db_user:Sachin97@devfinder.uksazbr.mongodb.net/?appName=devfinder",
  );
};

module.exports = {
  connectDB,
};
