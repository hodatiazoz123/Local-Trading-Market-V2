import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";
import dotenv from "dotenv";
import User from "../data/User.js";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import jwt from "jsonwebtoken";

export const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const user = await User.findOne({ refreshToken });
    if (!user) return res.sendStatus(403);
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || user.username !== decoded.username)
                return res.sendStatus(403);

            const accessToken = jwt.sign(
                { username: decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "30s" },
            );
            res.json({ accessToken });
        },
    );
};
