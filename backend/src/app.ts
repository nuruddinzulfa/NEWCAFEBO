import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import authRoutes from "./modules/auth/auth.routes";
import categoryRoutes from "./modules/categories/category.routes";
import menuRoutes from "./modules/menus/menu.routes";
import tableRoutes from "./modules/tables/table.routes";
import reservationRoutes from "./modules/reservations/reservation.routes";
import orderRoutes from "./modules/orders/order.routes";
import orderItemRoutes from "./modules/order-items/order-item.routes";
import paymentRoutes from "./modules/payments/payment.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";
import reportRoutes from "./modules/reports/report.routes";

const app = express();

// ======================================
// Middlewares
// ======================================
app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================================
// Static Files
// ======================================
app.use("/uploads", express.static(path.join(__dirname, "../../frontend/assets/images")));
app.use("/assets", express.static(path.join(__dirname, "../../frontend/assets")));

// ======================================
// Health Check
// ======================================
app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "NewCafeBo API is running 🚀"
  });
});

// ======================================
// API Routes
// ======================================
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/menus", menuRoutes);
app.use("/api/v1/tables", tableRoutes);
app.use("/api/v1/reservations", reservationRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/order-items", orderItemRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/reports", reportRoutes);

// ======================================
// 404 Handler
// ======================================
app.use((_, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

export default app;