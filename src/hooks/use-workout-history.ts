import { useQuery } from '@tanstack/react-query'
import { apiConfig, authenticatedRequest } from '@/lib/api-config'
import { useClerkToken } from './use-clerk-token'

export interface WorkoutHistoryExercise {
  id: string
  name: string
  image?: string
  videoUrl?: string
  description: string
  muscleGroup: {
    id: string
    name: string
    image?: string
    description: string
  }
  series: string
  repetitions: string
  weight: string
  restTime: string
  status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED' | 'UNCOMPLETED'
  createdAt: string
  updatedAt: string
}

export interface WorkoutHistoryItem {
  id: string
  workoutId: string
  workoutName: string
  workoutVisibility: 'PUBLIC' | 'PRIVATE'
  status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED' | 'UNCOMPLETED'
  startedAt: string
  endedAt: string
  duration: number
  completionPercentage: number
  observation?: string
  createdAt: string
  updatedAt: string
  exercises: WorkoutHistoryExercise[]
}

interface WorkoutHistoryFilters {
  workoutName?: string
  status?: string
  startDate?: string
  endDate?: string
}

const fetchWorkoutHistory = async (
  filters: WorkoutHistoryFilters = {},
  token?: string | null
): Promise<WorkoutHistoryItem[]> => {
  const params = new URLSearchParams()
  
  if (filters.workoutName) {
    params.append('workoutName', filters.workoutName)
  }
  if (filters.status) {
    params.append('status', filters.status)
  }
  if (filters.startDate) {
    params.append('startDate', filters.startDate)
  }
  if (filters.endDate) {
    params.append('endDate', filters.endDate)
  }

  const url = `${apiConfig.endpoints.workoutHistory}${params.toString() ? `?${params.toString()}` : ''}`

  return authenticatedRequest<WorkoutHistoryItem[]>(url, {
    method: 'GET',
    token
  })
}

export const useWorkoutHistory = (filters: WorkoutHistoryFilters = {}) => {
  const { getAuthToken } = useClerkToken()

  return useQuery({
    queryKey: ['workout-history', filters],
    queryFn: async () => {
      const token = await getAuthToken()
      return fetchWorkoutHistory(filters, token)
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}
