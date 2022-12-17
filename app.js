import express from "express";
import conectDB from "./config/db.js";
import dotenv from "dotenv";
import userrouter from "./routes/userRoutes.js";
import eventrouter from "./routes/eventRoutes.js";
import eventdrouter from "./routes/eventDeletR.js";


const app = express();
dotenv.config();
conectDB();
app.use(express.json())

app.use('/api/v1/users', userrouter)

app.use('/api/v1/events', eventrouter)

app.use('/api/v1/event', eventdrouter)

export default app;