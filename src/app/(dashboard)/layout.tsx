'use client'

import type React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Toolbar } from '@/components/layout/toolbar'
import { Sidebar } from '@/components/layout/sidebar'
import { SidebarProvider, useSidebar } from '@/contexts/sidebar-context'
import type { Route } from '@/types'
import { cn } from '@/lib/utils'

function DashboardContent({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { isCollapsed } = useSidebar()

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
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          activeRoute={getActiveRoute()} 
          onRouteChange={handleRouteChange}
        />
        <main className="flex-1 transition-all duration-300 overflow-auto min-h-0">
          <div className="h-full w-full">
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
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  )
}
