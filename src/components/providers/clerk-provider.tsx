'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { clerkConfig } from '@/lib/clerk-config'

interface ClerkProviderWrapperProps {
  children: React.ReactNode
}

export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  // Verificar se as chaves são válidas
  const isInvalidKey = (key: string | undefined) => {
    return !key || key.includes('your-clerk-') || key.includes('pk_test_your-') || key.includes('sk_test_your-')
  }

  // Se as chaves são inválidas, renderizar sem autenticação
  if (isInvalidKey(clerkConfig.publishableKey)) {
    console.warn('⚠️  Clerk não configurado - renderizando sem autenticação')
    return <>{children}</>
  }

  return (
    <ClerkProvider
      publishableKey={clerkConfig.publishableKey}
      signInUrl={clerkConfig.signInUrl}
      signUpUrl={clerkConfig.signUpUrl}
      afterSignInUrl={clerkConfig.afterSignInUrl}
      afterSignUpUrl={clerkConfig.afterSignUpUrl}
    >
      {children}
    </ClerkProvider>
  )
}
