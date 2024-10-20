// MongoDB connection
let mongoose = require("mongoose");
const connectDB = async () => {
  try {
    let conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongodb connected :${conn.Connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1); // Exit process with failure
  }
};
module.exports = connectDB;
