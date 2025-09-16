'use client'

import { ReactNode } from 'react'
import { usePermissions, type Permission } from '@/hooks/use-permissions'

interface PermissionGuardProps {
  children: ReactNode
  requiredPermission?: Permission
  fallback?: ReactNode
  requireAdmin?: boolean
}

/**
 * Componente que renderiza conteúdo apenas se o usuário tiver a permissão necessária
 */
export function PermissionGuard({ 
  children, 
  requiredPermission, 
  fallback = null, 
  requireAdmin = false 
}: PermissionGuardProps) {
  const { isAdmin, permission } = usePermissions()

  // Se requireAdmin for true, verificar se é admin
  if (requireAdmin && !isAdmin) {
    return <>{fallback}</>
  }

  // Se requiredPermission for especificado, verificar permissão específica
  if (requiredPermission && permission !== requiredPermission) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

/**
 * Componente específico para renderizar conteúdo apenas para admins
 */
export function AdminOnly({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <PermissionGuard requireAdmin fallback={fallback}>
      {children}
    </PermissionGuard>
  )
}

/**
 * Componente específico para renderizar conteúdo apenas para usuários comuns
 */
export function UserOnly({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  const { isUser } = usePermissions()
  
  if (!isUser) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

/**
 * Componente que renderiza conteúdo diferente baseado na permissão
 */
export function ConditionalRender({ 
  adminContent, 
  userContent, 
  fallback = null 
}: { 
  adminContent: ReactNode
  userContent: ReactNode
  fallback?: ReactNode 
}) {
  const { isAdmin, isUser } = usePermissions()

  if (isAdmin) {
    return <>{adminContent}</>
  }

  if (isUser) {
    return <>{userContent}</>
  }

  return <>{fallback}</>
}
