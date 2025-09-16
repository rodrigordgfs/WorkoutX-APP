'use client'

import { useState, useEffect } from 'react'
import { mockApi } from '@/services/mock-api'
import type { 
  User, 
  Workout, 
  WorkoutHistory, 
  MuscleGroup, 
  ExerciseDetail,
  DashboardStats,
  RecentActivity,
  CommunityPost,
  Notification
} from '@/types/mock-types'

// Generic hook for data fetching
function useApiCall<T>(apiCall: () => Promise<T>, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await apiCall()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, dependencies)

  return { data, loading, error }
}

// User hooks
export function useUser() {
  return useApiCall<User>(() => mockApi.getUser())
}

// Workout hooks
export function useWorkouts() {
  return useApiCall<Workout[]>(() => mockApi.getWorkouts())
}

export function useWorkout(id: string) {
  return useApiCall<Workout | undefined>(
    () => mockApi.getWorkoutById(id),
    [id]
  )
}

// Workout History hooks
export function useWorkoutHistory() {
  return useApiCall<WorkoutHistory[]>(() => mockApi.getWorkoutHistory())
}

// Muscle Groups hooks
export function useMuscleGroups() {
  return useApiCall<MuscleGroup[]>(() => mockApi.getMuscleGroups())
}

// Exercises hooks
export function useExercises() {
  return useApiCall<ExerciseDetail[]>(() => mockApi.getExercises())
}

export function useExercisesByMuscleGroup(muscleGroup: string) {
  return useApiCall<ExerciseDetail[]>(
    () => mockApi.getExercisesByMuscleGroup(muscleGroup),
    [muscleGroup]
  )
}

// Dashboard hooks
export function useDashboardStats() {
  return useApiCall<DashboardStats>(() => mockApi.getDashboardStats())
}

export function useRecentActivities() {
  return useApiCall<RecentActivity[]>(() => mockApi.getRecentActivities())
}

// Community hooks
export function useCommunityPosts() {
  return useApiCall<CommunityPost[]>(() => mockApi.getCommunityPosts())
}

// Notifications hooks
export function useNotifications() {
  return useApiCall<Notification[]>(() => mockApi.getNotifications())
}

// Search hooks
export function useSearchWorkouts(query: string) {
  return useApiCall<Workout[]>(
    () => mockApi.searchWorkouts(query),
    [query]
  )
}

export function useSearchExercises(query: string) {
  return useApiCall<ExerciseDetail[]>(
    () => mockApi.searchExercises(query),
    [query]
  )
}

// Mutation hooks
export function useCreateWorkout() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createWorkout = async (workoutData: any) => {
    try {
      setLoading(true)
      setError(null)
      const result = await mockApi.createWorkout(workoutData)
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create workout')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { createWorkout, loading, error }
}

export function useUpdateWorkout() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateWorkout = async (id: string, updates: any) => {
    try {
      setLoading(true)
      setError(null)
      const result = await mockApi.updateWorkout(id, updates)
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update workout')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { updateWorkout, loading, error }
}

export function useDeleteWorkout() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteWorkout = async (id: string) => {
    try {
      setLoading(true)
      setError(null)
      const result = await mockApi.deleteWorkout(id)
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete workout')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { deleteWorkout, loading, error }
}
