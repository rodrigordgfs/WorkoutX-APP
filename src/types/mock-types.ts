// Type definitions for mock data

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  plan: 'free' | 'premium' | 'pro'
  joinDate: string
  stats: {
    totalWorkouts: number
    currentStreak: number
    averageDuration: number
    completionRate: number
  }
}

export interface Exercise {
  id: string
  name: string
  sets: number
  reps: string
  weight: string
  rest: string
  muscleGroup: string
}

export interface Workout {
  id: string
  title: string
  exerciseCount: number
  duration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  muscleGroups: string[]
  createdAt: string
  lastPerformed: string
  exercises: Exercise[]
}

export interface WorkoutHistory {
  id: string
  workoutId: string
  title: string
  date: string
  duration: number
  status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED' | 'UNCOMPLETED'
  exercises: number
  notes?: string
}

export interface MuscleGroup {
  id: string
  name: string
  description: string
  exercises: number
  color: string
}

export interface ExerciseDetail {
  id: string
  name: string
  muscleGroup: string
  equipment: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  description: string
  instructions: string[]
  tips: string[]
}

export interface DashboardStats {
  monthlyWorkouts: number
  currentStreak: number
  averageDuration: number
  completionRate: number
  totalExercises: number
  favoriteMuscleGroup: string
  weeklyVolume: Array<{
    week: string
    volume: number
  }>
  topExercises: Array<{
    name: string
    count: number
  }>
}

export interface RecentActivity {
  id: string
  title: string
  exercises: number
  duration: number
  status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED' | 'UNCOMPLETED'
  date: string
}

export interface CommunityPost {
  id: string
  author: string
  avatar: string
  title: string
  content: string
  likes: number
  comments: number
  createdAt: string
}

export interface Notification {
  id: string
  type: 'workout_reminder' | 'achievement' | 'social' | 'system'
  title: string
  message: string
  read: boolean
  createdAt: string
}
