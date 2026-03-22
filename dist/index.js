"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const routes_1 = __importDefault(require("./routes/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes_1.default);
const PORT = 3000;
async function startServer() {
    try {
        await db_1.default.connect();
        console.log("Connected to PostgreSQL");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}
startServer();
