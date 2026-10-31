import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { createApiRouter } from "./routes/apiRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

// Middlewares
app.use(
  cors({
    origin: [frontendUrl, "http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

// Routes API Hexagonales
app.use("/api", createApiRouter());

// Route Healthcheck
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    application: "Portfolio Bautzen Backend API",
    architecture: "Hexagonal & Clean Architecture",
    stack: ["TypeScript", "PostgreSQL", "Drizzle ORM", "Express/Node"],
    timestamp: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Serveur Backend Portfolio opérationnel sur le port ${port}`);
  console.log(`📡 URL API : http://localhost:${port}/api`);
  console.log(`🔍 Healthcheck : http://localhost:${port}/health`);
  console.log(`🏛 Architecture : Hexagonale & Clean Architecture`);
  console.log(`======================================================\n`);
});

