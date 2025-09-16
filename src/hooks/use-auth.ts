import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getApiUrl, apiConfig } from '@/lib/api-config'

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

const authenticateUser = async (data: AuthData): Promise<AuthResponse> => {
  console.log('Dados sendo enviados para autenticação:', data)
  console.log('URL da API:', getApiUrl(apiConfig.endpoints.auth))
  
  const response = await fetch(getApiUrl(apiConfig.endpoints.auth), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: data.id,
      name: data.name,
      avatar: data.avatar,
      permission: data.permission
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro na autenticação')
  }

  return response.json()
}

export const useAuthenticate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authenticateUser,
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
