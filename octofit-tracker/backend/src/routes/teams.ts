import { Router } from 'express';
import { Team } from '../models/Team.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    response.json(await Team.find().populate('members', '-passwordHash').sort({ name: 1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (request, response, next) => {
  try {
    const team = await Team.create(request.body);
    response.status(201).json(await team.populate('members', '-passwordHash'));
  } catch (error) {
    next(error);
  }
});

router.post('/:id/members/:userId', async (request, response, next) => {
  try {
    const team = await Team.findByIdAndUpdate(
      request.params.id,
      { $addToSet: { members: request.params.userId } },
      { new: true, runValidators: true },
    ).populate('members', '-passwordHash');
    if (!team) {
      response.status(404).json({ message: 'Team not found' });
      return;
    }
    response.json(team);
  } catch (error) {
    next(error);
  }
});

export default router;