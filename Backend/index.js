import dotenv from "dotenv";
import connectDB from "./db/connectdb.js";
import app from './app.js';

dotenv.config();

const DB_NAME = process.env.DB_NAME;

connectDB(DB_NAME)
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port: ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed!!!", err);
  });
