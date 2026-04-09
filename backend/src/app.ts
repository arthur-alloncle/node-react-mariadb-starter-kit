import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));

app.use("/auth", authRoutes);

export default app;