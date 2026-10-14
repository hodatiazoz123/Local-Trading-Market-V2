//import express from "express"
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import dotenv from "dotenv";
import User from "../data/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// CRUD operations for users
// register, login, logout

//------------Registering--------------\\
export const handleNewUser = async (req, res) => {
    const { user, pwd, firstname, lastname } = req.body;
    if (!user || !pwd) {
        res.status(400).json({
            message: "Either one is not included",
        });
        return;
    }
    //firstname & lastname validation:
    const regex = /^[A-Za-z1-9]{2,25}$/;
    if (!regex.test(firstname) || !regex.test(lastname)) {
        res.status(400).json({
            message:
                "Firstname and lastname must be 2-25 characters long and contain only letters and numbers",
        });
        return;
    }

    const hashedpwd = await bcrypt.hash(pwd, 10);

    try {
        const newUser = await User.create({
            username: user,
            password: hashedpwd,
            firstname,
            lastname,
        });

        return res.status(201).json({
            message: "User created successfully",
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                message: "Username already exists",
            });
        }

        return res.status(500).json({
            message: "Internal server error",
        });
    }
    //--------------End-------------\\
};
//------------Logging-In--------------\\
export const handleLoginUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) {
        res.status(400).json({
            message: "Either one is not included",
        });
        return;
    }
    try {
        const foundUser = await User.findOne({ username: user });
        if (!foundUser) {
            return res.status(401).json({ message: "Not authorized" });
        }
        console.log(pwd, "hashed: ", foundUser.password);
        const match = await bcrypt.compare(pwd, foundUser.password);
        if (match) {
            //create JWT tocken:
            const accessToken = jwt.sign(
                {
                    username: foundUser.username,
                    roles: foundUser.roles,
                    id: foundUser._id,
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "3m" },
            );
            const refreshToken = jwt.sign(
                {
                    username: foundUser.username,
                    roles: foundUser.roles,
                    id: foundUser._id,
                },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: "1d" },
            );

            await User.updateOne(
                { username: foundUser.username },
                { refreshToken: refreshToken },
            );

            res.cookie("jwt", refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });

            res.json({
                success: `Nice, the user: ${user} is currently logged-in!`,
                accessToken: accessToken,
            });
        } else {
            res.status(401).json({
                Error: "Unauthorized",
            });
        }
    } catch (err) {
        console.error("Error during login:", err);

        res.status(500).json({
            message: "Internal server error",
        });
    }
};

//------------Logging-Out--------------\\
export const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken: refreshToken });
    if (!foundUser) {
        res.clearCookie("jwt", {
            httpOnly: true,
        });
        return res.sendStatus(403);
    }
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err || foundUser.username !== decoded.username)
                return res.sendStatus(403);
            const result = await User.updateOne(
                { refreshToken },
                { $unset: { refreshToken: 1 } },
            );
            if (result.modifiedCount === 0) {
                return res.status(500).json({
                    message: "Failed to log out user",
                });
            }
            res.clearCookie("jwt", {
                httpOnly: true,
            });
            res.status(204).json({
                message: "Logged out successfully",
            });
        },
    );
};

//--------------End-------------\\

//------------Getting-Users--------------\\
export const handleGetUsers = async (req, res) => {
    try {
        const { skip, limit } = req.query;
        let limitValue = parseInt(limit) || 15; // Default limit to 15 if not provided
        limitValue = clamp(limitValue, 1, 100); // Limit the maximum value to 100
        let skipValue = parseInt(skip) || 0;
        skipValue = clamp(skipValue, 0, 9999999); // Ensure skip is not negative nor a huge number
        const users = await User.find({}, "-password -refreshToken")

            .skip(skipValue)
            .limit(limitValue);
        res.json(users);
    } catch (err) {
        console.error("Error during getting user:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
//------------Getting-User--------------\\
export const handleGetUser = async (req, res) => {
    try {
        const { id } = req.params;
        const regex = /^[0-9a-fA-F]{24}$/; // Check if the id is a valid MongoDB ObjectId
        if (!regex.test(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        const user = await User.findById(id, "-password -refreshToken");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error("Error during getting user:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
