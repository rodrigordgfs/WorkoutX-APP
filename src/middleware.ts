import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import type { NextRequest, NextFetchEvent } from 'next/server'
import { clerkConfig } from '@/lib/clerk-config'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/workouts(.*)',
  '/exercises(.*)',
  '/muscle-groups(.*)',
  '/create-workout(.*)',
  '/profile(.*)',
  '/workout-history(.*)',
  '/community(.*)',
  '/report-bug(.*)',
])

// Rotas públicas que não devem ser protegidas
const isPublicRoute = createRouteMatcher([
  '/',
  '/login(.*)',
  '/sign-up(.*)',
  '/sign-in(.*)', // Adicionado para compatibilidade
  '/api(.*)',
])

const isInvalidKey = (key: string | undefined) =>
  !key || key.includes('your-clerk-') || key.includes('pk_test_your-') || key.includes('sk_test_your-')

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  // Se o Clerk não estiver configurado, não executar o middleware
  if (isInvalidKey(clerkConfig.publishableKey) || isInvalidKey(clerkConfig.secretKey)) {
    console.warn('⚠️  Clerk não configurado - middleware desabilitado')
    return
  }

  try {
    return clerkMiddleware((auth, req) => {
      const { pathname } = req.nextUrl
      
      // Log para debug
      console.log(`🔍 Middleware: ${req.method} ${pathname}`)
      
      // Se for uma rota pública, não proteger
      if (isPublicRoute(req)) {
        console.log(`✅ Rota pública: ${pathname}`)
        return
      }
      
      // Se for uma rota protegida, proteger
      if (isProtectedRoute(req)) {
        console.log(`🔒 Rota protegida: ${pathname}`)
        auth.protect()
      }
    })(req, event)
  } catch (error) {
    console.error('❌ Erro no middleware do Clerk:', error)
    console.error('URL:', req.nextUrl.pathname)
    // Em caso de erro, permitir que a requisição continue
    return
  }
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
