const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    console.log("📡 Attempting to connect to MongoDB...");

    const connection = await mongoose
      .connect(process.env.MONGODB_URI)
      .catch((error) => {
        console.error("❌ MongoDB connection error:", error);
        throw error;
      });

    console.log(`✅ MongoDB Connected: ${connection.connection.host}`);

    return connection;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

module.exports = connectDB;
