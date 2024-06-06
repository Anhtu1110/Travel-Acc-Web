import express from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import { userRoutes } from './routes/users';
import { authRoutes } from "./routes/auth"

// Connect to MongoDB

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
})
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.listen(8000, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:8000`);
});

