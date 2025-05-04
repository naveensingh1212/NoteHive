import dotenv from "dotenv";
import connectDB from "./db/connectdb.js";
import app from './app.js';

dotenv.config();

const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT || 8000; // Set the port to either the environment variable or fallback to 8000

connectDB(DB_NAME)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️ Server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed!!!", err);
  });
