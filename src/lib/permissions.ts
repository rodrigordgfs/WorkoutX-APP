import type { Permission } from '@/hooks/use-permissions'

/**
 * Verifica se uma permissão específica está presente
 */
export function hasPermission(userPermission: Permission | undefined, requiredPermission: Permission): boolean {
  if (!userPermission) return false
  
  // Admin tem acesso a tudo
  if (userPermission === 'admin') return true
  
  // Verificação específica de permissão
  return userPermission === requiredPermission
}

/**
 * Verifica se o usuário tem permissão de admin
 */
export function isAdmin(userPermission: Permission | undefined): boolean {
  return hasPermission(userPermission, 'admin')
}

/**
 * Verifica se o usuário é um usuário comum
 */
export function isUser(userPermission: Permission | undefined): boolean {
  return !isAdmin(userPermission)
}

/**
 * Lista de permissões disponíveis
 */
export const PERMISSIONS = {
  ADMIN: 'admin' as const,
  USER: 'user' as const,
} as const

/**
 * Verifica se uma permissão é válida
 */
export function isValidPermission(permission: string): permission is Permission {
  return permission === 'admin' || permission === 'user'
}

/**
 * Obtém a permissão padrão para novos usuários
 */
export function getDefaultPermission(): Permission {
  return 'user'
}
