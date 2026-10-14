/*
Now I'm concidering making tests, and writing the updates I make on top
of the file.
*/

// just a normal express server

import "./config/setup.js";
import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import fsPromises from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";
//############Routes############
import usersRouter from "./routes/api/user.js";
import userProtectedRouter from "./routes/api/userProtected.js";
import refreshTokenRouter from "./routes/api/refreshToken.js";

//############Routes############
//############middleware############
import limitSize from "./middleware/limitSize.js";
//############middleware############
// import { EventEmitter } from "events";
// import {logEvent} from "./logs/log.js";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/connectDB.js";

import cors from "cors";
dotenv.config();

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "30kb" }));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false, limit: "30kb" }));
app.use(limitSize);

app.use("/api/users", usersRouter);
app.use("/api/users/protected", userProtectedRouter);
app.use("/api/users/refresh", refreshTokenRouter);
const port = process.env.PORT;

app.get("/", (req, res) => {
    console.log("Get request to /");
    res.send("Hello, World!");
});

mongoose.connection.once("open", () => {
    console.log("Connected To DB ✅");

    app.listen({ port, maxHeaderSize: 16 * 1024 }, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});
