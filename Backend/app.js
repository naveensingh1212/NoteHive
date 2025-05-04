import express from 'express';
import dotenv from "dotenv";
import router from './routes/note.routes.js';
import userRoutes from "./routes/user.routes.js";
import cors from "cors";

const app = express();

// Load environment variables
dotenv.config();

const corsOptions = {
  origin: 'https://note-hive-ten.vercel.app' ||  'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};


app.use(cors(corsOptions)); // Use CORS middleware

app.use(express.json()); // Middleware to parse JSON requests

// Routes
app.use('/api/notes', router);
app.use("/api/users", userRoutes);



export default app;
