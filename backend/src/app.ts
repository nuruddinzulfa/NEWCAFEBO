import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./modules/auth/auth.routes";
import categoryRoutes from "./modules/categories/category.routes";
import menuRoutes from "./modules/menus/menu.routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/menus", menuRoutes);

// Health Check
app.get("/api/v1/health", (_, res) => {
  res.json({
    success: true,
    message: "API running successfully"
  });
});

export default app;