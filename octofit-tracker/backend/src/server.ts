import express from 'express';
import { apiBaseUrl } from './config/api.js';
import './config/database.js';
import activityRoutes from './routes/activities.js';
import leaderboardRoutes from './routes/leaderboard.js';
import teamRoutes from './routes/teams.js';
import userRoutes from './routes/users.js';
import workoutRoutes from './routes/workouts.js';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl: apiBaseUrl });
});

app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/workouts', workoutRoutes);

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(500).json({ message: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port} at ${apiBaseUrl}`);
});