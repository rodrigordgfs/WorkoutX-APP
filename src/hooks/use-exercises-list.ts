import { useQuery } from '@tanstack/react-query'
import { apiConfig, getApiUrl } from '@/lib/api-config'

export interface ExerciseWithMuscleGroup {
  id: string
  name: string
  description: string
  image: string
  videoUrl?: string
  muscleGroupId: string
  muscleGroup: {
    id: string
    name: string
  }
  createdAt: string
  updatedAt: string
}

const fetchExercises = async (searchTerm?: string, muscleGroupId?: string): Promise<ExerciseWithMuscleGroup[]> => {
  const params = new URLSearchParams()
  if (searchTerm) params.append('name', searchTerm)
  if (muscleGroupId && muscleGroupId !== 'all') params.append('muscleGroupId', muscleGroupId)
  
  const url = `${getApiUrl(apiConfig.endpoints.exercises)}${params.toString() ? `?${params.toString()}` : ''}`
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao buscar exercícios')
  }

  return response.json()
}

export const useExercises = (searchTerm?: string, muscleGroupId?: string) => {
  return useQuery({
    queryKey: ['exercises', searchTerm, muscleGroupId],
    queryFn: () => fetchExercises(searchTerm, muscleGroupId),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}
