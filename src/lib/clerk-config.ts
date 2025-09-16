// Clerk Configuration
export const clerkConfig = {
  signInUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || '/login',
  signUpUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || '/sign-up',
  afterSignInUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || '/dashboard',
  afterSignUpUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || '/dashboard',
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
}

// Verificar se as chaves são válidas (não são valores de exemplo)
export const isInvalidKey = (key: string | undefined) => {
  return !key || key.includes('your-clerk-') || key.includes('pk_test_your-') || key.includes('sk_test_your-')
}

// Validação das variáveis de ambiente obrigatórias (apenas no servidor)
if (typeof window === 'undefined') {
  if (isInvalidKey(clerkConfig.publishableKey)) {
    console.warn('⚠️  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY não está configurado ou é inválido')
    console.warn('   Configure uma chave válida em .env.local')
  }

  if (isInvalidKey(clerkConfig.secretKey)) {
    console.warn('⚠️  CLERK_SECRET_KEY não está configurado ou é inválido')
    console.warn('   Configure uma chave válida em .env.local')
  }
}
