'use client'

import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/contexts/sidebar-context'
import { cn } from '@/lib/utils'

export function MobileMenuButton() {
  const { isMobileOpen, setMobileOpen } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed top-3 left-3 z-50 md:hidden bg-background/80 backdrop-blur-sm border shadow-lg hover:scale-105 active:scale-95 transition-transform duration-150 h-10 w-10"
      onClick={() => setMobileOpen(!isMobileOpen)}
      aria-label={isMobileOpen ? 'Fechar menu' : 'Abrir menu'}
    >
      <div className="relative">
        <Menu 
          className={cn(
            "h-4 w-4 transition-all duration-200",
            isMobileOpen && "opacity-0 rotate-90"
          )} 
        />
        <X 
          className={cn(
            "h-4 w-4 absolute inset-0 transition-all duration-200",
            !isMobileOpen && "opacity-0 -rotate-90"
          )} 
        />
      </div>
    </Button>
  )
}

export function MobileMenuOverlay() {
  const { isMobileOpen, setMobileOpen } = useSidebar()

  if (!isMobileOpen) return null

  return (
    <button
      type="button"
      className={cn(
        "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden",
        "transition-all duration-300",
        isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={() => setMobileOpen(false)}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setMobileOpen(false)
        }
      }}
      aria-label="Fechar menu"
    />
  )
}
