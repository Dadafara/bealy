import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User";

dotenv.config();

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    console.log("JWT_SECRET:", "uneCleSecreteTresLongueEtAleatoire");
    if (!token) {
      return res.status(401).json({ message: "AAccess denied, token missing" });
    }
    const verified = jwt.verify(token, "uneCleSecreteTresLongueEtAleatoire" as string) as {
      userId: number;
      role: "user" | "admin";
    };
    (req as any).user = verified;
    next(); 
  } catch (error) {
    return res.status(401).json({ message: "Invalid tokene" });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, isPublic, role = "user" } = req.body;

    const emailExist = await User.findOne({ where: { username } });
    if (emailExist) {
      return res.status(409).json({ message: "This username is already in use!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      isPublic,
      role,
    });

    res.status(201).json({ message: "User successfully created!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur serveur", error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Incorrect username or password." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect username or password." });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      "uneCleSecreteTresLongueEtAleatoire" as string,
      { expiresIn: 60*60*1000 }
    );

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000,
    });

    res.json({ token });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
  } finally {
    return;
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('auth_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });
    
    res.status(200).json({ message: "Déconnexion réussie" });
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    res.status(500).json({ message: "Une erreur est survenue lors de la déconnexion" });
  }
};

