'use client'

import { LayoutDashboard, Calendar, Plus, History, FileMusic as Muscle, Target, PlusCircle, Dumbbell, User, Users, Bug, LogOut, ChevronLeft, ChevronRight } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { MobileMenuButton, MobileMenuOverlay } from '@/components/layout/mobile-menu'
import { cn } from '@/lib/utils'
import type { Route } from '@/types'
import { useSidebar } from '@/contexts/sidebar-context'
import { useUser, useClerk } from '@clerk/nextjs'

interface SidebarProps {
  activeRoute?: Route
  onRouteChange?: (route: Route) => void
}

interface MenuItemProps {
  icon: React.ReactNode
  label: string
  isActive?: boolean
  isCollapsed?: boolean
  route?: Route | undefined
  onClick?: () => void
}

function MenuItem({ icon, label, isActive, isCollapsed, onClick }: MenuItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer",
        "hover:bg-accent hover:text-accent-foreground",
        isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground",
        isCollapsed ? "md:justify-center justify-start" : "justify-start"
      )}
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <span className={cn(isCollapsed && "md:hidden")}>{label}</span>
      </div>
    </button>
  )
}

export function Sidebar({ activeRoute = 'dashboard', onRouteChange }: SidebarProps) {
  const { isCollapsed, isMobileOpen, toggleCollapsed, setMobileOpen } = useSidebar()
  const { user } = useUser()
  const { signOut } = useClerk()

  const menuItems: Array<{ icon: React.ReactNode; label: string; route: Route } | { separator: true; id: string }> = [
    { icon: <LayoutDashboard className="h-4 w-4" />, label: 'Dashboard', route: 'dashboard' },
    { icon: <Users className="h-4 w-4" />, label: 'Comunidade', route: 'community' },
    { separator: true, id: 'sep-1' },
    { icon: <Calendar className="h-4 w-4" />, label: 'Meus Treinos', route: 'workouts' },
    { icon: <Plus className="h-4 w-4" />, label: 'Cadastro de Treino', route: 'create-workout' },
    { icon: <History className="h-4 w-4" />, label: 'Histórico de Treinos', route: 'workout-history' },
    { icon: <Muscle className="h-4 w-4" />, label: 'Grupos Musculares', route: 'muscle-groups' },
    { icon: <Target className="h-4 w-4" />, label: 'Exercícios', route: 'exercises' },
    { separator: true, id: 'sep-2' },
    { icon: <Bug className="h-4 w-4" />, label: 'Reportar Bug', route: 'report-bug' },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <MobileMenuButton />

      {/* Mobile Overlay */}
      <MobileMenuOverlay />

      {/* Sidebar */}
      <aside
        className={cn(
          "border-r bg-background transition-all duration-300 ease-in-out",
          "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64", // Mobile: fixed
          "md:static md:h-full", // Desktop: static
          isCollapsed ? "md:w-16" : "md:w-64", // Desktop width
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0" // Mobile visibility
        )}
      >
        <div className="flex flex-col h-full">
          {/* User Profile */}
          <div className={cn("flex items-center p-4 border-b", isCollapsed && "md:justify-center")}>
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback>
                  {user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 
                   user?.emailAddresses[0]?.emailAddress?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className={cn("flex flex-col", isCollapsed && "md:hidden")}>
                <span className="text-sm font-medium">
                  {user?.fullName ? 
                    user.fullName.split(' ').filter((_, index, arr) => index === 0 || index === arr.length - 1).join(' ') :
                    user?.emailAddresses[0]?.emailAddress || 'Usuário'
                  }
                </span>
                <span className="text-xs text-muted-foreground">
                  {user?.emailAddresses[0]?.emailAddress || 'Usuário'}
                </span>
              </div>
            </div>
            {!isCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto hidden md:flex"
                onClick={toggleCollapsed}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            {isCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute -right-3 top-4 h-6 w-6 rounded-full border bg-background hidden md:flex"
                onClick={toggleCollapsed}
              >
                <ChevronRight className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* Menu Items */}
          <ScrollArea className="flex-1 px-3 py-4">
            <div className="space-y-1">
              {menuItems.map((item) => {
                if ('separator' in item) {
                  return (
                    <div key={item.id} className="py-2">
                      <Separator />
                    </div>
                  )
                }
                return (
                  <MenuItem
                    key={item.route}
                    icon={item.icon}
                    label={item.label}
                    isActive={activeRoute === item.route}
                    isCollapsed={isCollapsed}
                    route={item.route}
                    onClick={() => {
                      setMobileOpen(false)
                      if (item.route === 'logout') {
                        signOut()
                        return
                      }
                      if (onRouteChange && item.route) {
                        onRouteChange(item.route)
                      }
                    }}
                  />
                )
              })}
            </div>
          </ScrollArea>
        </div>
      </aside>
    </>
  )
}