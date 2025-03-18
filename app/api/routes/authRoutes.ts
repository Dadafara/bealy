import express, { Request, Response } from "express";
import { login, logout, register } from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/verify", authMiddleware, (req: Request, res: Response) => {
  if (req.user) {
    res.json({ status: true, user: req.user });
  } else {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

export default router;