import { Router } from 'express';
import { Leaderboard } from '../models/Leaderboard.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    response.json(await Leaderboard.find().populate('user', 'username displayName').populate('team', 'name').sort({ rank: 1 }));
  } catch (error) {
    next(error);
  }
});

export default router;