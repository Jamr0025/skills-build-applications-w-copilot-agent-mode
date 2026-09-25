import { Router } from 'express';
import { User } from '../models/User.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    response.json(await User.find().select('-passwordHash').sort({ displayName: 1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (request, response, next) => {
  try {
    const user = await User.create(request.body);
    response.status(201).json(await User.findById(user._id).select('-passwordHash'));
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id).select('-passwordHash');
    if (!user) {
      response.status(404).json({ message: 'User not found' });
      return;
    }
    response.json(user);
  } catch (error) {
    next(error);
  }
});

export default router;