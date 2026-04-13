import { NextFunction, Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import jwt from "jsonwebtoken";
import {Sequelize} from 'sequelize'
import {User} from '../../models/User'
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

// const sequelize = new Sequelize(process.env.DATABASE_URL ? process.env.DATABASE_URL : '' )

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, role, first_name, last_name, date_of_birth } = req.body;

    // Validation simple
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: "Email déjà utilisé" });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création utilisateur
    const newUser = await User.create({
      id: uuidv4(),
      email,
      password: hashedPassword,
      role,
      first_name,
      last_name,
      date_of_birth,
    });

    return res.status(201).json({
      id: newUser.id,
      email: newUser.email,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Validation basique
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    // 2. Chercher l'utilisateur en base
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    // 3. Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    // 4. Payload pour JWT
    const payload = {
      id: user.id,
      email: user.email,
    };

    // 5. Générer les tokens
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // 6. Envoyer en cookies sécurisés
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false, // true en production (HTTPS)
      sameSite: "lax",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    // 7. Réponse
    return res.json({ message: "Logged in" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
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
