import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import decisionRoutes from "./modules/decision/decision.routes";
import categoryRoutes from './modules/category/category.routes';
import { sequelize } from "./config/db";

const app = express();
// app.use(cors());
app.use(express.json());
app.use(cookieParser());


const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Unable to connect to DB:", error);
  }
};

start();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/auth", authRoutes);
app.use('/decision', decisionRoutes)
app.use('/category', categoryRoutes)

export default app;