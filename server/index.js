import express from "express"; 
const app = express();
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import poolRoutes from "./routes/pools.js";
import roomRoutes from "./routes/rooms.js";
import messageRoutes from "./routes/messages.js";
import cookieParser from "cookie-parser";
import cors from 'cors'

//mifflewares
app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", true)

    next()
})
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(cookieParser());

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/pools", poolRoutes)
app.use("/api/rooms", roomRoutes)
app.use("/api/messages", messageRoutes)

app.listen(8800, () => {
    console.log('api working'); 
})