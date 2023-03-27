import express from 'express';
import { getUser, getUserCrew, addRemoveCrew } from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get('/:id', verifyToken, getUser);
router.get('/:id/crew', verifyToken, getUserCrew);

/* UPDATE */
router.patch('/:id/:crewId', verifyToken, addRemoveCrew);

export default router;
