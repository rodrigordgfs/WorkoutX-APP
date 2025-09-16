import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getApiUrl, apiConfig } from '@/lib/api-config'

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

const createExercise = async (data: CreateExerciseData): Promise<Exercise> => {
  console.log('Dados sendo enviados para a API:', data)
  console.log('URL da API:', getApiUrl(apiConfig.endpoints.exercises))
  
  const response = await fetch(getApiUrl(apiConfig.endpoints.exercises), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      muscleGroupId: data.muscleGroupId,
      name: data.name,
      description: data.description,
      image: data.image,
      videoUrl: data.videoUrl
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao criar exercício')
  }

  return response.json()
}

const updateExercise = async (data: UpdateExerciseData): Promise<Exercise> => {
  console.log('Dados sendo enviados para atualizar exercício:', data)
  console.log('URL da API:', `${getApiUrl(apiConfig.endpoints.exercises)}/${data.id}`)
  
  const response = await fetch(`${getApiUrl(apiConfig.endpoints.exercises)}/${data.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      muscleGroupId: data.muscleGroupId,
      name: data.name,
      description: data.description,
      image: data.image,
      videoUrl: data.videoUrl
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao atualizar exercício')
  }

  return response.json()
}

const deleteExercise = async (id: string): Promise<void> => {
  console.log('Deletando exercício:', id)
  console.log('URL da API:', `${getApiUrl(apiConfig.endpoints.exercises)}/${id}`)
  
  const response = await fetch(`${getApiUrl(apiConfig.endpoints.exercises)}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao excluir exercício')
  }
}

export const useCreateExercise = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createExercise,
    onSuccess: () => {
      // Invalidar queries relacionadas para atualizar os dados
      queryClient.invalidateQueries({ queryKey: ['muscle-groups'] })
      queryClient.invalidateQueries({ queryKey: ['exercises'] })
    },
  })
}

export const useUpdateExercise = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateExercise,
    onSuccess: () => {
      // Invalidar queries relacionadas para atualizar os dados
      queryClient.invalidateQueries({ queryKey: ['muscle-groups'] })
      queryClient.invalidateQueries({ queryKey: ['exercises'] })
    },
  })
}

export const useDeleteExercise = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteExercise,
    onSuccess: () => {
      // Invalidar queries relacionadas para atualizar os dados
      queryClient.invalidateQueries({ queryKey: ['muscle-groups'] })
      queryClient.invalidateQueries({ queryKey: ['exercises'] })
    },
  })
}
