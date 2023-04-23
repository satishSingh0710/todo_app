import express from "express"
import mongoose, { mongo } from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser"
import morgan from "morgan"
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from "./routes/user.js"
import taskRoutes from "./routes/task.js"
const app = express();
dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT ||  6001

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(()=>{
    console.log("MONGO connected");
    app.listen(PORT, ()=>{
        console.log(`Server is running on ${PORT}`);
    })
}).catch((error) => {
    console.log(error);
})
