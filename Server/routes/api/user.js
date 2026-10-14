import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
    handleLoginUser,
    handleNewUser,
    handleLogout,
} from "../../controllers/userCon.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
router.put("/login", handleLoginUser);
router.post("/register", handleNewUser);
router.post("/logout", handleLogout);

export default router;
