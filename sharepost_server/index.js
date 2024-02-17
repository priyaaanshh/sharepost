import Express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import userRoutes from "./routes/user.js";

import { errorHandler } from "./utils/errorHandler.js";
import { ConnectDB } from "./utils/mongoDB.js";

dotenv.config();
const app = Express();

ConnectDB();

// middleware
app.use(cors());
app.use(cookieParser());
app.use(Express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/user', userRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log('Connected to Backend')
})