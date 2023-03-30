import express from 'express';
import {
	getUser,
	getUserCrew,
	addRemoveCrewMember,
} from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get('/:id', verifyToken, getUser);
router.get('/:id/crew', verifyToken, getUserCrew);

/* UPDATE */
router.patch('/:id/:crewMemberId', verifyToken, addRemoveCrewMember);

export default router;
