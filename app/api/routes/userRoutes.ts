import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { getUserInfo, updateUserInfo } from "../controllers/userController";

const router = express.Router();

router.use(authMiddleware);

router.get("/info", getUserInfo);
router.put("/updateinfo", updateUserInfo);

router.get("/protected-endpoint", authMiddleware, (req, res) => {
  const user = req.user;
  res.json({ message: "Données protégées", user });
});

export default router;
