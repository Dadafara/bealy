import express, { Request, Response } from 'express';
import upload from '../middlewares/uploadProfilMiddleware';
import authMiddleware from '../middlewares/authMiddleware';
import logger from '../utils/logger';
import cloudinary from '../config/cloudinary';
import User from '../models/User';

const router = express.Router();

router.put('/profile-picture', authMiddleware, upload.single('profilePicture'), async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Utilisateur non authentifié.' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.buffer.toString('base64'), {
        folder: 'profile_pictures',
      });

      user.profilePicture = result.secure_url;
      await user.save();
      logger.info(`Photo de profil de l'utilisateur ${user.username} mise à jour`);
      res.json({ message: 'Photo de profil mise à jour.', profilePictureUrl: result.secure_url });
    } else {
      return res.status(400).json({ message: 'Aucun fichier téléchargé.' });
    }
  } catch (error) {
    logger.error('Erreur lors du téléchargement de la photo de profil', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

export default router;