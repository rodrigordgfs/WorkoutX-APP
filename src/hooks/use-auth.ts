import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiConfig, authenticatedRequest } from '@/lib/api-config'
import { useClerkToken } from './use-clerk-token'

export interface AuthData {
  id: string
  name: string
  avatar: string
  permission?: string
}

export interface AuthResponse {
  id: string
  name: string
  avatar: string
  permission?: string
  message?: string
}

const authenticateUser = async (data: AuthData, token: string | null): Promise<AuthResponse> => {
  console.log('Dados sendo enviados para autenticação:', data)
  
  return authenticatedRequest<AuthResponse>(apiConfig.endpoints.auth, {
    method: 'POST',
    body: {
      id: data.id,
      name: data.name,
      avatar: data.avatar,
      permission: data.permission
    },
    token
  })
}

export const useAuthenticate = () => {
  const queryClient = useQueryClient()
  const { getAuthToken } = useClerkToken()

  return useMutation({
    mutationFn: async (data: AuthData) => {
      const token = await getAuthToken()
      return authenticateUser(data, token)
    },
    onSuccess: (data) => {
      console.log('Autenticação realizada com sucesso:', data)
      // Invalidar queries relacionadas ao usuário se necessário
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error) => {
      console.error('Erro na autenticação:', error)
    },
  })
}

// Manter compatibilidade com nomes antigos
export const useSignUp = useAuthenticate
export const useLogin = useAuthenticate
