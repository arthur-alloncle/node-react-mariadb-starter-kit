import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export const generateAccessToken = (payload: any) =>
  jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "15m" });

export const generateRefreshToken = (payload: any) =>
  jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });