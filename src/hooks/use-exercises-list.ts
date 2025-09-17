import { useQuery } from '@tanstack/react-query'
import { apiConfig, authenticatedRequest } from '@/lib/api-config'
import { useClerkToken } from './use-clerk-token'

export interface ExerciseWithMuscleGroup {
  id: string
  name: string
  description: string
  image?: string
  videoUrl?: string
  muscleGroupId: string
  muscleGroup: {
    id: string
    name: string
  }
  createdAt: string
  updatedAt: string
}

const fetchExercises = async (searchTerm?: string, muscleGroupId?: string, token?: string | null): Promise<ExerciseWithMuscleGroup[]> => {
  const params = new URLSearchParams()
  if (searchTerm) params.append('name', searchTerm)
  if (muscleGroupId && muscleGroupId !== 'all') params.append('muscleGroupId', muscleGroupId)
  
  const url = `${apiConfig.endpoints.exercises}${params.toString() ? `?${params.toString()}` : ''}`
  
  return authenticatedRequest<ExerciseWithMuscleGroup[]>(url, {
    method: 'GET',
    token
  })
}

export const useExercises = (searchTerm?: string, muscleGroupId?: string) => {
  const { getAuthToken } = useClerkToken()
  
  return useQuery({
    queryKey: ['exercises', searchTerm, muscleGroupId],
    queryFn: async () => {
      const token = await getAuthToken()
      return fetchExercises(searchTerm, muscleGroupId, token)
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}
