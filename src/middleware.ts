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

const isInvalidKey = (key: string | undefined) =>
  !key || key.includes('your-clerk-') || key.includes('pk_test_your-') || key.includes('sk_test_your-')

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  if (isInvalidKey(clerkConfig.publishableKey) || isInvalidKey(clerkConfig.secretKey)) {
    console.warn('⚠️  Clerk não configurado - middleware desabilitado')
    return
  }

  return clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) {
      auth.protect()
    }
  })(req, event)
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
