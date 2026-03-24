import express from "express";
import pool from "./config/db";
import router from "./routes/router";
import { rateLimitMiddleware } from "./middleware/ratelimiter";

const app = express();

app.use(express.json());
app.use(rateLimitMiddleware); // Apply rate limiting middleware globally
app.use(router);


const PORT = 3000;

async function startServer() {
  try {
    await pool.connect();
    console.log("Connected to PostgreSQL");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

startServer();