// API Configuration
export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002',
  endpoints: {
    muscleGroups: '/muscle-group',
    exercises: '/exercise',
    auth: '/auth',
    workouts: '/workout',
  },
}

// Helper para construir URLs completas
export const getApiUrl = (endpoint: string) => {
  return `${apiConfig.baseUrl}${endpoint}`
}

// Helper para fazer requisições autenticadas
export async function authenticatedRequest<T>(
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
    headers?: Record<string, string>
    body?: unknown
    token?: string | null
  } = {}
): Promise<T> {
  const {
    method = 'GET',
    headers = {},
    body,
    token
  } = options

  const url = getApiUrl(endpoint)
  
  const requestHeaders: Record<string, string> = {
    ...headers
  }

  // Adicionar Content-Type apenas quando necessário
  const shouldIncludeContentType = 
    (method === 'POST' || method === 'PATCH') && 
    body !== undefined && 
    body !== null

  if (shouldIncludeContentType) {
    requestHeaders['Content-Type'] = 'application/json'
  }

  // Adicionar token de autorização se disponível
  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`
    console.log(`🔑 Authorization Header: Bearer ${token.substring(0, 20)}...`)
  } else {
    console.log('⚠️ Nenhum token disponível para esta requisição')
  }

  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
  }

  if (body && method !== 'GET') {
    requestOptions.body = JSON.stringify(body)
  }

  console.log(`🌐 API Request: ${method} ${url}`)
  console.log(`📋 Headers:`, requestHeaders)

  const response = await fetch(url, requestOptions)

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erro desconhecido' }))
    throw new Error(error.message || `Erro ${response.status}: ${response.statusText}`)
  }

  return response.json()
}
