import { Request, Response } from 'express';
import { createSolution, getSolutionsByCommunity, getSolutionById, voteSolution } from '../services/solutionService';
import { ISolution } from '../models/solution';
// import { File } from 'multer'; // Import File type from multer

declare module 'express' {
  interface Request {
    file?: Express.Multer.File; // Changed to Express.Multer.File
  }
}

declare module 'multer' { // Declare multer module
  interface File {
    path: string;
  }
}

export const createSolutionHandler = async (req: Request, res: Response) => {
  try {
    const { title, description, community, userName, email, universityName, category, youtubeLink, prototypeLink } = req.body;
    const creator = req.user?.userId; // Assuming userId is available from auth middleware

    if (!creator) {
      return res.status(401).json({ success: false, message: 'Unauthorized: User not logged in.' });
    }

    const reportFileUrl = req.file ? req.file.path : undefined; // Get Cloudinary URL if file was uploaded

    const solution = await createSolution({
      title,
      description,
      community,
      creator,
      userName,
      email,
      universityName,
      category,
      youtubeLink,
      prototypeLink,
      reportFileUrl, // Assign the Cloudinary URL
    } as unknown as Omit<ISolution, 'createdAt' | 'updatedAt' | 'votes'>);
    res.status(201).json({ success: true, data: solution });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSolutionsByCommunityHandler = async (req: Request, res: Response) => {
  try {
    const { communityId } = req.params;
    const solutions = await getSolutionsByCommunity(communityId);
    res.status(200).json({ success: true, data: solutions });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSolutionByIdHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const solution = await getSolutionById(id);
    if (!solution) {
      return res.status(404).json({ success: false, message: 'Solution not found.' });
    }
    res.status(200).json({ success: true, data: solution });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const voteSolutionHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { voteType } = req.body; // 'upvote' or 'downvote'
    const userId = req.user?.userId; // Assuming userId is available from auth middleware

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized: User not logged in.' });
    }

    const updatedSolution = await voteSolution(id, userId, voteType);
    res.status(200).json({ success: true, data: updatedSolution });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
