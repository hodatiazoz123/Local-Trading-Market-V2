import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { handleGetUser } from "../../controllers/userCon.js";
import { handleGetUsers } from "../../controllers/userCon.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
router.get("/", handleGetUsers);
router.get("/:id", handleGetUser);

export default router;
