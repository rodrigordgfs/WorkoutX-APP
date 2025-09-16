'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useUser } from '@clerk/nextjs'
import { useAuthenticate } from '@/hooks/use-auth'
import { getDefaultPermission } from '@/lib/permissions'

export function AuthIntegration() {
  const { user, isLoaded } = useUser()
  const authenticateMutation = useAuthenticate()
  const hasExecuted = useRef(false)
  const lastUserId = useRef<string | null>(null)

  const handleAuthentication = useCallback((userData: { id: string; name: string; avatar: string }) => {
    console.log('Autenticando usuário...')
    authenticateMutation.mutate(userData, {
      onSuccess: (data) => {
        console.log('Autenticação realizada com sucesso:', data)
      },
      onError: (error) => {
        console.error('Erro na autenticação:', error)
      }
    })
  }, [authenticateMutation])

  useEffect(() => {
    // Resetar flag se o usuário mudou
    if (user && lastUserId.current !== user.id) {
      hasExecuted.current = false
      lastUserId.current = user.id
    }

    // Evitar execução múltipla
    if (!isLoaded || !user || hasExecuted.current) return

    // Marcar como executado
    hasExecuted.current = true

    // Dados do usuário para autenticação
    const publicMetadata = user.publicMetadata as Record<string, any>
    const userPermission = publicMetadata?.permission || getDefaultPermission()
    
    const userData = {
      id: user.id,
      name: user.fullName || user.firstName || 'Usuário',
      avatar: user.imageUrl || '',
      permission: userPermission
    }

    // Usar a mesma rota POST /auth para sign up e sign in
    handleAuthentication(userData)
  }, [user, isLoaded, handleAuthentication])

  // Este componente não renderiza nada, apenas executa a lógica de integração
  return null
}
