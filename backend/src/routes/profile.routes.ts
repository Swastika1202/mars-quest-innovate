import { Router } from 'express';
import { getUserProfile, updateUserProfile, uploadAvatar } from '../controllers/profileController';

const router = Router();

router.get('/:id', getUserProfile);
router.put('/:id', updateUserProfile);
router.post('/:id/avatar', uploadAvatar); // Route for avatar upload

export default router;
