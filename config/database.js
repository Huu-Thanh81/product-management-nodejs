const mongoose = require("mongoose");
module.exports.connect = async (MONGO_URI) => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};
