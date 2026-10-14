import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const originalLog = console.log;
const originalError = console.error;

const logEvent = async function (msg) {
    try {
        await fs.appendFile(
            path.join(__dirname, "..", "logs", "log.txt"),
            `${new Date()}\tMessage:\t${msg}\n`,
        );
    } catch (err) {
        console.error(err);
    }
};
console.log = async function (...args) {
    originalLog(...args);
    await logEvent(args.join(" "));
};
//console.err the same way
console.error = async function (...args) {
    originalError(...args);
    await logEvent(args.join(" "));
};
const min = Math.min;
const max = Math.max;
globalThis.clamp = (num, minVal, maxVal) => min(max(num, minVal), maxVal);
