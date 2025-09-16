'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  const [isClerkConfigured, setIsClerkConfigured] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // Verificar se o Clerk está configurado
  useEffect(() => {
    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    const isInvalidKey = !publishableKey || 
      publishableKey.includes('your-clerk-') || 
      publishableKey.includes('pk_test_your-')
    
    setIsClerkConfigured(!isInvalidKey)
    setIsLoading(false)
  }, [])

  // Se o Clerk não estiver configurado, ir direto para o dashboard
  useEffect(() => {
    if (!isLoading && !isClerkConfigured) {
      router.push('/dashboard')
    }
  }, [isLoading, isClerkConfigured, router])

  // Se o Clerk estiver configurado, usar o hook useUser
  useEffect(() => {
    if (!isLoading && isClerkConfigured) {
      // Importar dinamicamente o useUser apenas quando necessário
      import('@clerk/nextjs').then(({ useUser }) => {
        // Aqui você poderia usar o useUser, mas por enquanto vamos redirecionar
        router.push('/dashboard')
      })
    }
  }, [isLoading, isClerkConfigured, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return null
}