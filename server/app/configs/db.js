require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connection established");
    return true;
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  return false;
};

module.exports = { connectDB };
