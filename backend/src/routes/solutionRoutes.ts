import { Router } from 'express';
import { createSolutionHandler, getSolutionsByCommunityHandler, getSolutionByIdHandler, voteSolutionHandler } from '../controllers/solutionController';
import { authMiddleware } from '../middleware/authMiddleware'; // Assuming you have auth middleware
import upload from '../middleware/uploadMiddleware'; // Import upload middleware

const router = Router();

// Create a new solution
router.post('/communities/:communityId/solutions', authMiddleware, upload.single('reportFile') as any, createSolutionHandler);

// Get all solutions for a specific community
router.get('/communities/:communityId/solutions', getSolutionsByCommunityHandler);

// Get a single solution by ID
router.get('/solutions/:id', getSolutionByIdHandler);

// Vote on a solution
router.post('/solutions/:id/vote', authMiddleware, voteSolutionHandler);

export default router;
