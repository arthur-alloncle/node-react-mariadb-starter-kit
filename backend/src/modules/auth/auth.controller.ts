import { Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const user = { id: 1, role: "admin" }; // mock 

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false
  });

  res.json({ message: "Logged in" });
};

export const refresh = (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.sendStatus(401);

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);

    const accessToken = generateAccessToken({
      id: decoded.id,
      role: decoded.role
    });

    res.cookie("accessToken", accessToken, { httpOnly: true });

    res.json({ message: "Refreshed" });
  } catch {
    res.sendStatus(403);
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.sendStatus(200);
};