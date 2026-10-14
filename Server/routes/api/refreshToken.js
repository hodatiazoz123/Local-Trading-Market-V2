import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { handleRefreshToken } from "../../controllers/refreshTokenCon.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.post("/", handleRefreshToken);

export default router;
