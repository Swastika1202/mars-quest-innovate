import { Request, Response } from 'express';
import { User } from '../models/User';
import { cloudinary } from '../config/cloudinary';

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id; // Assuming user ID is passed in params
    const user = await User.findById(userId).select('-password'); // Exclude password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id; // Assuming user ID is passed in params
    const updates = req.body; // Profile data to update

    const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const uploadAvatar = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id; // Assuming user ID is passed in params
    const { avatarUrl } = req.body; // Expecting base64 string or image URL

    if (!avatarUrl) {
      return res.status(400).json({ message: 'Avatar URL is required' });
    }

    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(avatarUrl, {
      folder: 'mars-quest/avatars',
      transformation: [{ width: 150, height: 150, crop: 'fill' }],
    });

    const user = await User.findByIdAndUpdate(userId, { avatarUrl: uploadResult.secure_url }, { new: true }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error uploading avatar:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
