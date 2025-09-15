import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextRequest } from 'next/server'
import type { Auth } from '@clerk/nextjs/server'
import { clerkConfig } from '@/lib/clerk-config'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/workouts(.*)',
  '/exercises(.*)',
  '/muscle-groups(.*)',
  '/create-workout(.*)',
  '/create-exercise(.*)',
  '/create-muscle-group(.*)',
  '/profile(.*)',
  '/workout-history(.*)',
  '/community(.*)',
  '/report-bug(.*)',
])

const isPublicRoute = createRouteMatcher([
  '/',
  '/login(.*)',
  '/sign-up(.*)',
])

// Verificar se as chaves do Clerk são válidas
const isInvalidKey = (key: string | undefined) => {
  return !key || key.includes('your-clerk-') || key.includes('pk_test_your-') || key.includes('sk_test_your-')
}

// Middleware principal
export default function middleware(req: NextRequest) {
  // Se o Clerk não estiver configurado, permitir acesso a todas as rotas
  if (isInvalidKey(clerkConfig.publishableKey) || isInvalidKey(clerkConfig.secretKey)) {
    console.warn('⚠️  Clerk não configurado - middleware desabilitado')
    return
  }

  // Se o Clerk estiver configurado, usar o middleware do Clerk
  return clerkMiddleware(async (auth: Auth) => {
    if (isProtectedRoute(req)) {
      await auth.protect()
    }
    
    // Permitir acesso às rotas públicas sem autenticação
    if (isPublicRoute(req)) {
      return
    }
  })(req)
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
