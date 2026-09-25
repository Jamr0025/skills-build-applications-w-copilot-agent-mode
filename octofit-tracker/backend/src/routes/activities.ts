import { Router } from 'express';
import { Activity } from '../models/Activity.js';

const router = Router();

router.get('/', async (request, response, next) => {
  try {
    const userId = typeof request.query.user === 'string' ? request.query.user : undefined;
    const filter = userId ? { user: userId } : {};
    response.json(await Activity.find(filter).populate('user', 'username displayName').sort({ completedAt: -1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (request, response, next) => {
  try {
    const activity = await Activity.create(request.body);
    response.status(201).json(await activity.populate('user', 'username displayName'));
  } catch (error) {
    next(error);
  }
});

export default router;