import { Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import jwt from "jsonwebtoken";
import { prisma } from "@/config/prisma";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.sendStatus(401);

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) return res.sendStatus(401);

  const payload = {
    id: user.id,
    role: user.role
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  res.cookie("accessToken", accessToken, { httpOnly: true });
  res.cookie("refreshToken", refreshToken, { httpOnly: true });

  res.json({ user });
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