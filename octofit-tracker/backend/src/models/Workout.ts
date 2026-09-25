import mongoose, { Schema } from 'mongoose';

interface WorkoutDocument {
  title: string;
  type: 'running' | 'walking' | 'strength';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  description: string;
}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, enum: ['running', 'walking', 'strength'], required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const Workout = mongoose.model<WorkoutDocument>('Workout', workoutSchema);