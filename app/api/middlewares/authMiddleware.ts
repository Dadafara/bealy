import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Accès refusé, token manquant !" });
  }

  try {
    const decoded = jwt.verify(token, "uneCleSecreteTresLongueEtAleatoire") as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Erreur de validation du token :", error); 
    return res.status(401).json({ message: "Token invalide !" });
  }
};

export default authMiddleware;