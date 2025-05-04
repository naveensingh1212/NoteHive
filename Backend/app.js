import express from 'express';
import dotenv from "dotenv";
import router from './routes/note.routes.js';
import userRoutes from "./routes/user.routes.js";
import cors from "cors";
const app = express();

dotenv.config({
    path: './env'
})

const corsOptions = {
    origin: 'http://localhost:5173/', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };


  app.use(cors(corsOptions));

app.use(express.json());   //middle ware to parse json data 

app.use('/api/notes', router);
app.use("/api/users", userRoutes);

export default app;



// const PORT = process.env.PORT || 8000

// // app.get('/' , (req,res) =>{
// //     res.send("hello nvn");
// // })

// // app.listen(PORT ,() => {
// //     console.log(`this is nvn at ${PORT}`)
// // })

