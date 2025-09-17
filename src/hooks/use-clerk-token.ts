'use client'

import { useAuth } from '@clerk/nextjs'
import { useCallback } from 'react'

export function useClerkToken() {
  const { getToken } = useAuth()

  const getAuthToken = useCallback(async (): Promise<string | null> => {
    try {
      const token = await getToken()
      if (token) {
        console.log(`✅ Token obtido do Clerk: ${token.substring(0, 20)}...`)
      } else {
        console.log('❌ Token não disponível do Clerk')
      }
      return token
    } catch (error) {
      console.error('Erro ao obter token do Clerk:', error)
      return null
    }
  }, [getToken])

  return { getAuthToken }
}
