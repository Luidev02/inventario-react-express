import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoute.js";
import dashboardRoutes from "./routes/dashboardRoute.js";
import { authenticate } from "./middlewares/authMiddleware.js";

dotenv.config();
const app = express();

// Obtener ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(compression());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", authenticate, dashboardRoutes);

// Rutas

app.use("/api/images", express.static(path.join(__dirname, "uploads")));

export default app;
