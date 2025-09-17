import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiConfig, authenticatedRequest } from '@/lib/api-config'
import { useClerkToken } from './use-clerk-token'

export interface CreateExerciseData {
  muscleGroupId: string
  name: string
  description: string
  image: string
  videoUrl?: string
}

export interface UpdateExerciseData {
  id: string
  muscleGroupId: string
  name: string
  description: string
  image: string
  videoUrl?: string
}

export interface Exercise {
  id: string
  name: string
  image: string
  description: string
  videoUrl?: string
  muscleGroupId: string
}

const createExercise = async (data: CreateExerciseData, token: string | null): Promise<Exercise> => {
  console.log('Dados sendo enviados para a API:', data)
  console.log('🔍 createExercise - Token recebido:', token ? `${token.substring(0, 20)}...` : 'null')
  
  return authenticatedRequest<Exercise>(apiConfig.endpoints.exercises, {
    method: 'POST',
    body: {
      muscleGroupId: data.muscleGroupId,
      name: data.name,
      description: data.description,
      image: data.image,
      videoUrl: data.videoUrl
    },
    token
  })
}

const updateExercise = async (data: UpdateExerciseData, token: string | null): Promise<Exercise> => {
  console.log('Dados sendo enviados para atualizar exercício:', data)
  console.log('🔍 updateExercise - Token recebido:', token ? `${token.substring(0, 20)}...` : 'null')
  
  return authenticatedRequest<Exercise>(`${apiConfig.endpoints.exercises}/${data.id}`, {
    method: 'PATCH',
    body: {
      muscleGroupId: data.muscleGroupId,
      name: data.name,
      description: data.description,
      image: data.image,
      videoUrl: data.videoUrl
    },
    token
  })
}

const deleteExercise = async (id: string, token: string | null): Promise<void> => {
  console.log('Deletando exercício:', id)
  console.log('🔍 deleteExercise - Token recebido:', token ? `${token.substring(0, 20)}...` : 'null')
  
  return authenticatedRequest<void>(`${apiConfig.endpoints.exercises}/${id}`, {
    method: 'DELETE',
    token
  })
}

export const useCreateExercise = () => {
  const queryClient = useQueryClient()
  const { getAuthToken } = useClerkToken()

  return useMutation({
    mutationFn: async (data: CreateExerciseData) => {
      const token = await getAuthToken()
      console.log('🔍 useCreateExercise - Token obtido:', token ? `${token.substring(0, 20)}...` : 'null')
      return createExercise(data, token)
    },
    onSuccess: () => {
      // Invalidar queries relacionadas para atualizar os dados
      queryClient.invalidateQueries({ queryKey: ['muscle-groups'] })
      queryClient.invalidateQueries({ queryKey: ['exercises'] })
    },
  })
}

export const useUpdateExercise = () => {
  const queryClient = useQueryClient()
  const { getAuthToken } = useClerkToken()

  return useMutation({
    mutationFn: async (data: UpdateExerciseData) => {
      const token = await getAuthToken()
      console.log('🔍 useUpdateExercise - Token obtido:', token ? `${token.substring(0, 20)}...` : 'null')
      return updateExercise(data, token)
    },
    onSuccess: () => {
      // Invalidar queries relacionadas para atualizar os dados
      queryClient.invalidateQueries({ queryKey: ['muscle-groups'] })
      queryClient.invalidateQueries({ queryKey: ['exercises'] })
    },
  })
}

export const useDeleteExercise = () => {
  const queryClient = useQueryClient()
  const { getAuthToken } = useClerkToken()

  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getAuthToken()
      return deleteExercise(id, token)
    },
    onSuccess: () => {
      // Invalidar queries relacionadas para atualizar os dados
      queryClient.invalidateQueries({ queryKey: ['muscle-groups'] })
      queryClient.invalidateQueries({ queryKey: ['exercises'] })
    },
  })
}
