// Mock API service for simulating data fetching

import {
  mockUser,
  mockWorkouts,
  mockWorkoutHistory,
  mockMuscleGroups,
  mockExercises,
  mockDashboardStats,
  mockRecentActivities,
  mockCommunityPosts,
  mockNotifications
} from '@/data/mock-data'

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const mockApi = {
  // User data
  async getUser() {
    await delay(300)
    return mockUser
  },

  // Workouts
  async getWorkouts() {
    await delay(500)
    return mockWorkouts
  },

  async getWorkoutById(id: string) {
    await delay(200)
    return mockWorkouts.find(workout => workout.id === id)
  },

  async createWorkout(workout: any) {
    await delay(800)
    const newWorkout = {
      ...workout,
      id: (mockWorkouts.length + 1).toString(),
      createdAt: new Date().toISOString(),
      lastPerformed: new Date().toISOString()
    }
    mockWorkouts.push(newWorkout)
    return newWorkout
  },

  async updateWorkout(id: string, updates: any) {
    await delay(600)
    const index = mockWorkouts.findIndex(workout => workout.id === id)
    if (index !== -1) {
      mockWorkouts[index] = { ...mockWorkouts[index], ...updates }
      return mockWorkouts[index]
    }
    throw new Error('Workout not found')
  },

  async deleteWorkout(id: string) {
    await delay(400)
    const index = mockWorkouts.findIndex(workout => workout.id === id)
    if (index !== -1) {
      return mockWorkouts.splice(index, 1)[0]
    }
    throw new Error('Workout not found')
  },

  // Workout History
  async getWorkoutHistory() {
    await delay(400)
    return mockWorkoutHistory
  },

  async addWorkoutToHistory(workoutData: any) {
    await delay(500)
    const newEntry = {
      ...workoutData,
      id: (mockWorkoutHistory.length + 1).toString(),
      createdAt: new Date().toISOString()
    }
    mockWorkoutHistory.unshift(newEntry)
    return newEntry
  },

  // Muscle Groups
  async getMuscleGroups() {
    await delay(300)
    return mockMuscleGroups
  },

  async createMuscleGroup(muscleGroup: any) {
    await delay(600)
    const newMuscleGroup = {
      ...muscleGroup,
      id: (mockMuscleGroups.length + 1).toString()
    }
    mockMuscleGroups.push(newMuscleGroup)
    return newMuscleGroup
  },

  // Exercises
  async getExercises() {
    await delay(400)
    return mockExercises
  },

  async getExercisesByMuscleGroup(muscleGroup: string) {
    await delay(300)
    return mockExercises.filter(exercise => 
      exercise.muscleGroup.toLowerCase() === muscleGroup.toLowerCase()
    )
  },

  async createExercise(exercise: any) {
    await delay(700)
    const newExercise = {
      ...exercise,
      id: (mockExercises.length + 1).toString()
    }
    mockExercises.push(newExercise)
    return newExercise
  },

  // Dashboard
  async getDashboardStats() {
    await delay(400)
    return mockDashboardStats
  },

  async getRecentActivities() {
    await delay(200)
    return mockRecentActivities
  },

  // Community
  async getCommunityPosts() {
    await delay(500)
    return mockCommunityPosts
  },

  async createCommunityPost(post: any) {
    await delay(800)
    const newPost = {
      ...post,
      id: (mockCommunityPosts.length + 1).toString(),
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString()
    }
    mockCommunityPosts.unshift(newPost)
    return newPost
  },

  // Notifications
  async getNotifications() {
    await delay(300)
    return mockNotifications
  },

  async markNotificationAsRead(id: string) {
    await delay(200)
    const notification = mockNotifications.find(n => n.id === id)
    if (notification) {
      notification.read = true
      return notification
    }
    throw new Error('Notification not found')
  },

  // Search
  async searchWorkouts(query: string) {
    await delay(400)
    return mockWorkouts.filter(workout =>
      workout.title.toLowerCase().includes(query.toLowerCase()) ||
      workout.muscleGroups.some(group => 
        group.toLowerCase().includes(query.toLowerCase())
      )
    )
  },

  async searchExercises(query: string) {
    await delay(300)
    return mockExercises.filter(exercise =>
      exercise.name.toLowerCase().includes(query.toLowerCase()) ||
      exercise.muscleGroup.toLowerCase().includes(query.toLowerCase())
    )
  }
}

// Export individual functions for easier use
export const {
  getUser,
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  getWorkoutHistory,
  addWorkoutToHistory,
  getMuscleGroups,
  createMuscleGroup,
  getExercises,
  getExercisesByMuscleGroup,
  createExercise,
  getDashboardStats,
  getRecentActivities,
  getCommunityPosts,
  createCommunityPost,
  getNotifications,
  markNotificationAsRead,
  searchWorkouts,
  searchExercises
} = mockApi
