'use client'

import { useUser } from '@clerk/nextjs'
import { useMemo } from 'react'

export type Permission = 'admin' | 'user'

export interface UserPermissions {
  isAdmin: boolean
  isUser: boolean
  permission: Permission
}

/**
 * Hook para verificar permissões do usuário baseado nos metadados públicos do Clerk
 */
export function usePermissions(): UserPermissions {
  const { user } = useUser()

  const permissions = useMemo(() => {
    if (!user) {
      return {
        isAdmin: false,
        isUser: false,
        permission: 'user' as Permission
      }
    }

    // Verificar se o usuário tem permissão de admin nos metadados públicos
    const publicMetadata = user.publicMetadata as Record<string, any>
    const userPermission = publicMetadata?.permission as Permission

    const isAdmin = userPermission === 'admin'
    const isUser = !isAdmin // Se não é admin, é usuário comum

    return {
      isAdmin,
      isUser,
      permission: userPermission || 'user'
    }
  }, [user])

  return permissions
}

/**
 * Hook específico para verificar se o usuário é admin
 */
export function useIsAdmin(): boolean {
  const { isAdmin } = usePermissions()
  return isAdmin
}

/**
 * Hook específico para verificar se o usuário é usuário comum
 */
export function useIsUser(): boolean {
  const { isUser } = usePermissions()
  return isUser
}
