import { Request, Response } from "express";
import User from "../models/User";
import logger from "../utils/logger";



export const getUserInfo = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId){
            return res.status(400).json({message: 'User not authenticated.'});
        }

        const user = await User.findByPk(userId);

        if (!user){
            return res.status(404).json({message: 'User not found.'});
        }

        res.json(user);
    } catch (error) {
        logger.error('Error occurred while retrieving user information:', error);
        res.status(500).json({ message: 'An error occurred while fetching user information. Please try again later.' });
    }
}

export const updateUserInfo = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({message: 'User not authenticated.'});
        }

        const {username, email, phone, age, description, profilePicture, isPublic} = req.body;

        if (!username || !email ){
            return res.status(400).json({message: 'Username and email are required.'});
        }

        const user = await User.findByPk(userId);

        if (!user) {
          return res.status(404).json({ message: 'User not found.' });
        }
    
        await user.update({ username, email, phone, age, description, profilePicture, isPublic });

    
        res.json({ message: 'User information updated successfully.', status: 200 });
      } catch (error) {
        res.status(500).json({ message: 'Server error. Please try again later.' });
      }
}