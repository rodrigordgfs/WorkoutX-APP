import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getApiUrl, apiConfig } from '@/lib/api-config'

export interface Exercise {
  id: string
  name: string
  image: string
  description: string
}

export interface MuscleGroup {
  id: string
  name: string
  description: string
  image: string // base64
  exercises: Exercise[]
  createdAt?: string
  updatedAt?: string
}

export interface CreateMuscleGroupData {
  name: string
  description: string
  image: string // base64
}

// Função para buscar grupos musculares
const fetchMuscleGroups = async (searchTerm?: string): Promise<MuscleGroup[]> => {
  const url = new URL(getApiUrl(apiConfig.endpoints.muscleGroups))
  
  if (searchTerm?.trim()) {
    url.searchParams.set('name', searchTerm.trim())
  }
  
  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error('Erro ao buscar grupos musculares')
  }
  return response.json()
}

// Hook para buscar grupos musculares
export const useMuscleGroups = (searchTerm?: string) => {
  return useQuery({
    queryKey: ['muscle-groups', searchTerm],
    queryFn: () => fetchMuscleGroups(searchTerm),
  })
}

// Hook para criar grupo muscular
export const useCreateMuscleGroup = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateMuscleGroupData): Promise<MuscleGroup> => {
      const response = await fetch(getApiUrl(apiConfig.endpoints.muscleGroups), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Erro ao criar grupo muscular')
      }

      return response.json()
    },
    onSuccess: () => {
      // Invalidar e refetch da lista de grupos musculares
      queryClient.invalidateQueries({ queryKey: ['muscle-groups'] })
    },
  })
}

// Hook para atualizar grupo muscular
export const useUpdateMuscleGroup = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { id: string; name: string; description: string; image: string }): Promise<MuscleGroup> => {
      const response = await fetch(`${getApiUrl(apiConfig.endpoints.muscleGroups)}/${data.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          image: data.image,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Erro ao atualizar grupo muscular')
      }

      return response.json()
    },
    onSuccess: () => {
      // Invalidar e refetch da lista de grupos musculares
      queryClient.invalidateQueries({ queryKey: ['muscle-groups'] })
    },
  })
}

// Hook para deletar grupo muscular
export const useDeleteMuscleGroup = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const response = await fetch(`${getApiUrl(apiConfig.endpoints.muscleGroups)}/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || error.message || 'Erro ao excluir grupo muscular')
      }
    },
    onSuccess: () => {
      // Invalidar e refetch da lista de grupos musculares
      queryClient.invalidateQueries({ queryKey: ['muscle-groups'] })
    },
  })
}
