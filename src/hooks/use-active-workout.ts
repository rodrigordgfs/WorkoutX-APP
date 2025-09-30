'use client'

import { useQuery } from '@tanstack/react-query'
import { useUser } from '@clerk/nextjs'
import { useClerkToken } from './use-clerk-token'
import { apiConfig, getApiUrl, authenticatedRequest } from '@/lib/api-config'
import type { ApiWorkout } from './use-workouts'

const fetchActiveWorkout = async (token: string | null): Promise<ApiWorkout | null> => {
  const url = new URL(getApiUrl(apiConfig.endpoints.workouts))
  url.searchParams.append('status', 'IN_PROGRESS')
  
  console.log('Buscando treino em andamento...')
  
  try {
    const workouts = await authenticatedRequest<ApiWorkout[]>(url.pathname + url.search, {
      method: 'GET',
      token
    })
    
    // Retorna o primeiro treino em andamento encontrado
    return workouts.length > 0 ? workouts[0] : null
  } catch (error) {
    console.log('Nenhum treino em andamento encontrado:', error)
    return null
  }
}

export const useActiveWorkout = () => {
  const { user } = useUser()
  const { getAuthToken } = useClerkToken()

  return useQuery({
    queryKey: ['active-workout', user?.id],
    queryFn: async () => {
      if (!user) {
        return null
      }
      const token = await getAuthToken()
      return fetchActiveWorkout(token)
    },
    enabled: !!user, // Só executa se o usuário estiver autenticado
    staleTime: 30 * 1000, // 30 segundos
    refetchInterval: 60 * 1000, // Refetch a cada minuto
    retry: 1,
  })
}
