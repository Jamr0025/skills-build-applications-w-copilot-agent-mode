import { Router } from 'express';
import { Workout } from '../models/Workout.js';

const router = Router();

router.get('/', async (request, response, next) => {
  try {
    const workoutType = typeof request.query.type === 'string' ? request.query.type : undefined;
    const workouts = await Workout.find().sort({ difficulty: 1, title: 1 });
    response.json(workoutType ? workouts.filter((workout) => workout.type === workoutType) : workouts);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (request, response, next) => {
  try {
    response.status(201).json(await Workout.create(request.body));
  } catch (error) {
    next(error);
  }
});

export default router;