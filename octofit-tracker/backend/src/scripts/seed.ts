import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'alex.runner', email: 'alex@example.com', displayName: 'Alex Runner', passwordHash: 'seeded-password' },
      { username: 'sam.walker', email: 'sam@example.com', displayName: 'Sam Walker', passwordHash: 'seeded-password' },
      { username: 'jordan.lifts', email: 'jordan@example.com', displayName: 'Jordan Lifts', passwordHash: 'seeded-password' },
    ]);

    const teams = await Team.create([
      { name: 'Swift Striders', members: [users[0]._id, users[1]._id] },
      { name: 'Power Crew', members: [users[2]._id] },
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'running', durationMinutes: 32, distanceKm: 5.1, points: 120, completedAt: new Date('2026-09-22T16:30:00Z') },
      { user: users[1]._id, type: 'walking', durationMinutes: 45, distanceKm: 3.8, points: 85, completedAt: new Date('2026-09-23T15:15:00Z') },
      { user: users[2]._id, type: 'strength', durationMinutes: 40, points: 105, completedAt: new Date('2026-09-24T17:00:00Z') },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, team: teams[0]._id, points: 120, rank: 1 },
      { user: users[2]._id, team: teams[1]._id, points: 105, rank: 2 },
      { user: users[1]._id, team: teams[0]._id, points: 85, rank: 3 },
    ]);

    await Workout.create([
      { title: 'Interval Starter', type: 'running', difficulty: 'beginner', durationMinutes: 25, description: 'Alternate easy jogging with short, comfortable intervals.' },
      { title: 'Neighborhood Walk', type: 'walking', difficulty: 'beginner', durationMinutes: 30, description: 'Build a steady walking habit with an easy-paced route.' },
      { title: 'Full Body Circuit', type: 'strength', difficulty: 'intermediate', durationMinutes: 35, description: 'Complete a balanced circuit of bodyweight strength exercises.' },
    ]);

    console.log('Database seeding complete: 3 users, 2 teams, 3 activities, 3 leaderboard entries, and 3 workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
