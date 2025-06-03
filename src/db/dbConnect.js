const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.DB_URL;

async function dbConnect() {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
}

module.exports = dbConnect;
