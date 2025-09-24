'use client'

import type React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Toolbar } from '@/components/layout/toolbar'
import { Sidebar } from '@/components/layout/sidebar'
import { SidebarProvider } from '@/contexts/sidebar-context'
import { MuscleGroupsProvider } from '@/contexts/muscle-groups-context'
import { ExercisesProvider } from '@/contexts/exercises-context'
import { clerkConfig, isInvalidKey } from '@/lib/clerk-config'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs'
import { AuthIntegration } from '@/components/auth/auth-integration'
import type { Route } from '@/types'

function DashboardContent({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleRouteChange = (route: Route) => {
    if (route === 'logout') {
      // Handle logout logic here
      console.log('Logout clicked')
      return
    }
    router.push(`/${route}`)
  }

  const getActiveRoute = (): Route => {
    const currentRoute = pathname.replace('/', '') as Route
    return currentRoute || 'dashboard'
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      <Toolbar 
        showBackButton={pathname.includes('/workouts/') && pathname !== '/workouts'}
        backUrl="/workouts"
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          activeRoute={getActiveRoute()} 
          onRouteChange={handleRouteChange}
        />
        <main className="flex-1 transition-all duration-300 overflow-auto min-h-0">
          <div className="h-fit w-full p-4 sm:p-6 lg:p-10 pb-6 sm:pb-8 lg:pb-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Se o Clerk não estiver configurado, renderizar diretamente
  if (isInvalidKey(clerkConfig.publishableKey)) {
    return (
      <MuscleGroupsProvider>
        <ExercisesProvider>
          <SidebarProvider>
            <DashboardContent>{children}</DashboardContent>
          </SidebarProvider>
        </ExercisesProvider>
      </MuscleGroupsProvider>
    )
  }

  // Se o Clerk estiver configurado, usar os componentes de autenticação
  return (
    <>
      <SignedIn>
        <AuthIntegration />
        <MuscleGroupsProvider>
          <ExercisesProvider>
            <SidebarProvider>
              <DashboardContent>{children}</DashboardContent>
            </SidebarProvider>
          </ExercisesProvider>
        </MuscleGroupsProvider>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}
