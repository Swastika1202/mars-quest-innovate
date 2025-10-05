import { Router } from 'express';
import { createCommunity, joinCommunity, leaveCommunity, getCommunities, getUserCommunities } from '../controllers/communityController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Protect routes that require authentication
router.use(authMiddleware);

router.post('/', createCommunity);
router.post('/:communityId/join', joinCommunity);
router.post('/:communityId/leave', leaveCommunity);
router.get('/', getCommunities); // This route will be protected
router.get('/user/:userId', getUserCommunities);

export default router;
