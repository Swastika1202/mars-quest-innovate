import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import cloudinary from '../config/cloudinary'; // Import cloudinary

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, fullName, schoolUniversity, classStreamCourse, location, gender, contactNumber, avatarUrl } = req.body; // Added avatarUrl

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'User already exists with this username' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let uploadedAvatarUrl = "https://github.com/shadcn.png"; // Default avatar
    if (avatarUrl) {
      // Upload avatar to Cloudinary if provided
      const uploadResult = await cloudinary.uploader.upload(avatarUrl, {
        folder: 'mars-quest/avatars',
        transformation: [{ width: 150, height: 150, crop: 'fill' }],
      });
      uploadedAvatarUrl = uploadResult.secure_url;
    }

    // Create new user
    user = new User({
      username,
      email,
      password: hashedPassword,
      fullName,
      schoolUniversity,
      classStreamCourse,
      location,
      gender,
      contactNumber,
      avatarUrl: uploadedAvatarUrl, // Save Cloudinary URL
    });

    await user.save();

    // Generate token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token, userId: user._id, role: user.role });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.status(200).json({ message: 'Logged in successfully', token, userId: user._id, role: user.role });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
