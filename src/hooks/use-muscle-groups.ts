import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getApiUrl, apiConfig, authenticatedRequest } from '@/lib/api-config'
import { useClerkToken } from './use-clerk-token'

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
const fetchMuscleGroups = async (searchTerm?: string, token?: string | null): Promise<MuscleGroup[]> => {
  const url = new URL(getApiUrl(apiConfig.endpoints.muscleGroups))
  
  if (searchTerm?.trim()) {
    url.searchParams.set('name', searchTerm.trim())
  }
  
  return authenticatedRequest<MuscleGroup[]>(url.pathname + url.search, {
    method: 'GET',
    token
  })
}

// Hook para buscar grupos musculares
export const useMuscleGroups = (searchTerm?: string) => {
  const { getAuthToken } = useClerkToken()
  
  return useQuery({
    queryKey: ['muscle-groups', searchTerm],
    queryFn: async () => {
      const token = await getAuthToken()
      return fetchMuscleGroups(searchTerm, token)
    },
  })
}

// Hook para criar grupo muscular
export const useCreateMuscleGroup = () => {
  const queryClient = useQueryClient()
  const { getAuthToken } = useClerkToken()

  return useMutation({
    mutationFn: async (data: CreateMuscleGroupData): Promise<MuscleGroup> => {
      const token = await getAuthToken()
      return authenticatedRequest<MuscleGroup>(apiConfig.endpoints.muscleGroups, {
        method: 'POST',
        body: data,
        token
      })
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
  const { getAuthToken } = useClerkToken()

  return useMutation({
    mutationFn: async (data: { id: string; name: string; description: string; image: string }): Promise<MuscleGroup> => {
      const token = await getAuthToken()
      return authenticatedRequest<MuscleGroup>(`${apiConfig.endpoints.muscleGroups}/${data.id}`, {
        method: 'PATCH',
        body: {
          name: data.name,
          description: data.description,
          image: data.image,
        },
        token
      })
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
  const { getAuthToken } = useClerkToken()

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const token = await getAuthToken()
      return authenticatedRequest<void>(`${apiConfig.endpoints.muscleGroups}/${id}`, {
        method: 'DELETE',
        token
      })
    },
    onSuccess: () => {
      // Invalidar e refetch da lista de grupos musculares
      queryClient.invalidateQueries({ queryKey: ['muscle-groups'] })
    },
  })
}
